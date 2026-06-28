import { getPosts } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";
import ScrollReveal from "@/components/ScrollReveal";
import ReadingTabs from "./ReadingTabs";
import Link from "next/link";

export default function ReadingPage() {
  const posts = getPosts("reading");

  const grouped: Record<string, PostMeta[]> = {};
  for (const p of posts) {
    const cat = p.category || "未分类";
    (grouped[cat] ??= []).push(p);
  }

  return (
    <div data-section="reading" className="mx-auto max-w-4xl px-4 py-16">
      <ScrollReveal>
        <div className="mb-10">
          <div className="h-1 w-16 rounded-full bg-[var(--color-accent)] mb-6" />
          <Link
            href="/"
            className="text-sm text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] transition-colors"
          >
            ← 首页
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            <span className="gradient-text">读书笔记</span>
          </h1>
          <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed">
            读书心得、摘录与书评，阅读是通向世界的窗口。
          </p>
        </div>
      </ScrollReveal>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">📚</p>
          <p className="text-[var(--color-text-secondary)]">
            还没有文章，读书笔记即将到来。
          </p>
        </div>
      ) : (
        <ReadingTabs grouped={grouped} />
      )}
    </div>
  );
}
