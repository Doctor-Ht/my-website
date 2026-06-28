import fs from "fs";
import path from "path";
import matter from "gray-matter";

// === Obsidian-flavored MDX preprocessing ===

/**
 * Preprocess Obsidian-flavored markdown into standard MDX.
 * Handles: [[wikilinks]], > [!type] callouts
 */
export function preprocessObsidian(content: string): string {
  // 1. Wikilinks: [[Page]] or [[Page|alias]] → search links
  content = content.replace(
    /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g,
    (_: string, page: string, alias: string) => {
      const label = (alias || page).trim();
      const query = encodeURIComponent(page.trim());
      return `[${label}](/search?q=${query})`;
    }
  );

  // 2. Obsidian callouts: line-by-line parser for > [!type] blocks
  content = convertObsidianCallouts(content);

  return content;
}

/** Convert Obsidian > [!type] callout blocks to <Callout> MDX components */
function convertObsidianCallouts(content: string): string {
  const lines = content.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    // Match start of an Obsidian callout: > [!type] Title (type can have +/- fold modifier)
    const calloutStart = line.match(/^>\s*\[!([a-z]+)\][+-]?\s*(.*)/i);

    if (calloutStart) {
      const type = calloutStart[1].toLowerCase();
      const title = calloutStart[2].trim();
      const bodyLines: string[] = [];
      i++;

      // Collect subsequent > prefixed lines (the callout body)
      while (i < lines.length) {
        const bodyLine = lines[i];
        if (bodyLine.match(/^>\s?/)) {
          bodyLines.push(bodyLine.replace(/^>\s?/, ""));
          i++;
        } else if (bodyLine.trim() === "") {
          // Empty line might be part of the callout — check next line
          // peek: if next non-empty line starts with >, consume this blank too
          let peek = i + 1;
          while (peek < lines.length && lines[peek].trim() === "") peek++;
          if (peek < lines.length && lines[peek].match(/^>\s?/)) {
            bodyLines.push("");
            i++;
          } else {
            break;
          }
        } else {
          break;
        }
      }

      // Map callout type to our component's type prop
      const typeMap: Record<string, string> = {
        note: "info",
        info: "info",
        warning: "warning",
        danger: "important",
        error: "important",
        tip: "tip",
        hint: "tip",
        important: "important",
        abstract: "info",
        summary: "info",
        tldr: "info",
        todo: "info",
        success: "tip",
        question: "info",
        help: "info",
        faq: "info",
        example: "tip",
        quote: "info",
        cite: "info",
      };
      const mappedType = typeMap[type] || "info";

      const body = bodyLines.join("\n").trim();
      const titleAttr = title ? ` title="${title}"` : "";
      out.push(`<Callout type="${mappedType}"${titleAttr}>`);
      out.push(body);
      out.push("</Callout>");
    } else {
      out.push(line);
      i++;
    }
  }

  return out.join("\n");
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  category?: string;
  tags?: string[];
  paper?: PaperMeta;
}

export interface Post extends PostMeta {
  content: string;
}

/** Paper/book interpretation metadata — optional, only for paper-note posts */
export interface PaperMeta {
  authors?: string[];
  journal?: string;
  doi?: string;
  publishedDate?: string;
  paperUrl?: string;
  paperType?: "original" | "review" | "preprint" | "perspective";
  keyFindings?: string[];
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
      category: data.category || undefined,
      tags: data.tags || [],
      paper: extractPaperMeta(data),
    } as PostMeta;
  });

  // ponytail: no content preprocessing needed for listing — only metadata used
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
    paper: extractPaperMeta(data),
    content: preprocessObsidian(content),
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

export interface Heading {
  level: number;
  text: string;
  id: string;
}

/**
 * Extract h2 and h3 headings from MDX content for TOC generation.
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Generate a stable ID from the heading text
    const id = text
      .toLowerCase()
      .replace(/[^一-鿿\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ level, text, id });
  }

  return headings;
}

/**
 * Extract paper metadata from frontmatter.
 * Supports both nested `paper:` and flat top-level keys.
 */
function extractPaperMeta(data: Record<string, unknown>): PaperMeta | undefined {
  const paper = data.paper as Record<string, unknown> | undefined;

  const authors = (paper?.authors || data.authors) as string[] | undefined;
  const journal = (paper?.journal || data.journal) as string | undefined;
  const doi = (paper?.doi || data.doi) as string | undefined;
  const publishedDate = (paper?.publishedDate || data.publishedDate) as string | undefined;
  const paperUrl = (paper?.paperUrl || data.paperUrl) as string | undefined;
  const paperType = (paper?.paperType || data.paperType) as PaperMeta["paperType"];
  const keyFindings = (paper?.keyFindings || data.keyFindings) as string[] | undefined;

  // Only return paper meta if at least one field is present
  if (authors || journal || doi || publishedDate || paperUrl || paperType || keyFindings) {
    return {
      authors: Array.isArray(authors) ? authors : authors ? [authors] : undefined,
      journal,
      doi,
      publishedDate,
      paperUrl,
      paperType,
      keyFindings: Array.isArray(keyFindings) ? keyFindings : keyFindings ? [keyFindings] : undefined,
    };
  }

  return undefined;
}
