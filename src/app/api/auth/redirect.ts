import { cookies } from "next/headers";
import { getUnsafeSession } from "@/session";
import { buildFullUrl } from "@/app/api/auth/url";
import { loginUrl } from "@/app/api/auth/config";

export async function redirectToGithub(req: Request) {
  const state = Math.random().toString(36).slice(2);

  const referer = req.headers.get("referer");

  if (referer) cookies().set("rd", new URL(referer).pathname);

  const session = await getUnsafeSession();

  session.state = state;

  await session.save();

  const url = new URL(loginUrl);

  url.searchParams.set("redirect_uri", buildFullUrl(req, "/api/auth"));
  url.searchParams.set("state", state);

  return Response.redirect(url, 302);
}

export function redirectFromCookie(req: Request) {
  const store = cookies();

  const redirectCookie = store.get("rd")?.value;

  try {
    store.delete("rd");
  } catch (e) {}

  if (
    redirectCookie &&
    /^\/([^?\/]+)/gm.test(redirectCookie) &&
    !redirectCookie.includes("/api/auth")
  )
    return Response.redirect(buildFullUrl(req, redirectCookie), 302);

  return Response.redirect(buildFullUrl(req, "/posts"), 302);
}
