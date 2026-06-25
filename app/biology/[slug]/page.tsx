import { getPost, getPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import MdxRenderer from "@/components/MdxRenderer";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getPosts("biology");
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BiologyPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost("biology", slug);

  if (!post) notFound();

  return (
    <div data-section="biology" className="mx-auto max-w-4xl px-4 py-16">
      <Link
        href="/biology"
        className="text-sm text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] transition-colors"
      >
        ← 返回生物学笔记
      </Link>
      <article className="mt-8">
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
        <ScrollReveal delay={100}>
          <MdxRenderer source={post.content} />
        </ScrollReveal>
      </article>
    </div>
  );
}
