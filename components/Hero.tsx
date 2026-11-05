export default function Hero() {
  return (
    <section className="hero-grid relative isolate overflow-hidden">
      <div className="hero-orb motion-reduce:animate-none" aria-hidden="true" />
      <div className="hero-orb motion-reduce:animate-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)] pointer-events-none" />
      <div className="relative mx-auto grid max-w-5xl items-end gap-10 px-6 pt-16 pb-14 sm:pt-24 sm:pb-20 md:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="mb-5 font-mono text-xs font-medium tracking-[0.18em] text-[var(--color-text-secondary)]">
            DOCTOR-HT / PERSONAL SITE
          </p>
          <h1 className="mb-5 text-5xl font-bold tracking-tight text-[var(--color-text)] sm:text-7xl">
            稻听途说
          </h1>
          <p className="max-w-md text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
            写下读书时的问题、生物学笔记和日常观察，也记录把想法做成网页的过程。
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href="#writing"
              className="inline-flex rounded-full bg-[var(--color-text)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] no-underline transition-colors hover:bg-[var(--color-accent)] hover:text-white"
            >
              浏览文章 <span className="ml-2" aria-hidden="true">↓</span>
            </a>
            <a
              href="https://github.com/Doctor-Ht"
              className="inline-flex min-h-10 items-center text-sm font-medium text-[var(--color-text)] underline-offset-4 hover:underline"
            >
              GitHub <span className="ml-2" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <aside aria-labelledby="featured-project" className="card-apple p-6 sm:p-7">
          <p className="mb-3 text-xs font-medium tracking-widest text-[var(--color-text-secondary)]">
            精选项目
          </p>
          <h2 id="featured-project" className="text-xl font-semibold tracking-tight">
            稻听途说 · 个人网站
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            用 MDX 组织文章，为笔记加上目录、站内搜索和深浅主题。
          </p>
          <a
            href="https://github.com/Doctor-Ht/my-website"
            className="mt-5 flex border-t border-[var(--color-border-light)] pt-4 text-sm font-medium text-[var(--color-text)] underline-offset-4 hover:underline"
          >
            查看网站源码 <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
