import { getPost, getPosts, extractHeadings } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import MdxRenderer from "@/components/MdxRenderer";
import ScrollReveal from "@/components/ScrollReveal";
import TableOfContents from "@/components/TableOfContents";
import ArticleProgress from "@/components/ArticleProgress";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPosts("reading");
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function ReadingPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost("reading", slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);

  return (
    <div data-section="reading" className="mx-auto max-w-6xl px-4 py-16">
      <Link
        href="/reading"
        className="text-sm text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] transition-colors"
      >
        ← 返回读书笔记
      </Link>

      <div className="mt-8 flex gap-12">
        <article className="min-w-0 flex-1">
          <ScrollReveal>
            <header className="mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4">
                <time className="text-sm text-[var(--color-text-tertiary)]">
                  {post.date}
                </time>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>
          </ScrollReveal>
          <MdxRenderer source={post.content} />
        </article>

        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      <ArticleProgress />
    </div>
  );
}
