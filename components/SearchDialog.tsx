"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/app/api/search/route";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allData, setAllData] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load search index on first open
  useEffect(() => {
    if (open && allData.length === 0) {
      fetch("/api/search")
        .then((r) => r.json())
        .then(setAllData)
        .catch(() => {});
    }
  }, [open, allData.length]);

  // Filter results
  useEffect(() => {
    if (!query.trim()) {
      setResults(allData.slice(0, 8));
      setSelectedIndex(0);
      return;
    }

    const q = query.toLowerCase();
    const scored = allData
      .map((item) => {
        let score = 0;
        if (item.title.toLowerCase().includes(q)) score += 100;
        if (item.tags.some((t) => t.toLowerCase().includes(q))) score += 50;
        if (item.description.toLowerCase().includes(q)) score += 30;
        if (item.snippet.toLowerCase().includes(q)) score += 10;
        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ item }) => item);

    setResults(scored);
    setSelectedIndex(0);
  }, [query, allData]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    },
    []
  );

  const handleOpenSearch = useCallback(() => setOpen(true), []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search", handleOpenSearch);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, [handleKeyDown, handleOpenSearch]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  const navigate = (slug: string, section: string) => {
    setOpen(false);
    router.push(`/${section}/${slug}`);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      const r = results[selectedIndex];
      navigate(r.slug, r.section);
    }
  };

  if (!open) return null;

  const sectionLabel: Record<string, string> = {
    essays: "随笔",
    biology: "生物学",
    reading: "读书",
  };

  return (
    <div
      className="search-overlay fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-light)] shadow-2xl overflow-hidden"
        style={{
          background: "var(--color-card-bg)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 border-b border-[var(--color-border-light)]">
          <svg
            className="w-4 h-4 text-[var(--color-text-tertiary)] flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="搜索文章..."
            className="flex-1 py-3.5 bg-transparent text-[var(--color-text)] outline-none text-sm placeholder:text-[var(--color-text-tertiary)]"
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 ? (
            <p className="text-center py-8 text-sm text-[var(--color-text-tertiary)]">
              {allData.length === 0 ? "加载中..." : "没有找到相关文章"}
            </p>
          ) : (
            results.map((item, i) => (
              <button
                key={`${item.section}/${item.slug}`}
                onClick={() => navigate(item.slug, item.section)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                  i === selectedIndex
                    ? "bg-[var(--color-bg-secondary)]"
                    : "hover:bg-[var(--color-bg-secondary)]"
                }`}
              >
                <span className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0 mt-0.5"
                  style={{
                    background: "var(--color-accent-bg)",
                    color: "var(--color-accent)",
                  }}
                >
                  {sectionLabel[item.section]}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text)] truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)] truncate mt-0.5">
                    {item.description}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-border-light)] px-4 py-2 flex items-center gap-4 text-[10px] text-[var(--color-text-tertiary)]">
          <span>↑↓ 导航</span>
          <span>↵ 打开</span>
          <span>ESC 关闭</span>
        </div>
      </div>
    </div>
  );
}
