"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
          Zilin&apos;s Space
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
        </div>
      </div>
    </nav>
  );
}
