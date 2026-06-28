"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import ScrollReveal from "@/components/ScrollReveal";

const CATEGORIES = [
  { key: "哲学", label: "哲学", icon: "🏛️", desc: "追问存在、意义与智慧" },
  { key: "文学", label: "文学", icon: "📖", desc: "小说、诗歌与写作的艺术" },
  { key: "科学", label: "科学", icon: "🔬", desc: "认知、行为与自然之理" },
] as const;

interface Props {
  grouped: Record<string, PostMeta[]>;
}

export default function ReadingTabs({ grouped }: Props) {
  const activeCats = CATEGORIES.filter((c) => grouped[c.key]?.length);
  const [active, setActive] = useState(activeCats[0]?.key ?? "哲学");

  return (
    <>
      {/* Category tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {activeCats.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              active === cat.key
                ? "bg-[var(--color-accent)] text-white shadow-md"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)]"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
            <span className="opacity-60 text-xs">{grouped[cat.key].length}</span>
          </button>
        ))}
      </div>

      {/* Active category description */}
      {(() => {
        const meta = CATEGORIES.find((c) => c.key === active);
        return (
          <p className="mb-6 text-sm text-[var(--color-text-tertiary)]">
            {meta?.desc}
          </p>
        );
      })()}

      {/* Active category articles */}
      <div className="flex flex-col gap-4">
        {(grouped[active] || []).map((post, i) => (
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
    </>
  );
}
