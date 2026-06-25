import { getPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function BiologyPage() {
  const posts = getPosts("biology");

  return (
    <div data-section="biology" className="mx-auto max-w-4xl px-4 py-16">
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
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-emerald-300 bg-clip-text text-transparent">生物学笔记</span>
          </h1>
          <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed">
            分子生物学、遗传学与生态学的学习笔记与思考。
          </p>
        </div>
      </ScrollReveal>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🧬</p>
          <p className="text-[var(--color-text-secondary)]">
            还没有文章，生物学笔记即将到来。
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 80}>
              <ArticleCard
                title={post.title}
                date={post.date}
                description={post.description}
                slug={post.slug}
                section="biology"
                tags={post.tags}
              />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
