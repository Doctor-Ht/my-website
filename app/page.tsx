import Hero from "@/components/Hero";
import ContentCard from "@/components/ContentCard";
import ArticleCard from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";

const sections = [
  {
    title: "随笔杂记",
    description: "日常思考与生活记录，随性而写，随心而记。",
    href: "/essays",
    icon: "✍️",
  },
  {
    title: "生物学笔记",
    description: "分子生物学、遗传学与生态学的学习笔记与思考。",
    href: "/biology",
    icon: "🧬",
  },
  {
    title: "读书笔记",
    description: "读书心得、摘录与书评，阅读是通向世界的窗口。",
    href: "/reading",
    icon: "📚",
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      {/* Content Sections */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-2xl font-semibold text-center mb-12 tracking-tight">
          探索内容
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <div
              key={section.href}
              className={`animate-fade-in ${
                i === 0
                  ? "animate-delay-1"
                  : i === 1
                  ? "animate-delay-2"
                  : "animate-delay-3"
              }`}
            >
              <ContentCard {...section} />
            </div>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-[var(--color-bg-secondary)] py-24">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-semibold text-center mb-12 tracking-tight">
              最近更新
            </h2>
            <div className="flex flex-col gap-4">
              {recentPosts.map((post) => (
                <ArticleCard
                  key={`${post.section}/${post.slug}`}
                  title={post.title}
                  date={post.date}
                  description={post.description}
                  slug={post.slug}
                  section={post.section as "essays" | "biology" | "reading"}
                  tags={post.tags}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
