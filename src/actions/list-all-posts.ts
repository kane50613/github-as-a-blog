"use server";

import { listPosts as listPostsInternal } from "@/common/github";

export async function listAllPosts(page: number) {
  return listPostsInternal(undefined, page);
}
