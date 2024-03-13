"use server";

import { client, owner, repo } from "@/common/github";
import { getSession } from "@/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  body: z.string().min(30),
});

export async function createPost(form: FormData) {
  const data = schema.parse(Object.fromEntries(form.entries()));

  const issue = await createIssue(data.title, data.body);

  redirect(`/posts/${issue.number}`);
}

async function createIssue(title: string, body: string) {
  const session = await getSession();

  const response = await client(session).issues.create({
    owner,
    repo,
    title,
    body,
    labels: ["article"],
  });

  return response.data;
}
