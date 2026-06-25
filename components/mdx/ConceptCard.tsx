import type { ReactNode } from "react";

interface ConceptCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
}

export default function ConceptCard({ title, icon = "📌", children }: ConceptCardProps) {
  return (
    <div className="card-apple p-5 my-5">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="font-semibold text-[var(--color-text)] mb-1">{title}</h4>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}
