"use server";

import { client } from "@/common/github";
import { getSession } from "@/session";

export type Post = Awaited<ReturnType<typeof listPosts>>[number];

export async function listPosts(page = 0) {
  const session = await getSession();

  return client(session)
    .issues.listForRepo({
      owner: "vercel",
      repo: "next.js",
      page,
      per_page: 10,
    })
    .then((r) => r.data);
}
