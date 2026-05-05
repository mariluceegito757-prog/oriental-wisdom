export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const { type, itemId, userId } = session.metadata ?? {};

  if (!type || !itemId || !userId) {
    console.error("Missing metadata in checkout session", session.id);
    return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
  }

  // Idempotency: check for existing order before creating
  const existing = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
  });
  if (existing) {
    return NextResponse.json({ received: true });
  }

  const amount = session.amount_total ?? 0;
  const currency = (session.currency ?? "usd").toLowerCase();

  try {
    await prisma.$transaction(async (tx) => {
      await tx.order.create({
        data: { userId, stripeSessionId: session.id, type, itemId, amount, currency, status: "PAID" },
      });

      if (type === "COURSE") {
        await tx.enrollment.upsert({
          where: { userId_courseId: { userId, courseId: itemId } },
          create: { userId, courseId: itemId },
          update: {},
        });
      }
    });
  } catch (error) {
    console.error("Failed to process webhook", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
