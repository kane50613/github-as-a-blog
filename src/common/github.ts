import { getSession, type IronSessionData } from "@/session";
import { Octokit } from "@octokit/rest";
import { type IronSession } from "iron-session";
import { cache } from "react";

export const getUser = cache(async () => {
  const session = await getSession();

  return client(session)
    .users.getAuthenticated()
    .then((r) => r.data);
});

export type Repo = Awaited<ReturnType<typeof listRepos>>[number];

export const listRepos = cache(async () => {
  const session = await getSession();

  return client(session)
    .repos.listForAuthenticatedUser({
      per_page: 100,
      type: "public",
    })
    .then((r) => r.data);
});

export const getIssue = cache(
  async (owner: string, repo: string, issue_number: number) =>
    client()
      .issues.get({
        owner,
        repo,
        issue_number,
      })
      .then((r) => r.data),
);

export const getIssueComments = cache(
  async (owner: string, repo: string, issue_number: number) =>
    client()
      .issues.listComments({
        owner,
        repo,
        issue_number,
      })
      .then((r) => r.data),
);

export function client(session?: IronSession<IronSessionData>) {
  return new Octokit({
    auth: session?.token,
  });
}
