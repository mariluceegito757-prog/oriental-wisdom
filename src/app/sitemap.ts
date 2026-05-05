import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://oriental-wisdom.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/courses", priority: 0.9, changeFrequency: "weekly" },
    { path: "/consultations", priority: 0.8, changeFrequency: "weekly" },
    { path: "/bazi-calculator", priority: 0.8, changeFrequency: "monthly" },
    { path: "/glossary", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/login", priority: 0.4, changeFrequency: "monthly" },
    { path: "/register", priority: 0.4, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
    { path: "/disclaimer", priority: 0.3, changeFrequency: "monthly" },
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    blogEntries = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Blog content not available during build
  }

  return [...staticEntries, ...blogEntries];
}
