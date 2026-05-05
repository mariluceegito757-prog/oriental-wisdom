import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BookingForm } from "./booking-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ct = await prisma.consultationType.findUnique({ where: { slug } });
  if (!ct) return { title: "Not Found" };
  return {
    title: `${ct.name} | Oriental Wisdom`,
    description: ct.description,
  };
}

export default async function ConsultationDetailPage({ params }: Props) {
  const { slug } = await params;

  const consultationType = await prisma.consultationType.findUnique({
    where: { slug },
  });

  if (!consultationType) notFound();

  // Generate time slots for the next 30 days
  // Business hours: 9:00 AM - 5:00 PM (last slot at 4:00 PM)
  // Slot interval based on duration
  const today = new Date();
  const availableDates: string[] = [];
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    // Skip Sundays (0) and Saturdays (6) or just include all days for now
    availableDates.push(d.toISOString().split("T")[0]);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-ink">{consultationType.name}</h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-ink-muted">
          <span>{consultationType.duration} minutes</span>
          <span className="text-lg font-bold text-ink">
            ${(consultationType.price / 100).toFixed(0)}
          </span>
        </div>
        <p className="mt-4 text-ink-muted leading-relaxed">{consultationType.description}</p>
      </div>

      <BookingForm
        consultationType={{
          id: consultationType.id,
          slug: consultationType.slug,
          name: consultationType.name,
          duration: consultationType.duration,
          price: consultationType.price,
        }}
        availableDates={availableDates}
      />
    </div>
  );
}
