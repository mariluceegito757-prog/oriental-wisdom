import fs from "node:fs";
import path from "node:path";

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
}

const contentDir = path.join(process.cwd(), "content", "blog");

const SLUG_RE = /^[a-zA-Z0-9\-_]+$/;

function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const result: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const keyMatch = line.match(/^([^:]+):\s*(.*)$/);
    if (!keyMatch) continue;
    const key = keyMatch[1].trim();
    let value: unknown = keyMatch[2].trim();

    if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
      try {
        value = JSON.parse(value as string);
      } catch {
        value = (value as string)
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      }
    }

    result[key] = value;
  }

  return result;
}

export function getAllPosts(): BlogMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  let files: string[];
  try {
    files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  } catch {
    return [];
  }

  const posts: BlogMeta[] = [];
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const meta = parseFrontmatter(content);
      posts.push({
        slug: file.replace(/\.mdx$/, ""),
        title: (meta.title as string) ?? file,
        description: (meta.description as string) ?? "",
        category: (meta.category as string) ?? "general",
        tags: (meta.tags as string[]) ?? [],
        publishedAt: (meta.publishedAt as string) ?? "",
      });
    } catch {
      // Skip broken files
    }
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): { meta: BlogMeta; content: string } | null {
  if (!SLUG_RE.test(slug)) return null;

  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }

  const meta = parseFrontmatter(content);

  return {
    meta: {
      slug,
      title: (meta.title as string) ?? slug,
      description: (meta.description as string) ?? "",
      category: (meta.category as string) ?? "general",
      tags: (meta.tags as string[]) ?? [],
      publishedAt: (meta.publishedAt as string) ?? "",
    },
    content: content.replace(/^---\n[\s\S]*?\n---\n?/, ""),
  };
}
