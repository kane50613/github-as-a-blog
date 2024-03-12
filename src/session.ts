import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { cache } from "react";
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

export const getSession = cache(() =>
  getIronSession<IronSessionData>(cookies(), ironOptions),
);
