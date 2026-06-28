"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const [configRes, CMS] = await Promise.all([
          fetch("/admin/config.yml?v=3"),
          import("decap-cms"),
        ]);

        if (!configRes.ok) throw new Error(`Config 加载失败: HTTP ${configRes.status}`);
        const configText = await configRes.text();

        CMS.default.init({ config: configText });

        // Small delay to let CMS mount before hiding loading state
        setTimeout(() => {
          if (!cancelled) setStatus("ready");
        }, 500);
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
          setStatus("error");
        }
      }
    }

    boot();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {/* CMS root — always present so CMS can mount */}
      <div id="nc-root" />

      {/* Loading overlay */}
      {status === "loading" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", justifyContent: "center", alignItems: "center",
          fontFamily: "system-ui", color: "#86868b", background: "#f5f5f7"
        }}>
          加载中...
        </div>
      )}

      {/* Error overlay */}
      {status === "error" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          fontFamily: "system-ui", background: "#f5f5f7"
        }}>
          <h2 style={{ color: "#1d1d1f" }}>CMS 加载失败</h2>
          <pre style={{ color: "#ff3b30", maxWidth: 600, whiteSpace: "pre-wrap" }}>{error}</pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16, padding: "8px 24px", borderRadius: 8,
              background: "#0071e3", color: "white", border: "none", cursor: "pointer"
            }}
          >
            重试
          </button>
        </div>
      )}
    </>
  );
}
