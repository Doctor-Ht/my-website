import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-grid relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="hero-orb" />
      <div className="hero-orb" />
      <div className="hero-orb" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)] pointer-events-none" />
      <div className="relative z-10">
        <p className="animate-fade-in mb-3 text-sm font-medium tracking-widest uppercase text-[var(--color-text-tertiary)]">
          道听途说
        </p>
        <h1 className="animate-fade-in animate-delay-1 mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-br from-[var(--color-text)] via-[var(--color-accent)] to-[#6366f1] bg-clip-text text-transparent">
          稻听途说
        </h1>
        <p className="animate-fade-in animate-delay-2 mb-10 max-w-lg mx-auto text-lg text-[var(--color-text-secondary)] leading-relaxed">
          道听而途说，德之弃也。然学不可以已。
          <br />
          记录生物学笔记，分享读书心得，写下日常随笔。
        </p>
        <div className="animate-fade-in animate-delay-3 flex items-center justify-center gap-4">
          <Link
            href="/essays"
            className="rounded-full bg-[var(--color-text)] px-6 py-3 text-sm font-medium text-white no-underline transition-all hover:bg-black hover:scale-[1.02]"
          >
            开始阅读
          </Link>
          <Link
            href="/biology"
            className="rounded-full bg-[var(--color-bg-secondary)] px-6 py-3 text-sm font-medium text-[var(--color-text)] no-underline transition-all hover:bg-[#e8e8ed] hover:scale-[1.02]"
          >
            探索笔记
          </Link>
        </div>
      </div>
    </section>
  );
}
