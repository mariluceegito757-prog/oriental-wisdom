import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consultations | Oriental Wisdom",
  description:
    "Book a personal consultation with an experienced Chinese metaphysics practitioner — Ba Zi, Zi Wei Dou Shu, and more.",
};

const services = [
  {
    title: "Ba Zi Natal Chart Reading",
    description:
      "A comprehensive analysis of your Four Pillars of Destiny — understand your Day Master, elemental balance, and life path.",
    duration: "60 min",
    price: "$120",
    slug: "bazi-reading",
  },
  {
    title: "Zi Wei Dou Shu Chart Reading",
    description:
      "Explore all 12 palaces of your Purple Star chart for detailed insights into career, relationships, wealth, and health.",
    duration: "75 min",
    price: "$150",
    slug: "ziwei-reading",
  },
  {
    title: "Annual Ba Zi Forecast",
    description:
      "Understand the coming year's energies — what to expect and how to navigate challenges and opportunities.",
    duration: "45 min",
    price: "$90",
    slug: "annual-forecast",
  },
  {
    title: "Combo: Ba Zi + Zi Wei",
    description:
      "The most comprehensive reading — combine both systems for a complete picture of your destiny and life map.",
    duration: "120 min",
    price: "$220",
    slug: "combo-reading",
  },
];

export default function ConsultationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-ink">Consultations</h1>
      <p className="mt-3 text-lg text-ink-muted">
        Personal guidance from experienced practitioners
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.slug} className="flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-serif text-xl font-bold text-ink pr-4">
                {service.title}
              </h2>
              <Badge>{service.duration}</Badge>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              {service.description}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-lg font-bold text-ink">{service.price}</span>
              <Link href={`/consultations/${service.slug}`}>
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
