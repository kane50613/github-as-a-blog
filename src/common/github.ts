import { env } from "@/env";
import { type IronSessionData } from "@/session";
import { Octokit } from "@octokit/rest";
import { type IronSession } from "iron-session";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUser = cache(async (session: IronSession<IronSessionData>) => {
  if (!session.token) return redirect("/");

  const fn = unstable_cache(
    async () =>
      client(session)
        .users.getAuthenticated()
        .then((r) => r.data),
    ["users", session.token],
    {
      tags: ["users", `users-${session.token}`],
      revalidate: 60,
    },
  );

  return fn();
});

export const getIssue = cache(async (issue_number: number) => {
  const fn = unstable_cache(
    async () =>
      client(env.GITHUB_TOKEN)
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
      revalidate: 60,
    },
  );

  return fn();
});

export type Issue = Awaited<ReturnType<typeof getIssue>>;

export function client(session?: IronSession<IronSessionData> | string) {
  return new Octokit({
    auth: typeof session === "string" ? session : session?.token,
    baseUrl: process.env.CI ? "http://localhost:3001" : undefined,
  });
}

export const listPosts = cache(
  async (creator?: string, page = 1, per_page = 10) => {
    const fn = unstable_cache(
      async () => {
        const response = await client(env.GITHUB_TOKEN).issues.listForRepo({
          owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
          repo: env.NEXT_PUBLIC_GITHUB_REPO,
          page,
          per_page,
          creator,
          state: "open",
        });

        // filter out pull requests
        return response.data
          .filter((post) => !post.pull_request)
          .map((post) => ({
            ...post,
            body_html: "",
            body_text: "",
          }));
      },
      ["posts", creator ?? "all", page.toString()],
      {
        revalidate: 60,
        tags: [creator ? `posts-${creator}` : "posts"],
      },
    );

    return fn();
  },
);

export const listAllPosts = cache(async (creator?: string) => {
  const fn = unstable_cache(
    async () => {
      const data: Post[] = [];

      let page = 1,
        hasMore = true;

      while (hasMore) {
        const response = await listPosts(creator, page++, 100);

        if (response.length) data.push(...response);
        // If we get less than 100 posts, we've reached the end
        if (response.length < 100) hasMore = false;
      }

      return data;
    },
    ["posts", "list-all", creator ?? "all"],
    {
      revalidate: 60,
      tags: [creator ? `posts-${creator}` : "posts"],
    },
  );

  return fn();
});

export type Post = Awaited<ReturnType<typeof listPosts>>[number];
