import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // Return a self-posting HTML page that sends the code back to the CMS
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head>
  <script>
    window.opener.postMessage(
      { code: "${code}" },
      window.location.origin
    );
    window.close();
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
}
