import Script from "next/script";

export function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Oriental Wisdom",
          url: "https://oriental-wisdom.vercel.app",
          description:
            "Explore the depths of Chinese traditional wisdom — Ba Zi astrology, Zi Wei Dou Shu, Five Elements, I Ching, and ancient philosophy.",
          sameAs: [
            "https://github.com/mariluceegito757-prog/oriental-wisdom",
          ],
        }),
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Oriental Wisdom",
          url: "https://oriental-wisdom.vercel.app",
          description:
            "Explore the depths of Chinese traditional wisdom.",
          inLanguage: "en",
        }),
      }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  slug,
}: {
  title: string;
  description: string;
  datePublished: string;
  slug: string;
}) {
  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          datePublished,
          url: `https://oriental-wisdom.vercel.app/blog/${slug}`,
          publisher: {
            "@type": "Organization",
            name: "Oriental Wisdom",
          },
        }),
      }}
    />
  );
}

export function CourseSchema({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  return (
    <Script
      id="course-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: title,
          description,
          provider: {
            "@type": "Organization",
            name: "Oriental Wisdom",
          },
          url: `https://oriental-wisdom.vercel.app/courses/${slug}`,
        }),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  );
}
