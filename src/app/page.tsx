import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InkBrushDivider } from "@/components/chinese-culture/ink-brush-divider";
import { GlossaryTooltip } from "@/components/chinese-culture/glossary-tooltip";
import { getAllPosts } from "@/lib/blog";

const featuredCategories = [
  {
    title: "Ba Zi",
    subtitle: "The Four Pillars of Destiny",
    description: "Uncover your life blueprint through the ancient art of Eight Characters astrology.",
    href: "/blog?category=ba-zi",
    badge: "Most Popular",
  },
  {
    title: "Zi Wei Dou Shu",
    subtitle: "Purple Star Astrology",
    description: "Chart your destiny across 12 palaces and 100+ stars with this sophisticated system.",
    href: "/blog?category=zi-wei-dou-shu",
    badge: "Advanced",
  },
  {
    title: "Five Elements",
    subtitle: "Wu Xing Philosophy",
    description: "Understand the dynamic cycles of Wood, Fire, Earth, Metal, and Water in nature and life.",
    href: "/blog?category=five-elements",
    badge: "Foundational",
  },
];

export default function Home() {
  const allPosts = getAllPosts();
  const featuredArticles = allPosts.slice(0, 3);
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 text-center md:pt-36 md:pb-24">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(196, 30, 58, 0.06) 0%, transparent 60%)",
            }}
            aria-hidden
          />

          <Badge variant="vermilion" className="mb-6">
            Ancient Wisdom for Modern Seekers
          </Badge>

          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
            Discover the Depth of{" "}
            <span className="text-vermilion">Chinese Metaphysics</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Explore{" "}
            <GlossaryTooltip term="Ba Zi" />,{" "}
            <GlossaryTooltip term="Zi Wei Dou Shu" />,{" "}
            <GlossaryTooltip term="Wu Xing" />, and{" "}
            <GlossaryTooltip term="Dao" />
            {" "}through in-depth articles, structured courses, and personal consultations with experienced practitioners.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/courses">
              <Button variant="vermilion" size="lg">
                Explore Courses
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="secondary" size="lg">
                Read the Blog
              </Button>
            </Link>
          </div>
        </section>

        <InkBrushDivider />

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-center font-serif text-3xl font-bold text-ink">
            Paths of Study
          </h2>
          <p className="mt-3 text-center text-ink-muted">
            Choose your entry point into the world of Chinese wisdom
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredCategories.map((cat) => (
              <Link key={cat.title} href={cat.href} className="no-underline">
                <Card hover className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold text-ink">
                      {cat.title}
                    </h3>
                    <Badge variant="gold">{cat.badge}</Badge>
                  </div>
                  <p className="text-sm font-medium text-ink-muted mb-2">
                    {cat.subtitle}
                  </p>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {cat.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-ink">
                Latest Insights
              </h2>
              <p className="mt-2 text-ink-muted">
                New articles on Chinese metaphysics and philosophy
              </p>
            </div>
            <Link href="/blog">
              <Button variant="secondary">View All Articles</Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="no-underline"
              >
                <Card hover className="h-full">
                  <Badge variant="jade" className="mb-3">
                    {article.category}
                  </Badge>
                  <h3 className="font-serif text-lg font-bold text-ink leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {article.description}
                  </p>
                  <time className="mt-4 block text-xs text-ink-muted/60">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("en-US", {
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
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-2xl bg-ink p-12 text-center md:p-16">
            <h2 className="font-serif text-3xl font-bold text-paper md:text-4xl">
              Begin Your Journey Today
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-paper-dark/80 leading-relaxed">
              Whether you&apos;re seeking self-understanding through{" "}
              <GlossaryTooltip term="Ba Zi" />, or curious about the ancient art
              of <GlossaryTooltip term="Zi Wei Dou Shu" />, our courses and
              consultations will guide you step by step.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/register">
                <Button variant="gold" size="lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/consultations">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-paper-dark/30 text-paper-dark hover:text-paper hover:bg-paper/10"
                >
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
