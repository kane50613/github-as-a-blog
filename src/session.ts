import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { env } from "./env";

export interface IronSessionData {
  state?: string;
  token?: string;
}

export const ironOptions = {
  cookieName: "github-as-a-blog",
  password: env.JWT_SECRET,
  cookieOptions: {
    secure: true,
    httpOnly: true,
  },
};

export const getUnsafeSession = cache(() =>
  getIronSession<IronSessionData>(cookies(), ironOptions),
);

export const getSession = cache(async () => {
  const session = await getUnsafeSession();

  if (!session.token) redirect("/api/auth");

  return session;
});
