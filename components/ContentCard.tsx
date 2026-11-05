import Link from "next/link";
import CardTilt from "@/components/CardTilt";

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  label: string;
  count?: number;
}

export default function ContentCard({
  title,
  description,
  href,
  label,
  count,
}: ContentCardProps) {
  return (
    <Link href={href} className="group block h-full rounded-[var(--radius-xl)] no-underline">
      <CardTilt className="card-apple flex h-full flex-col p-6">
        <span className="mb-4 font-mono text-xs font-medium tracking-wider text-[var(--color-text-secondary)]" aria-hidden="true">
          {label}
        </span>
        <h3 className="text-xl font-semibold mb-2 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
          {description}
        </p>
        {count !== undefined && (
          <p className="mt-4 text-xs text-[var(--color-text-tertiary)]">
            {count} 篇文章
          </p>
        )}
        <span className="mt-4 text-sm font-medium text-[var(--color-text)]" aria-hidden="true">
          浏览 →
        </span>
      </CardTilt>
    </Link>
  );
}
