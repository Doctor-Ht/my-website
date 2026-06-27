"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/posts";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    // Observe all heading elements
    const elements: Element[] = [];
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc-nav text-[0.9375rem]" aria-label="文章目录">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3">
        目录
      </h4>
      <ul className="space-y-1.5 border-l-2 border-[var(--color-border-light)]">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: h.level === 3 ? "1rem" : "0.25rem" }}
          >
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`block py-0.5 no-underline transition-colors duration-150 ${
                activeId === h.id
                  ? "text-[var(--color-accent)] font-medium"
                  : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
