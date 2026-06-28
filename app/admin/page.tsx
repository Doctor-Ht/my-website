"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const [configRes, CMS] = await Promise.all([
          fetch("/admin/config.yml?v=3"),
          import("decap-cms"),
        ]);

        if (!configRes.ok) throw new Error(`Config 加载失败: ${configRes.status}`);
        const configText = await configRes.text();

        CMS.default.init({ config: configText });

        if (!cancelled) setLoading(false);
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
          setLoading(false);
        }
      }
    }

    boot();
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <div style={{ padding: 40, fontFamily: "system-ui" }}>
        <h2>CMS 加载失败</h2>
        <pre style={{ color: "red" }}>{error}</pre>
        <p>请刷新重试。</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height: "100vh", fontFamily: "system-ui", color: "#86868b"
      }}>
        加载中...
      </div>
    );
  }

  return <div id="nc-root" />;
}
