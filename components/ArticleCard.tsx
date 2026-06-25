import Link from "next/link";
import CardTilt from "@/components/CardTilt";

interface ArticleCardProps {
  title: string;
  date: string;
  description: string;
  slug: string;
  section: "essays" | "biology" | "reading";
  tags?: string[];
}

export default function ArticleCard({
  title,
  date,
  description,
  slug,
  section,
  tags,
}: ArticleCardProps) {
  return (
    <Link href={`/${section}/${slug}`} className="no-underline group block">
      <CardTilt className="card-apple p-6" strength={5}>
        <div className="flex items-center gap-3 mb-2">
          <time className="text-xs font-medium text-[var(--color-text-tertiary)]">
            {date}
          </time>
          {tags && tags.length > 0 && (
            <div className="flex gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-1.5 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
          {description}
        </p>
      </CardTilt>
    </Link>
  );
}
