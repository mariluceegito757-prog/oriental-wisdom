import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MdxComponents } from "@/components/blog/mdx-components";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InkBrushDivider } from "@/components/chinese-culture/ink-brush-divider";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.meta.title} | Oriental Wisdom`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="inline-block mb-8 text-sm text-ink-muted hover:text-ink transition-colors"
      >
        &larr; Back to Blog
      </Link>

      <div className="mb-8">
        <Badge variant="jade" className="mb-4">
          {post.meta.category}
        </Badge>
        <h1 className="font-serif text-3xl font-bold text-ink leading-tight md:text-4xl">
          {post.meta.title}
        </h1>
        <p className="mt-3 text-lg text-ink-muted">{post.meta.description}</p>
        <time className="mt-4 block text-sm text-ink-muted/60">
          {post.meta.publishedAt
            ? new Date(post.meta.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : ""}
        </time>
      </div>

      <Separator className="mb-10" />

      <div className="prose-custom">
        <MDXRemote
          source={post.content}
          components={MdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <InkBrushDivider className="mt-16" />

      {/* Tags */}
      {post.meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {post.meta.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
    </article>
  );
}
