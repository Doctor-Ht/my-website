import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");
const sections = ["essays", "biology", "reading"];

export interface SearchResult {
  title: string;
  description: string;
  tags: string[];
  section: string;
  slug: string;
  date: string;
  snippet: string;
  authors?: string[];
  journal?: string;
}

// Build search index at module level (cached across requests)
let cachedIndex: SearchResult[] | null = null;

function buildIndex(): SearchResult[] {
  if (cachedIndex) return cachedIndex;

  const results: SearchResult[] = [];

  for (const section of sections) {
    const dir = path.join(contentRoot, section);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);

      // First ~200 chars of content for snippet
      const plainText = content
        .replace(/^#.*$/gm, "")
        .replace(/[#*`[\]()\n\r]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const snippet = plainText.slice(0, 200);

      // Extract paper metadata if present
      const paper = data.paper as Record<string, unknown> | undefined;
      const authors = (paper?.authors || data.authors) as string[] | undefined;
      const journal = (paper?.journal || data.journal) as string | undefined;

      results.push({
        title: data.title || "Untitled",
        description: data.description || "",
        tags: data.tags || [],
        section,
        slug: file.replace(/\.mdx$/, ""),
        date: data.date
          ? new Date(data.date).toISOString().slice(0, 10)
          : "1970-01-01",
        snippet,
        authors: Array.isArray(authors) ? authors : undefined,
        journal,
      });
    }
  }

  results.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  cachedIndex = results;
  return results;
}

export async function GET() {
  const index = buildIndex();
  return NextResponse.json(index, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
