import { env } from "@/env";
import { type IronSessionData } from "@/session";
import { Octokit } from "@octokit/rest";
import { type IronSession } from "iron-session";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export function getUser(session: IronSession<IronSessionData>) {
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
      revalidate: 60,
    },
  );

  return fn();
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
      revalidate: 60,
      tags,
    },
  );

  return fn();
}

export type Post = Awaited<ReturnType<typeof listPosts>>[number];
