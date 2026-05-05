import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let type: string;
  let itemId: string;
  try {
    const body = await req.json();
    type = body.type;
    itemId = body.itemId;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  let price: number;
  let name: string;
  const metadata: Record<string, string> = {};

  if (type === "COURSE") {
    const course = await prisma.course.findUnique({ where: { slug: itemId } });
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
    });
    if (existing) return NextResponse.json({ error: "Already enrolled" }, { status: 400 });

    price = course.price;
    name = course.title;
    metadata.type = "COURSE";
    metadata.itemId = course.id;
    metadata.userId = session.user.id;

    // Free course: create enrollment directly, skip Stripe
    if (price === 0) {
      await prisma.enrollment.create({
        data: { userId: session.user.id, courseId: course.id },
      });
      return NextResponse.json({ url: `${BASE_URL}/courses/${course.slug}?enrolled=1` });
    }
  } else if (type === "CONSULTATION") {
    const ct = await prisma.consultationType.findUnique({ where: { slug: itemId } });
    if (!ct) return NextResponse.json({ error: "Consultation type not found" }, { status: 404 });

    price = ct.price;
    name = ct.name;
    metadata.type = "CONSULTATION";
    metadata.itemId = ct.id;
    metadata.userId = session.user.id;
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${BASE_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/stripe/cancel`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json({ error: "Checkout failed. Please try again." }, { status: 500 });
  }
}
