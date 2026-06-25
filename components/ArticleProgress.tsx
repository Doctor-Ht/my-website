"use client";

import { useEffect, useState } from "react";

export default function ArticleProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const handleScroll = () => {
      const rect = article.getBoundingClientRect();
      const articleTop = rect.top;
      const articleHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Article hasn't entered viewport yet
      if (articleTop > viewportHeight) {
        setVisible(false);
        return;
      }

      // Article completely above viewport
      if (articleTop + articleHeight < 0) {
        setProgress(100);
        return;
      }

      setVisible(true);
      const scrolled = -articleTop + viewportHeight;
      const total = articleHeight + viewportHeight;
      setProgress(Math.min(100, Math.max(0, Math.round((scrolled / total) * 100))));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-12 left-6 z-30 flex items-center gap-2 text-xs text-[var(--color-text-tertiary)] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-1 w-16 rounded-full bg-[var(--color-border-light)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span>{progress}%</span>
    </div>
  );
}
