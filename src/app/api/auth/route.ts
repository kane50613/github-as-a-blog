import { redirectFromCookie } from "@/app/api/auth/redirect";
import { env } from "@/env";
import { getSession } from "@/session";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code");

  if (code) return grabToken(req, code);

  return redirectToGithub(req);
}

async function grabToken(req: Request, code: string) {
  const session = await getSession();

  const params = new URL(req.url).searchParams;

  if (params.get("state") !== session.state) return redirectToGithub(req);

  const { protocol, host } = new URL(req.url);

  // form.set("client_id", env.GITHUB_CLIENT_ID);
  // form.set("client_secret", env.GITHUB_CLIENT_SECRET);
  // form.set("redirect_uri", `${protocol}//${host}/api/auth`);
  // form.set("code", code);
  // form.set("repository_id", "770713436");

  const tokenRequest = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${protocol}//${host}/api/auth`,
      }),
    },
  );

  const token = (await tokenRequest.json()) as {
    access_token: string;
    scope: string;
  };

  if (token.scope !== scopes) return redirectToGithub(req);

  session.token = token.access_token;

  await session.save();
  console.log(session.token);

  if (!session.token) return redirectToGithub(req);

  redirectFromCookie();
}

const loginUrl = new URL("https://github.com/login/oauth/authorize");
const scopes = ["read:user", "repo"].join(" ");

loginUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
loginUrl.searchParams.set("response_type", "code");
loginUrl.searchParams.set("scope", scopes);

async function redirectToGithub(req: Request) {
  const state = Math.random().toString(36).slice(2);

  const referer = req.headers.get("referer");

  if (referer) cookies().set("rd", new URL(referer).pathname);

  const session = await getSession();

  session.state = state;

  await session.save();

  const url = new URL(loginUrl);

  const { protocol, host } = new URL(req.url);

  url.searchParams.set("redirect_uri", `${protocol}//${host}/api/auth`);
  url.searchParams.set("state", state);

  return Response.redirect(url, 302);
}
