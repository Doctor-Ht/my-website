"use client";

import { useState } from "react";
import { biologyTopics } from "@/lib/biology";

export default function BiologySidebar() {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(biologyTopics.map((t) => t.slug))
  );

  const toggle = (slug: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <nav className="text-[0.9375rem]" aria-label="生物学知识导航">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
        知识体系
      </h4>
      <ul className="space-y-0.5">
        {biologyTopics.map((topic) => (
          <li key={topic.slug}>
            <button
              onClick={() => toggle(topic.slug)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            >
              <span className="text-xs">{topic.icon}</span>
              <span className="flex-1 font-medium">{topic.name}</span>
              <svg
                className={`w-3 h-3 transition-transform ${expanded.has(topic.slug) ? "rotate-90" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            {expanded.has(topic.slug) && topic.children && (
              <ul className="ml-5 mt-0.5 space-y-0.5 border-l border-[var(--color-border-light)] pl-2">
                {topic.children.map((child) => (
                  <li key={child.slug}>
                    <a
                      href={`/biology?topic=${child.slug}`}
                      className="block px-2 py-1 rounded-md text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-bg)] transition-colors text-sm"
                    >
                      {child.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
