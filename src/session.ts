import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { env } from "./env";

export interface IronSessionData {
  state?: string;
  token?: string;
}

export const ironOptions = {
  cookieName: "github-as-a-blog-v2",
  password: env.JWT_SECRET,
  cookieOptions: {
    // webkit based browsers behave differently with secure field,
    // only set it to true in production (when protocol is https)
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
} satisfies SessionOptions;

export const getUnsafeSession = cache(() =>
  getIronSession<IronSessionData>(cookies(), ironOptions),
);

export const getSession = cache(async () => {
  const session = await getUnsafeSession();

  if (!session.token) redirect("/api/auth");

  return session;
});
