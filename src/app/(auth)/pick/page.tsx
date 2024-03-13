import { RepoPicker } from "@/app/(auth)/pick/repo-picker";
import { listRepos } from "@/common/github";

export default async function Page() {
  const repos = await listRepos();

  return (
    <main className="flex flex-col gap-4 items-center h-[calc(100dvh-4.5rem)] justify-center text-center">
      <h1>Pick repo to continue</h1>
      <p className="text-primary/75">
        The repo you pick will be used to store your posts.
      </p>
      <RepoPicker repos={repos} />
    </main>
  );
}
