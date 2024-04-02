"use server";

import { getUser, listPosts as listPostsInternal } from "@/common/github";
import { whitelistCheck } from "@/common/whitelist";
import { getSession } from "@/session";

// needs the re-export here with the "use server" directive, otherwise it will not be available in the client
export async function listMyPosts(page: number) {
  const session = await getSession();

  const user = await getUser(session);

  whitelistCheck(user.login);

  return listPostsInternal(user.login, page);
}
