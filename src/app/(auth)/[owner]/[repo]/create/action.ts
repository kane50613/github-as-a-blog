"use server";

import { client } from "@/common/github";
import { getSession } from "@/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  body: z.string().min(30),
});

export async function createPost(owner: string, repo: string, form: FormData) {
  const data = schema.parse(Object.fromEntries(form.entries()));

  const session = await getSession();

  const issue = await client(session).issues.create({
    ...data,
    owner,
    repo,
  });

  redirect(`/${owner}/${repo}/${issue.data.number}`);
}
