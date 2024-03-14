import { Octokit } from "@octokit/rest";

export type GithubComment = Awaited<
  ReturnType<typeof getIssueComments>
>[number];

export async function getIssueComments(
  owner: string,
  repo: string,
  issue_number: number,
  page = 1,
) {
  const client = new Octokit();

  return client.issues
    .listComments({
      owner,
      repo,
      issue_number,
      per_page: 10,
      page,
    })
    .then((r) => r.data);
}
