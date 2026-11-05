"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/app/api/search/route";

function filterResults(index: SearchResult[], query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return index.slice(0, 8);

  return index
    .map((item) => {
      let score = 0;
      if (item.title.toLowerCase().includes(term)) score += 100;
      if (item.tags.some((tag) => tag.toLowerCase().includes(term))) score += 50;
      if (item.description.toLowerCase().includes(term)) score += 30;
      if (item.snippet.toLowerCase().includes(term)) score += 10;
      if (item.authors?.some((author) => author.toLowerCase().includes(term))) score += 40;
      if (item.journal?.toLowerCase().includes(term)) score += 30;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ item }) => item);
}

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchResult[] | "error" | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(
    () => Array.isArray(index) ? filterResults(index, query) : [],
    [index, query],
  );

  useEffect(() => {
    if (!open || index !== null) return;

    const request = new AbortController();
    fetch("/api/search", { signal: request.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Search index unavailable");
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid search index");
        if (!request.signal.aborted) setIndex(data);
      })
      .catch(() => {
        if (!request.signal.aborted) setIndex("error");
      });

    return () => request.abort();
  }, [open, index]);

  const handleOpenSearch = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    setIndex((previous) => previous === "error" ? null : previous);
    setOpen(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.isComposing) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else handleOpenSearch();
      }
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search", handleOpenSearch);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, [open, handleOpenSearch]);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const navigate = (slug: string, section: string) => {
    setOpen(false);
    router.push(`/${section}/${slug}`);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "ArrowDown" && results.length > 0) {
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
        role="dialog"
        aria-label="站内搜索"
        className="card-glass-strong w-full max-w-lg rounded-2xl overflow-hidden"
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
            aria-label="搜索文章"
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
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
          {index === "error" ? (
            <div className="py-8 text-center text-sm text-[var(--color-text-secondary)]">
              <p role="status">无法加载搜索索引</p>
              <button type="button" className="mt-2 underline" onClick={() => setIndex(null)}>
                重试
              </button>
            </div>
          ) : results.length === 0 ? (
            <p role="status" className="text-center py-8 text-sm text-[var(--color-text-tertiary)]">
              {index === null ? "加载中..." : "没有找到相关文章"}
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
