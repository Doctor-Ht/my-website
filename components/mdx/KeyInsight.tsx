interface KeyInsightProps {
  title?: string;
  children: React.ReactNode;
}

export default function KeyInsight({ title = "💡 核心洞见", children }: KeyInsightProps) {
  return (
    <div className="card-glass-accent p-5 my-6 not-prose border-l-[3px] border-l-[var(--color-accent)] rounded-l-none">
      <p className="text-sm font-semibold text-[var(--color-accent)] mb-2">
        {title}
      </p>
      <div className="text-sm text-[var(--color-text)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
