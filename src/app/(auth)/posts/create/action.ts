"use server";

import { client, getUser } from "@/common/github";
import { whitelistCheck } from "@/common/whitelist";
import { env } from "@/env";
import { getSession } from "@/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  body: z.string().min(30),
});

type Schema = z.infer<typeof schema>;

export async function upsertPost(id: number | undefined, form: FormData) {
  const session = await getSession();

  const user = await getUser(session);

  whitelistCheck(user.login);

  const data = schema.parse(Object.fromEntries(form.entries()));

  const issue = id ? await updatePost(id, data) : await createPost(data);

  revalidateTag(`posts-${issue.user?.login}`);
  revalidateTag(`posts-${issue.number}`);
  revalidateTag("posts");

  redirect(`/posts/${issue.number}`);
}

export async function updatePost(id: number, data: Schema) {
  const session = await getSession();

  return client(session)
    .issues.update({
      ...data,
      issue_number: id,
      owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
      repo: env.NEXT_PUBLIC_GITHUB_REPO,
    })
    .then((r) => r.data);
}

export async function createPost(payload: Schema) {
  const session = await getSession();

  return client(session)
    .issues.create({
      ...payload,
      owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
      repo: env.NEXT_PUBLIC_GITHUB_REPO,
    })
    .then((r) => r.data);
}
