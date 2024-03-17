"use server";

import { client } from "@/common/github";
import { env } from "@/env";
import { getSession } from "@/session";
import { z } from "zod";

const schema = z.object({
  body: z.string(),
});

export async function createComment(issue_number: number, form: FormData) {
  const data = schema.parse(Object.fromEntries(form.entries()));

  const session = await getSession();

  return client(session).issues.createComment({
    owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
    repo: env.NEXT_PUBLIC_GITHUB_REPO,
    issue_number,
    body: data.body,
  });
}
