"use server";

import { client } from "@/common/github";
import { getSession } from "@/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  body: z.string().min(30),
});

type Schema = z.infer<typeof schema>;

export async function upsertPost(
  owner: string,
  repo: string,
  id: number | undefined,
  form: FormData,
) {
  const data = schema.parse(Object.fromEntries(form.entries()));

  if (id) return updatePost(owner, repo, id, data);

  return createPost(owner, repo, data);
}

export async function updatePost(
  owner: string,
  repo: string,
  id: number,
  data: Schema,
) {
  const session = await getSession();

  const issue = await client(session).issues.update({
    ...data,
    issue_number: id,
    owner,
    repo,
  });

  redirect(`/${owner}/${repo}/${issue.data.number}`);
}

export async function createPost(owner: string, repo: string, payload: Schema) {
  const session = await getSession();

  const issue = await client(session).issues.create({
    ...payload,
    owner,
    repo,
  });

  redirect(`/${owner}/${repo}/${issue.data.number}`);
}
