import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Consultations | Oriental Wisdom",
  description:
    "Book a personal consultation with an experienced Chinese metaphysics practitioner — Ba Zi, Zi Wei Dou Shu, and more.",
};

async function getConsultationTypes() {
  return prisma.consultationType.findMany({
    where: { published: true },
    orderBy: { price: "asc" },
  });
}

export const dynamic = "force-dynamic";

export default async function ConsultationsPage() {
  const types = await getConsultationTypes();

  if (types.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="font-serif text-4xl font-bold text-ink">Consultations</h1>
        <p className="mt-3 text-lg text-ink-muted">
          Personal guidance from experienced practitioners
        </p>
        <p className="mt-12 text-ink-muted">No consultation types available yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-ink">Consultations</h1>
      <p className="mt-3 text-lg text-ink-muted">
        Personal guidance from experienced practitioners
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {types.map((t) => (
          <Card key={t.slug} className="flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-serif text-xl font-bold text-ink pr-4">
                {t.name}
              </h2>
              <Badge>{t.duration} min</Badge>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              {t.description}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-lg font-bold text-ink">
                ${(t.price / 100).toFixed(0)}
              </span>
              <Link href={`/consultations/${t.slug}`}>
                <Button variant="vermilion" size="sm">
                  Book Now
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
