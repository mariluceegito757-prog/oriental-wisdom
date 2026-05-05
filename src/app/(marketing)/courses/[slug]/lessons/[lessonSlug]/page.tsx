import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { MdxComponents } from "@/components/blog/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return { title: "Not Found" };
  const lesson = await prisma.lesson.findUnique({
    where: { courseId_slug: { courseId: course.id, slug: lessonSlug } },
  });
  if (!lesson) return { title: "Not Found" };
  return {
    title: `${lesson.title} | ${course.title} | Oriental Wisdom`,
    description: lesson.description ?? "",
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;

  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  if (!course) notFound();

  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  // Check access
  const session = await auth();
  const enrollment = session?.user?.id
    ? await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
      })
    : null;

  if (!lesson.freePreview && !enrollment) {
    redirect(`/courses/${course.slug}`);
  }

  const currentIndex = course.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href={`/courses/${course.slug}`}
        className="inline-block mb-6 text-sm text-ink-muted hover:text-ink transition-colors"
      >
        &larr; Back to {course.title}
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="jade">Lesson {currentIndex + 1}</Badge>
          {lesson.freePreview && <Badge variant="gold">Free Preview</Badge>}
        </div>
        <h1 className="font-serif text-3xl font-bold text-ink">{lesson.title}</h1>
        {lesson.description && (
          <p className="mt-2 text-ink-muted">{lesson.description}</p>
        )}
      </div>

      <Separator className="mb-10" />

      <div className="prose-custom">
        <MDXRemote
          source={lesson.content}
          components={MdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <Separator className="my-10" />

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {prevLesson ? (
          <Link
            href={`/courses/${course.slug}/lessons/${prevLesson.slug}`}
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            &larr; {prevLesson.title}
          </Link>
        ) : (
          <span />
        )}
        {nextLesson ? (
          <Link
            href={`/courses/${course.slug}/lessons/${nextLesson.slug}`}
            className="text-sm text-ink-muted hover:text-ink transition-colors text-right"
          >
            {nextLesson.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
