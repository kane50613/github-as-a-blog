import { env } from "@/env";
import { Octokit } from "@octokit/rest";

export type GithubComment = Awaited<
  ReturnType<typeof getIssueComments>
>[number];

export async function getIssueComments(issue_number: number, page = 1) {
  const client = new Octokit();

  return client.issues
    .listComments({
      owner: env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
      repo: env.NEXT_PUBLIC_GITHUB_REPO,
      issue_number,
      per_page: 10,
      page,
    })
    .then((r) => r.data);
}
