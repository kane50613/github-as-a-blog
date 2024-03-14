export interface GithubComment {
  id: number;
  user: {
    login: string;
    avatar_url: string;
  };
  body: string;
}

export async function getIssueComments(
  owner: string,
  repo: string,
  issue_number: number,
  page = 1,
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}/comments?page=${page}&per_page=10`,
  );

  const json = (await response.json()) as GithubComment[];

  console.log(json);

  return json;
}
