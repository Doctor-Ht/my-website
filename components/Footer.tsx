import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-light)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} 稻听途说. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/essays"
              className="text-sm text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text)] transition-colors"
            >
              随笔
            </Link>
            <Link
              href="/biology"
              className="text-sm text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text)] transition-colors"
            >
              生物学
            </Link>
            <Link
              href="/reading"
              className="text-sm text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text)] transition-colors"
            >
              读书
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
