import CardTilt from "@/components/CardTilt";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface BiologyCardProps {
  post: PostMeta;
}

const topicIcons: Record<string, string> = {
  "分子生物学": "🧬",
  "遗传学": "🧫",
  "生物技术": "🔬",
  "细胞生物学": "🦠",
  "生态": "🌿",
};

function guessIcon(tags?: string[]): string {
  if (!tags) return "📝";
  for (const tag of tags) {
    for (const [key, icon] of Object.entries(topicIcons)) {
      if (tag.includes(key)) return icon;
    }
  }
  return "🧬";
}

export default function BiologyCard({ post }: BiologyCardProps) {
  const icon = guessIcon(post.tags);

  return (
    <Link href={`/biology/${post.slug}`} className="no-underline group block">
      <CardTilt className="card-apple p-5" strength={6}>
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">{icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
              {post.title}
            </h3>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-2">{post.date}</p>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
              {post.description}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-pill text-xs">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardTilt>
    </Link>
  );
}
