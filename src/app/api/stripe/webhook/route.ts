export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmation } from "@/lib/email";
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

  const checkoutSession = event.data.object as Stripe.Checkout.Session;
  const metadata = checkoutSession.metadata ?? {};
  const type = metadata.type;
  const userId = metadata.userId;

  if (!type || !userId) {
    console.error("Missing metadata in checkout session", checkoutSession.id);
    return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
  }

  // Idempotency
  const existing = await prisma.order.findUnique({
    where: { stripeSessionId: checkoutSession.id },
  });
  if (existing) {
    return NextResponse.json({ received: true });
  }

  const amount = checkoutSession.amount_total ?? 0;
  const currency = (checkoutSession.currency ?? "usd").toLowerCase();

  if (type === "COURSE") {
    const courseId = metadata.itemId;
    if (!courseId) {
      console.error("Missing itemId for course", checkoutSession.id);
      return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
    }

    try {
      await prisma.$transaction(async (tx) => {
        await tx.order.create({
          data: {
            userId,
            stripeSessionId: checkoutSession.id,
            type: "COURSE",
            itemId: courseId,
            amount,
            currency,
            status: "PAID",
          },
        });
        await tx.enrollment.upsert({
          where: { userId_courseId: { userId, courseId } },
          create: { userId, courseId },
          update: {},
        });
      });
    } catch (error) {
      console.error("Failed to process course webhook", error);
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
  } else if (type === "CONSULTATION") {
    const consultationTypeId = metadata.consultationTypeId;
    const startTime = metadata.startTime;
    const endTime = metadata.endTime;
    const notes = metadata.notes ?? null;

    if (!consultationTypeId || !startTime || !endTime) {
      console.error("Missing consultation metadata", checkoutSession.id);
      return NextResponse.json({ error: "Missing consultation metadata" }, { status: 400 });
    }

    try {
      await prisma.$transaction(async (tx) => {
        // Create the time slot
        const timeSlot = await tx.timeSlot.create({
          data: {
            consultationTypeId,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            booked: true,
          },
        });

        // Create the booking
        await tx.booking.create({
          data: {
            userId,
            timeSlotId: timeSlot.id,
            consultationTypeId,
            status: "CONFIRMED",
            notes,
          },
        });

        // Create the order
        await tx.order.create({
          data: {
            userId,
            stripeSessionId: checkoutSession.id,
            type: "CONSULTATION",
            itemId: consultationTypeId,
            amount,
            currency,
            status: "PAID",
          },
        });
      });
    } catch (error) {
      console.error("Failed to process consultation webhook", error);
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }

    // Send confirmation email (fire-and-forget, don't block response)
    try {
      const [user, ct] = await Promise.all([
        prisma.user.findUnique({ where: { id: userId }, select: { name: true, email: true } }),
        prisma.consultationType.findUnique({ where: { id: consultationTypeId }, select: { name: true, duration: true } }),
      ]);
      if (user?.email && ct) {
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        const timeLabel = `${startDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })} — ${endDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })}`;
        const dateLabel = startDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        await sendBookingConfirmation({
          to: user.email,
          name: user.name ?? "there",
          consultationName: ct.name,
          date: dateLabel,
          time: timeLabel,
          duration: ct.duration,
        });
      }
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }
  } else {
    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }

  return NextResponse.json({ received: true });
}
