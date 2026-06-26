import CardTilt from "@/components/CardTilt";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PaperCardProps {
  post: PostMeta;
}

const typeBadge: Record<string, string> = {
  original: "原始研究",
  review: "综述",
  preprint: "预印本",
  perspective: "观点",
};

export default function PaperCard({ post }: PaperCardProps) {
  const paper = post.paper;
  const authorsText = paper?.authors
    ? paper.authors.length > 3
      ? `${paper.authors.slice(0, 3).join(", ")} et al.`
      : paper.authors.join(", ")
    : null;

  return (
    <Link
      href={`/biology/${post.slug}`}
      className="no-underline group block"
    >
      <CardTilt className="card-glass-accent p-5" strength={4}>
        {/* Paper type badge + Journal */}
        <div className="flex items-center gap-2 mb-3">
          {paper?.paperType && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[var(--color-accent-bg)] text-[var(--color-accent)]">
              📄 {typeBadge[paper.paperType]}
            </span>
          )}
          {paper?.journal && (
            <span className="text-[11px] text-[var(--color-text-tertiary)]">
              {paper.journal}
              {paper.publishedDate && ` (${new Date(paper.publishedDate).getFullYear()})`}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Authors */}
        {authorsText && (
          <p className="text-xs text-[var(--color-text-tertiary)] mb-2 line-clamp-1">
            {authorsText}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2 mb-3">
          {post.description}
        </p>

        {/* Key findings preview */}
        {paper?.keyFindings && paper.keyFindings.length > 0 && (
          <div className="space-y-1 mb-3">
            {paper.keyFindings.slice(0, 2).map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-1.5 text-xs text-[var(--color-text-secondary)]"
              >
                <span className="mt-1 h-1 w-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                <span className="line-clamp-1">{f}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom row: date + tags */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {post.date}
          </span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap justify-end">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-pill text-[11px] px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardTilt>
    </Link>
  );
}
