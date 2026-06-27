import type { ReactNode } from "react";

interface InfoCardProps {
  title?: string;
  icon?: string;
  variant?: "default" | "accent" | "subtle";
  children: ReactNode;
}

const variantClasses = {
  default: "card-glass",
  accent: "card-glass-accent",
  subtle: "bg-[var(--color-bg-secondary)] border border-[var(--color-border-light)]",
};

export default function InfoCard({ title, icon, variant = "default", children }: InfoCardProps) {
  return (
    <div className={`${variantClasses[variant]} p-3.5 my-4 rounded-[var(--radius-md)]`}>
      {title && (
        <div className="flex items-center gap-1.5 mb-1.5">
          {icon && <span className="text-sm">{icon}</span>}
          <span className="text-xs font-semibold tracking-wide uppercase text-[var(--color-text-tertiary)]">
            {title}
          </span>
        </div>
      )}
      <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
