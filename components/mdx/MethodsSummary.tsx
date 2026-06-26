"use client";

import { useState } from "react";

interface MethodsSummaryProps {
  title?: string;
  children: React.ReactNode;
}

export default function MethodsSummary({
  title = "🔬 方法与实验设计",
  children,
}: MethodsSummaryProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-glass p-4 my-6 not-prose">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="mt-3 pt-3 border-t border-[var(--glass-border)] text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
