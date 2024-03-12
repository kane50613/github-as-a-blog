import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { env } from "./env";

export interface IronSessionData {
  state?: string;
  token?: string;
}

export const ironOptions = {
  cookieName: "gaas",
  password: env.JWT_SECRET,
  cookieOptions: {
    secure: true,
    httpOnly: true,
  },
};

export function getSession() {
  return getIronSession<IronSessionData>(cookies(), ironOptions);
}
