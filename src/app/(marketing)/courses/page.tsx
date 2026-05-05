import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Courses | Oriental Wisdom",
  description:
    "Structured courses on Ba Zi, Zi Wei Dou Shu, Five Elements, and Chinese metaphysics.",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    include: { _count: { select: { lessons: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-ink">Courses</h1>
      <p className="mt-3 text-lg text-ink-muted">
        Structured learning paths for every level
      </p>

      {courses.length === 0 ? (
        <p className="mt-12 text-center text-ink-muted">Courses coming soon.</p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <Badge variant="gold" className="mb-3 self-start">
                {course.level}
              </Badge>
              <h2 className="font-serif text-xl font-bold text-ink mb-1">
                {course.title}
              </h2>
              <p className="text-sm text-ink-muted mb-4">{course.subtitle}</p>
              <div className="mt-auto flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-ink">
                    ${(course.price / 100).toFixed(2)}
                  </span>
                  <span className="text-xs text-ink-muted ml-1">
                    &middot; {course._count.lessons} lessons
                  </span>
                </div>
                <Link href={`/courses/${course.slug}`}>
                  <Button variant="secondary" size="sm">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
