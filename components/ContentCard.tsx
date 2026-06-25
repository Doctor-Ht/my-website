import Link from "next/link";
import CardTilt from "@/components/CardTilt";

interface ContentCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  count?: number;
}

export default function ContentCard({
  title,
  description,
  href,
  icon,
  count,
}: ContentCardProps) {
  return (
    <Link href={href} className="no-underline group block">
      <CardTilt className="card-apple p-8 h-full flex flex-col">
        <span className="text-4xl mb-5 block">{icon}</span>
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
        <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
          浏览 →
        </span>
      </CardTilt>
    </Link>
  );
}
