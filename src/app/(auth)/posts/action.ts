"use server";

import { client } from "@/common/github";
import { getSession } from "@/session";
import { marked } from "marked";
import xss from "xss";

export type Post = Awaited<ReturnType<typeof listPosts>>[number];

export async function listPosts(page = 0) {
  const session = await getSession();

  const response = await client(session).issues.listForRepo({
    owner: "vercel",
    repo: "next.js",
    page,
    per_page: 10,
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
