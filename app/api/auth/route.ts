import { NextRequest, NextResponse } from "next/server";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI || "";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = searchParams.get("provider");

  if (provider === "github") {
    const authUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${GITHUB_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=repo,user`;

    return NextResponse.redirect(authUrl);
  }

  return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.provider === "github") {
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
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: body.code,
            redirect_uri: REDIRECT_URI,
          }),
        }
      );

      const tokenData = await tokenRes.json();

      if (tokenData.error) {
        return NextResponse.json({ error: tokenData.error }, { status: 400 });
      }

      // Get user info
      const userRes = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });
      const userData = await userRes.json();

      return NextResponse.json({
        token: tokenData.access_token,
        user: {
          name: userData.name || userData.login,
          login: userData.login,
          avatar_url: userData.avatar_url,
        },
      });
    } catch (error) {
      return NextResponse.json({ error: "Auth failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
}
