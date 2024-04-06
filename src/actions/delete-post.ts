"use server";

import { client, getIssue } from "@/common/github";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { authAction } from "@/common/action";
import { z } from "zod";

export const deletePost = authAction(z.number(), async (id, { session }) => {
  const issue = await getIssue(id).catch(notFound);

  const result = await client(session).issues.update({
    issue_number: id,
    owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
    repo: env.NEXT_PUBLIC_GITHUB_REPO,
    state: "closed",
  });

  if (result.data.state !== "closed") throw new Error("Failed to delete post");

  revalidateTag(`posts-${issue.user?.login}`);
  revalidateTag(`posts-${issue.number}`);
  revalidateTag("posts");

  redirect("/posts");
});
