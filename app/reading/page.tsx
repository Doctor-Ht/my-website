import { getPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

const CATEGORIES = [
  { key: "哲学", label: "哲学", icon: "🏛️", desc: "追问存在、意义与智慧" },
  { key: "文学", label: "文学", icon: "📖", desc: "小说、诗歌与写作的艺术" },
  { key: "科学", label: "科学", icon: "🔬", desc: "认知、行为与自然之理" },
] as const;

const CATEGORY_ORDER: Record<string, number> = {
  "哲学": 0,
  "文学": 1,
  "科学": 2,
};

export default function ReadingPage() {
  const posts = getPosts("reading");

  const grouped: Record<string, typeof posts> = {};
  for (const p of posts) {
    const cat = p.category || "未分类";
    (grouped[cat] ??= []).push(p);
  }

  const sortedKeys = Object.keys(grouped).sort(
    (a, b) => (CATEGORY_ORDER[a] ?? 99) - (CATEGORY_ORDER[b] ?? 99)
  );

  return (
    <div data-section="reading" className="mx-auto max-w-4xl px-4 py-16">
      <ScrollReveal>
        <div className="mb-12">
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
        <div className="flex flex-col gap-10">
          {sortedKeys.map((cat) => {
            const catMeta = CATEGORIES.find((c) => c.key === cat);
            return (
              <section key={cat}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{catMeta?.icon ?? "📚"}</span>
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-text)]">
                      {cat}
                    </h2>
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      {catMeta?.desc}
                    </p>
                  </div>
                  <span className="ml-auto text-sm text-[var(--color-text-tertiary)]">
                    {grouped[cat].length} 篇
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {grouped[cat].map((post, i) => (
                    <ScrollReveal key={post.slug} delay={i * 60}>
                      <ArticleCard
                        title={post.title}
                        date={post.date}
                        description={post.description}
                        slug={post.slug}
                        section="reading"
                        tags={post.tags}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
