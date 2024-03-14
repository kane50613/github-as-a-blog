import { env } from "@/env";
import { type IronSessionData } from "@/session";
import { Octokit } from "@octokit/rest";
import { type IronSession } from "iron-session";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getUser = cache(async (session: IronSession<IronSessionData>) =>
  client(session)
    .users.getAuthenticated()
    .then((r) => r.data),
);

export async function getIssue(issue_number: number) {
  const fn = unstable_cache(
    async () =>
      client()
        .issues.get({
          owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
          repo: env.NEXT_PUBLIC_GITHUB_REPO,
          issue_number,
        })
        .then((r) => ({
          ...r.data,
          body_html: "",
          body_text: "",
        })),
    ["posts", issue_number.toString()],
    {
      tags: [`posts-${issue_number}`],
    },
  );

  return await fn();
}

export function client(session?: IronSession<IronSessionData>) {
  return new Octokit({
    auth: session?.token,
  });
}

export async function listPosts(creator?: string, page = 1, per_page = 10) {
  const tags = creator ? [`posts-${creator}`] : ["posts"];

  const fn = unstable_cache(
    async () => {
      const response = await client().issues.listForRepo({
        owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
        repo: env.NEXT_PUBLIC_GITHUB_REPO,
        page,
        per_page,
        creator,
        state: "open",
      });

      return response.data.map((post) => ({
        ...post,
        body_html: "",
        body_text: "",
      }));
    },
    ["posts", creator ?? "all", page.toString()],
    {
      tags,
    },
  );

  return await fn();
}

export type Post = Awaited<ReturnType<typeof listPosts>>[number];
