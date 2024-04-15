import { env } from "@/env";
import { getUnsafeSession } from "@/session";
import { scope, scopes } from "@/app/api/auth/config";
import { redirectFromCookie, redirectToGithub } from "@/app/api/auth/redirect";

export const runtime = "edge";

export async function GET(req: Request) {
  // Simulate real user interaction signing in with GitHub
  if (process.env.CI) {
    const session = await getUnsafeSession();

    session.state = "TEST";

    await session.save();

    const url = new URL(req.url);

    url.pathname = "/api/auth";
    url.searchParams.set("code", "TEST");
    url.searchParams.set("scope", scope);
    url.searchParams.set("state", "TEST");

    const request = new Request(url);

    return grabToken(request, "TEST");
  }

  const code = new URL(req.url).searchParams.get("code");

  if (code) return grabToken(req, code);

  return redirectToGithub(req);
}

async function grabToken(req: Request, code: string) {
  const session = await getUnsafeSession();

  const params = new URL(req.url).searchParams;

  if (params.get("state") !== session.state) return redirectToGithub(req);

  const token = await exchangeToken(req, code);

  const givenScopes = token.scope.match(/[a-z:_]+/g) ?? [];

  if (
    givenScopes.length !== scopes.length ||
    !givenScopes.every((scope) => scopes.includes(scope))
  )
    return redirectToGithub(req);

  session.token = token.access_token;

  await session.save();

  if (!session.token) return redirectToGithub(req);

  return redirectFromCookie(req);
}

async function exchangeToken(req: Request, code: string) {
  if (process.env.CI) {
    if (!env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not set in CI");

    if (code !== "TEST") throw new Error("Code is not set to TEST in CI");

    return {
      access_token: env.GITHUB_TOKEN,
      scope,
    };
  }

  const { protocol, host } = new URL(req.url);

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

  return (await tokenRequest.json()) as {
    access_token: string;
    scope: string;
  };
}
