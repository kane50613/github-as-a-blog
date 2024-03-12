import { redirectFromCookie } from "@/app/api/auth/redirect";
import { env } from "@/env";
import { getSession } from "@/session";

export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code");

  if (code) return grabToken(req, code);

  return redirectToGithub(req);
}

async function grabToken(req: Request, code: string) {
  const session = await getSession();

  const params = new URL(req.url).searchParams;

  if (params.get("state") !== session.state) return redirectToGithub(req);

  const form = new URLSearchParams();

  const { protocol, host } = new URL(req.url);

  form.set("client_id", env.GITHUB_CLIENT_ID);
  form.set("client_secret", env.GITHUB_CLIENT_SECRET);
  form.set("redirect_uri", `${protocol}//${host}/api/auth`);
  form.set("code", code);
  form.set("repository_id", "770713436");

  const tokenRequest = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    },
  );

  if (!tokenRequest.ok) {
    console.log(tokenRequest.status);
    console.log(await tokenRequest.text());

    return redirectToGithub(req);
  }

  const token = (await tokenRequest.json()) as {
    access_token: string;
  };

  session.token = token.access_token;

  console.log(session.token);

  if (!session.token) throw new Error("Failed to get token");

  await session.save();

  redirectFromCookie();
}

const loginUrl = new URL("https://github.com/login/oauth/authorize");
const scopes = ["read:user", "repo"].join(" ");

loginUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
loginUrl.searchParams.set("response_type", "code");
loginUrl.searchParams.set("scope", scopes);

async function redirectToGithub(req: Request) {
  const state = Math.random().toString(36).slice(2);

  const session = await getSession();

  session.state = state;

  await session.save();

  const url = new URL(loginUrl);

  const { protocol, host } = new URL(req.url);

  url.searchParams.set("redirect_uri", `${protocol}//${host}/api/auth`);
  url.searchParams.set("state", state);

  return Response.redirect(loginUrl, 302);
}
