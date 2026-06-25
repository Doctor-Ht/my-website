"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/essays", label: "随笔" },
  { href: "/biology", label: "生物学" },
  { href: "/reading", label: "读书" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="nav-blur sticky top-0 z-50 border-b border-[var(--color-border-light)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--color-text)] no-underline"
        >
          稻听途说
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors no-underline ${
                  isActive
                    ? "bg-[var(--color-text)] text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
            aria-label="搜索"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
