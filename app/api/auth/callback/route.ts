import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new NextResponse(
      `<!DOCTYPE html><html><body><p>授权失败：缺少授权码</p></body></html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  // Exchange code for token server-side
  try {
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: process.env.OAUTH_REDIRECT_URI,
        }),
      }
    );

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return new NextResponse(
        `<!DOCTYPE html><html><body><p>授权失败：${tokenData.error_description || tokenData.error}</p></body></html>`,
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    // Get user info
    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userData = await userRes.json();

    // Post the token and user back to the CMS opener
    const payload = JSON.stringify({
      token: tokenData.access_token,
      provider: "github",
      backendName: "github",
      user: {
        name: userData.name || userData.login,
        login: userData.login,
        avatar_url: userData.avatar_url,
      },
    });

    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head>
  <script>
    (function() {
      var payload = ${payload};
      var origin = window.location.origin;
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(payload, origin);
      }
      window.close();
      // Fallback: if window doesn't close, show a message
      setTimeout(function() {
        document.body.innerHTML = '<p>授权成功！窗口即将关闭，请返回编辑器。</p>';
      }, 1000);
    })();
  </script>
</head>
<body>
  <p>授权成功！正在返回编辑器...</p>
</body>
</html>`,
      {
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch (error) {
    return new NextResponse(
      `<!DOCTYPE html><html><body><p>授权失败：服务器错误</p></body></html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
