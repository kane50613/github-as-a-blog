"use server";

import { client, getUser } from "@/common/github";
import { getSession } from "@/session";
import { marked } from "marked";
import xss from "xss";

export type Post = Awaited<ReturnType<typeof listPosts>>[number];

export async function listPosts(page = 0) {
  const user = await getUser();

  if (!user) return [];

  const session = await getSession();

  const response = await client(session).issues.listForRepo({
    owner: "kane50613",
    repo: "github-as-a-blog",
    page,
    per_page: 10,
    labels: "article",
    creator: user.login,
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
