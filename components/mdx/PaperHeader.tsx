import type { PaperMeta } from "@/lib/posts";

interface PaperHeaderProps {
  paper: PaperMeta;
}

const typeLabels: Record<string, string> = {
  original: "📄 原始研究",
  review: "📑 综述",
  preprint: "📝 预印本",
  perspective: "💡 观点",
};

const typeStyles: Record<string, string> = {
  original: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  review: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  preprint: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  perspective: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function PaperHeader({ paper }: PaperHeaderProps) {
  return (
    <div className="card-glass-accent p-6 mb-10 not-prose">
      {/* Authors */}
      {paper.authors && paper.authors.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
            作者
          </p>
          <p className="text-[var(--color-text)] leading-relaxed">
            {paper.authors.map((a, i) => (
              <span key={a}>
                {a}
                {i < paper.authors!.length - 1 && (
                  <span className="text-[var(--color-text-tertiary)]">, </span>
                )}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Journal + DOI + Type row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {paper.journal && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]">
            📰 {paper.journal}
            {paper.publishedDate && (
              <span className="text-[var(--color-text-tertiary)]">
                ({new Date(paper.publishedDate).getFullYear()})
              </span>
            )}
          </span>
        )}
        {paper.paperType && (
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${typeStyles[paper.paperType]}`}>
            {typeLabels[paper.paperType]}
          </span>
        )}
        {paper.doi && (
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-accent-bg)] text-[var(--color-accent)] hover:underline"
          >
            DOI: {paper.doi}
          </a>
        )}
      </div>

      {/* Key Findings */}
      {paper.keyFindings && paper.keyFindings.length > 0 && (
        <div className="mb-3">
          <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            🔑 关键发现
          </p>
          <ul className="space-y-1.5">
            {paper.keyFindings.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-[var(--color-text)] leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* View Paper link */}
      {paper.paperUrl && (
        <a
          href={paper.paperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
        >
          📖 查看原文
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      )}
    </div>
  );
}
