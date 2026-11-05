import Hero from "@/components/Hero";
import ContentCard from "@/components/ContentCard";
import ArticleCard from "@/components/ArticleCard";
import { getAllPosts } from "@/lib/posts";

const sections = [
  {
    title: "随笔杂记",
    description: "日常思考与生活记录，随性而写，随心而记。",
    href: "/essays",
    label: "01 / ESSAYS",
  },
  {
    title: "生物学笔记",
    description: "整理生物学概念，记录阅读论文时的思考。",
    href: "/biology",
    label: "02 / BIOLOGY",
  },
  {
    title: "读书笔记",
    description: "读书心得、摘录与书评，阅读是通向世界的窗口。",
    href: "/reading",
    label: "03 / READING",
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      <section id="writing" className="mx-auto max-w-5xl scroll-mt-32 px-6 pb-16">
        <h2 className="mb-6 border-t border-[var(--color-border-light)] pt-8 text-2xl font-semibold tracking-tight">
          文章栏目
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {sections.map((section) => (
            <ContentCard key={section.href} {...section} />
          ))}
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="bg-[var(--color-bg-secondary)] py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">
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
