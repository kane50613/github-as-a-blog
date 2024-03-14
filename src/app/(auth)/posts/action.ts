"use server";

import { getUser, listPosts as listPostsInternal } from "@/common/github";
import { getSession } from "@/session";

// needs the re-export here with the "use server" directive, otherwise it will not be available in the client
export async function listPosts(page: number) {
  const session = await getSession();

  const user = await getUser(session);

  return listPostsInternal(user.login, page);
}
