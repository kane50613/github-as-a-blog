"use server";

import { client } from "@/common/github";
import { env } from "@/env";
import { getSession } from "@/session";
import { z } from "zod";
import { authAction } from "@/common/action";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  issue_number: zfd.numeric(),
  body: zfd.text(z.string().min(1)),
});

export const createComment = authAction(
  schema,
  async ({ issue_number, body }) => {
    const session = await getSession();

    return client(session).issues.createComment({
      owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
      repo: env.NEXT_PUBLIC_GITHUB_REPO,
      issue_number,
      body,
    });
  },
);
