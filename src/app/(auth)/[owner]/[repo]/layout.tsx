import { listRepos } from "@/common/github";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function Layout({
  params: { owner, repo },
  children,
}: {
  params: { owner: string; repo: string };
  children: ReactNode;
}) {
  const repos = await listRepos();

  if (!repos.find((r) => r.owner.login === owner && r.name === repo))
    redirect("/pick");

  return <>{children}</>;
}
