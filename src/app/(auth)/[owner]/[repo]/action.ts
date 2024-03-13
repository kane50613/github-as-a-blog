"use server";

import { client, getUser } from "@/common/github";
import { getSession } from "@/session";
import { marked } from "marked";
import xss from "xss";

export type Post = Awaited<ReturnType<typeof listPosts>>[number];

export async function listPosts(owner: string, repo: string, page = 0) {
  const session = await getSession();

  const user = await getUser();

  if (!user) return [];

  const response = await client(session).issues.listForRepo({
    owner,
    repo,
    page,
    per_page: 10,
    creator: user.login,
    state: "open",
  });

  return Promise.all(
    response.data.map(async (post) => ({
      ...post,
      body: post.body ? xss(await marked(post.body)) : null,
      body_html: null,
      body_text: null,
    })),
  );
}
