import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

const contentRoot = path.join(process.cwd(), "content");

/**
 * Get all posts from a given section (essays | biology | reading),
 * sorted by date descending.
 */
export function getPosts(section: string): PostMeta[] {
  const dir = path.join(contentRoot, section);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title || "Untitled",
      date: data.date
        ? new Date(data.date).toISOString().slice(0, 10)
        : "1970-01-01",
      description: data.description || "",
      tags: data.tags || [],
    } as PostMeta;
  });

  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return posts;
}

/**
 * Get a single post by section and slug.
 */
export function getPost(section: string, slug: string): Post | null {
  const filePath = path.join(contentRoot, section, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date
      ? new Date(data.date).toISOString().slice(0, 10)
      : "1970-01-01",
    description: data.description || "",
    tags: data.tags || [],
    content,
  };
}

/**
 * Get all posts across all sections, sorted by date.
 */
export function getAllPosts(): (PostMeta & { section: string })[] {
  const sections = ["essays", "biology", "reading"];
  const all: (PostMeta & { section: string })[] = [];

  for (const section of sections) {
    const posts = getPosts(section);
    posts.forEach((p) => all.push({ ...p, section }));
  }

  all.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return all;
}

/**
 * Count posts in a section.
 */
export function getPostCount(section: string): number {
  return getPosts(section).length;
}
