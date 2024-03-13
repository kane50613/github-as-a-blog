import { getSession, type IronSessionData } from "@/session";
import { Octokit } from "@octokit/rest";
import { type IronSession } from "iron-session";
import { cache } from "react";

export const owner = "kane50613";
export const repo = "github-as-a-blog";

export const getUser = cache(async () => {
  const session = await getSession();

  if (!session.token) return;

  return client(session)
    .users.getAuthenticated()
    .then((r) => r.data);
});

export function client(session: IronSession<IronSessionData>) {
  return new Octokit({
    auth: session.token,
  });
}
