import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog — Oriental Wisdom",
  description:
    "In-depth articles on Chinese metaphysics, Ba Zi astrology, Zi Wei Dou Shu, Five Elements, and traditional philosophy.",
};

const categories = [
  { value: null, label: "All" },
  { value: "ba-zi", label: "Ba Zi" },
  { value: "zi-wei-dou-shu", label: "Zi Wei Dou Shu" },
  { value: "five-elements", label: "Five Elements" },
  { value: "philosophy", label: "Philosophy" },
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allPosts = getAllPosts();
  const posts = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-ink">Blog</h1>
        <p className="mt-3 text-lg text-ink-muted">
          Explore the depths of Chinese wisdom
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.value ? `/blog?category=${cat.value}` : "/blog"}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              category === cat.value || (!category && cat.value === null)
                ? "border-vermilion/40 bg-vermilion/5 text-vermilion"
                : "border-ink/15 text-ink-muted hover:border-vermilion/30 hover:text-vermilion"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-ink-muted">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="no-underline"
            >
              <Card hover className="h-full">
                <Badge variant="jade" className="mb-3">
                  {post.category}
                </Badge>
                <h2 className="font-serif text-lg font-bold text-ink leading-snug mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {post.description}
                </p>
                <time className="mt-4 block text-xs text-ink-muted/60">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </time>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
