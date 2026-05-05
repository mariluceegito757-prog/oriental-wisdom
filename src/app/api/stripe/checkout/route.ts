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

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const type = body.type as string | undefined;
  if (!type) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  let price: number;
  let name: string;
  const metadata: Record<string, string> = {};

  if (type === "COURSE") {
    const itemId = body.itemId as string | undefined;
    if (!itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

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

    if (price === 0) {
      await prisma.enrollment.create({
        data: { userId: session.user.id, courseId: course.id },
      });
      return NextResponse.json({ url: `${BASE_URL}/courses/${course.slug}?enrolled=1` });
    }
  } else if (type === "CONSULTATION") {
    const consultationTypeId = body.consultationTypeId as string | undefined;
    const startTime = body.startTime as string | undefined;
    const endTime = body.endTime as string | undefined;
    const notes = body.notes as string | undefined;

    if (!consultationTypeId) {
      return NextResponse.json({ error: "Missing consultationTypeId" }, { status: 400 });
    }
    if (!startTime || !endTime) {
      return NextResponse.json({ error: "Missing time slot" }, { status: 400 });
    }

    const ct = await prisma.consultationType.findUnique({
      where: { id: consultationTypeId },
    });
    if (!ct) return NextResponse.json({ error: "Consultation type not found" }, { status: 404 });

    // Check slot is not already booked
    const conflictingSlot = await prisma.timeSlot.findFirst({
      where: {
        consultationTypeId: ct.id,
        startTime: new Date(startTime),
        booked: true,
      },
    });
    if (conflictingSlot) {
      return NextResponse.json(
        { error: "This time slot is no longer available. Please choose another." },
        { status: 400 }
      );
    }

    price = ct.price;
    name = ct.name;
    metadata.type = "CONSULTATION";
    metadata.consultationTypeId = ct.id;
    metadata.userId = session.user.id;
    metadata.startTime = startTime;
    metadata.endTime = endTime;
    metadata.notes = notes ?? "";
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
