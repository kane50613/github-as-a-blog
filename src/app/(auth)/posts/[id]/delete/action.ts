"use server";

import { client, getIssue, getUser } from "@/common/github";
import { whitelistCheck } from "@/common/whitelist";
import { env } from "@/env";
import { getSession } from "@/session";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function deletePost(id: number) {
  const session = await getSession();

  const user = await getUser(session);

  whitelistCheck(user.login);

  const issue = await getIssue(id).catch(notFound);

  await client(session).issues.update({
    issue_number: id,
    owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
    repo: env.NEXT_PUBLIC_GITHUB_REPO,
    state: "closed",
  });

  revalidateTag(`posts-${issue.user?.login}`);
  revalidateTag(`posts-${issue.number}`);
  revalidateTag("posts");

  redirect("/posts");
}
