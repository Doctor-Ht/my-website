import { getPosts } from "@/lib/posts";
import ScrollReveal from "@/components/ScrollReveal";
import BiologySidebar from "@/components/BiologySidebar";
import BiologyCard from "@/components/BiologyCard";
import PaperCard from "@/components/PaperCard";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ topic?: string }>;
}

export default async function BiologyPage({ searchParams }: Props) {
  const { topic: activeTopic } = await searchParams;
  const allPosts = getPosts("biology");

  // Filter by topic if active
  const posts = activeTopic
    ? allPosts.filter((p) =>
        p.tags?.some((t) => t.toLowerCase().includes(activeTopic.toLowerCase()))
      )
    : allPosts;

  const topicName = activeTopic
    ? posts.length > 0 && posts[0].tags
      ? posts[0].tags.find((t) =>
          t.toLowerCase().includes(activeTopic.toLowerCase())
        ) || activeTopic
      : activeTopic
    : null;

  return (
    <div data-section="biology" className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-24">
            <BiologySidebar />
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
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
                <span className="gradient-text">生物学笔记</span>
              </h1>
              <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed">
                分子生物学、遗传学与生态学的学习笔记与思考。
              </p>

              {/* Active topic filter indicator */}
              {activeTopic && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-[var(--color-text-tertiary)]">
                    筛选:
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-accent-bg)] text-[var(--color-accent)]">
                    {topicName}
                  </span>
                  <Link
                    href="/biology"
                    className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    ✕ 清除
                  </Link>
                </div>
              )}
            </div>
          </ScrollReveal>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🧬</p>
              <p className="text-[var(--color-text-secondary)]">
                {activeTopic
                  ? "该主题下还没有文章。"
                  : "还没有文章，生物学笔记即将到来。"}
              </p>
              {activeTopic && (
                <Link
                  href="/biology"
                  className="mt-4 inline-block text-sm text-[var(--color-accent)] hover:underline"
                >
                  ← 查看全部文章
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {posts.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 80}>
                  {post.paper ? (
                    <PaperCard post={post} />
                  ) : (
                    <BiologyCard post={post} />
                  )}
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
