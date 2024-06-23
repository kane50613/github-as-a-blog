"use server";

import { client, getIssue } from "@/common/github";
import { env } from "@/env";
import { notFound, redirect } from "next/navigation";
import { authAction } from "@/common/action";
import { z } from "zod";
import { revalidatePost } from "@/actions/helpers/revalidate-post";

export const deletePost = authAction
  .schema(z.number())
  .action(async ({ parsedInput, ctx: { session } }) => {
    const issue = await getIssue(parsedInput).catch(notFound);

    const result = await client(session).issues.update({
      issue_number: parsedInput,
      owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
      repo: env.NEXT_PUBLIC_GITHUB_REPO,
      state: "closed",
    });

    if (result.data.state !== "closed")
      throw new Error("Failed to delete post");

    revalidatePost(issue);

    redirect("/posts");
  });
