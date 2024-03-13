import { listRepos } from "@/common/github";

export default async function Page() {
  const repos = await listRepos();

  return (
    <div>
      <h1>My Repos</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={`/${repo.full_name}`}>{repo.full_name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
