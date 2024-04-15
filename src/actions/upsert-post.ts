"use server";

import { client } from "@/common/github";
import { env } from "@/env";
import { getSession } from "@/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { authAction } from "@/common/action";
import { revalidatePost } from "@/actions/helpers/revalidate-post";

const schema = zfd.formData({
  id: zfd.numeric(z.number().optional()),
  title: zfd.text(z.string().min(1)),
  body: zfd.text(z.string().min(30)),
});

type Schema = z.infer<typeof schema>;

export const upsertPost = authAction(schema, async ({ id, ...data }) => {
  const issue = id ? await updatePost(id, data) : await createPost(data);

  revalidatePost(issue);

  redirect(`/posts/${issue.number}`);
});

async function updatePost(id: number, data: Schema) {
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

async function createPost(payload: Schema) {
  const session = await getSession();

  return client(session)
    .issues.create({
      ...payload,
      owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
      repo: env.NEXT_PUBLIC_GITHUB_REPO,
    })
    .then((r) => r.data);
}
