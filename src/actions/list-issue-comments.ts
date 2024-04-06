"use server";

import { client } from "@/common/github";
import { action } from "@/common/action";
import { z } from "zod";
import { env } from "@/env";
import { getUnsafeSession } from "@/session";

const schema = z.object({
  issue_number: z.number(),
  page: z.number(),
});

export const listIssueComments = action(
  schema,
  async ({ issue_number, page }) => {
    const session = await getUnsafeSession();

    return client(session)
      .issues.listComments({
        owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
        repo: env.NEXT_PUBLIC_GITHUB_REPO,
        issue_number,
        per_page: 10,
        page,
      })
      .then((r) => r.data);
  },
);

export type ListIssueComments = NonNullable<
  Awaited<ReturnType<typeof listIssueComments>>["data"]
>;
