import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InkBrushDivider } from "@/components/chinese-culture/ink-brush-divider";
import { CourseSchema, BreadcrumbSchema } from "@/components/chinese-culture/structured-data";
import { EnrollButton } from "./enroll-button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return { title: "Not Found" };
  return {
    title: `${course.title} | Oriental Wisdom`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });

  if (!course) notFound();

  const session = await auth();
  const enrollment = session?.user?.id
    ? await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
      })
    : null;

  return (
    <>
      <CourseSchema title={course.title} description={course.description} slug={course.slug} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://oriental-wisdom.vercel.app" },
          { name: "Courses", url: "https://oriental-wisdom.vercel.app/courses" },
          { name: course.title, url: `https://oriental-wisdom.vercel.app/courses/${course.slug}` },
        ]}
      />
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/courses" className="inline-block mb-8 text-sm text-ink-muted hover:text-ink transition-colors">
        &larr; Back to Courses
      </Link>

      <div className="mb-10">
        <Badge variant="gold" className="mb-4">{course.level}</Badge>
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">{course.title}</h1>
        <p className="mt-2 text-lg text-ink-muted">{course.subtitle}</p>
        <p className="mt-4 text-ink-muted leading-relaxed">{course.description}</p>
      </div>

      <Separator className="mb-10" />

      {/* Enrollment */}
      <div className="mb-12 rounded-xl border border-ink/10 bg-paper-dark/50 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-2xl font-bold text-ink">
            ${(course.price / 100).toFixed(2)}
          </span>
          <span className="text-sm text-ink-muted ml-2">
            &middot; {course.lessons.length} lessons
          </span>
        </div>
        <EnrollButton
          courseSlug={course.slug}
          isEnrolled={!!enrollment}
          isLoggedIn={!!session}
        />
      </div>

      {/* Curriculum */}
      <h2 className="font-serif text-2xl font-bold text-ink mb-6">Curriculum</h2>
      <div className="space-y-3">
        {course.lessons.map((lesson, idx) => (
          <Card key={lesson.id} className="flex items-center gap-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/8 text-sm font-medium text-ink-muted shrink-0">
              {idx + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-ink truncate">{lesson.title}</h3>
                {lesson.freePreview && (
                  <Badge variant="jade">Free Preview</Badge>
                )}
              </div>
              {lesson.description && (
                <p className="text-sm text-ink-muted truncate">{lesson.description}</p>
              )}
            </div>
            {(lesson.freePreview || enrollment) ? (
              <Link href={`/courses/${course.slug}/lessons/${lesson.slug}`}>
                <Button variant="ghost" size="sm">
                  {lesson.freePreview && !enrollment ? "Preview" : "Watch"}
                </Button>
              </Link>
            ) : (
              <span className="text-xs text-ink-muted/50 pr-2">Enroll to access</span>
            )}
          </Card>
        ))}
      </div>

      <InkBrushDivider />
    </div>
    </>
  );
}
