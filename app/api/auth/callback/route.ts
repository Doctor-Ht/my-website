import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new NextResponse(
      `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:system-ui;padding:40px;text-align:center"><h2>授权失败</h2><p>缺少授权码 (code)</p></body></html>`,
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Render immediately, exchange code via client-side POST
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>正在完成授权...</title>
  <style>
    body { font-family: -apple-system, Segoe UI, PingFang SC, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f5f5f7; }
    .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); text-align: center; max-width: 400px; }
    .spinner { width: 32px; height: 32px; border: 3px solid #e5e5e5; border-top-color: #0071e3; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 20px auto; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .success { color: #34c759; }
    .error { color: #ff3b30; }
  </style>
</head>
<body>
  <div class="card">
    <h2 id="status">正在完成授权...</h2>
    <div class="spinner" id="spinner"></div>
    <p id="msg" style="color:#86868b;font-size:14px;"></p>
  </div>
  <script>
    (async function() {
      var code = "${code}";
      var el = document.getElementById("status");
      var msg = document.getElementById("msg");
      var spinner = document.getElementById("spinner");

      try {
        var res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider: "github", code: code })
        });
        var data = await res.json();

        if (data.token) {
          el.textContent = "授权成功！";
          el.className = "success";
          spinner.style.display = "none";

          var openerExists = window.opener && !window.opener.closed;

          if (openerExists) {
            // Send raw object (not stringified) — postMessage uses structured clone
            window.opener.postMessage({
              token: data.token,
              provider: "github"
            }, window.location.origin);
            // Also try string format for compatibility
            window.opener.postMessage(
              "authorization:github:success:" + data.token,
              window.location.origin
            );
            msg.textContent = "已返回编辑器，可关闭此窗口。";
          } else {
            msg.innerHTML = "<b>警告：</b>无法连接到编辑器页面 (window.opener 为 null)。<br><small style='color:#86868b'>可能是弹窗被拦截，请允许弹窗后重试。</small>";
          }
        } else {
          el.textContent = "授权失败";
          el.className = "error";
          msg.textContent = data.error || "无法获取访问令牌";
          spinner.style.display = "none";
        }
      } catch (e) {
        el.textContent = "网络错误";
        el.className = "error";
        msg.textContent = e.message;
        spinner.style.display = "none";
      }
    })();
  </script>
</body>
</html>`,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}
