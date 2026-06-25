import type { ReactNode } from "react";

interface DefinitionBoxProps {
  term: string;
  children: ReactNode;
}

export default function DefinitionBox({ term, children }: DefinitionBoxProps) {
  return (
    <div className="my-5 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-4">
      <dt className="text-sm font-semibold text-[var(--color-accent)] mb-1">{term}</dt>
      <dd className="text-sm text-[var(--color-text-secondary)] leading-relaxed ml-0">{children}</dd>
    </div>
  );
}
