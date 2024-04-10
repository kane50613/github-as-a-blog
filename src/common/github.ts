import { env } from "@/env";
import { getUnsafeSession, type IronSessionData } from "@/session";
import { Octokit } from "@octokit/rest";
import { type IronSession } from "iron-session";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export async function getUser(session: IronSession<IronSessionData>) {
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
}

export async function getIssue(issue_number: number) {
  const fn = unstable_cache(
    async () => {
      const session = await getUnsafeSession();

      return client(session)
        .issues.get({
          owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
          repo: env.NEXT_PUBLIC_GITHUB_REPO,
          issue_number,
        })
        .then((r) => ({
          ...r.data,
          body_html: "",
          body_text: "",
        }));
    },
    ["posts", issue_number.toString()],
    {
      tags: [`posts-${issue_number}`],
      revalidate: 60,
    },
  );

  return fn();
}

export function client(session?: IronSession<IronSessionData>) {
  return new Octokit({
    auth: session?.token,
    baseUrl: process.env.CI ? "http://localhost:3001" : undefined,
  });
}

export async function listAllPosts(creator?: string) {
  const fn = unstable_cache(
    async () => {
      const data: Post[] = [];

      let page = 1;

      while (true) {
        const response = await listPosts(creator, page++, 100);

        if (response.length) data.push(...response);
        if (response.length < 100) break;
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
}

export async function listPosts(creator?: string, page = 1, per_page = 10) {
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
}

export type Post = Awaited<ReturnType<typeof listPosts>>[number];
