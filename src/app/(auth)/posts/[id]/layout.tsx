import { getIssue, getUser } from "@/common/github";
import { getSession } from "@/session";
import { notFound, redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function Layout({
  children,
  params: { id },
}: {
  children: ReactNode;
  params: { id: string };
}) {
  if (!Number(id)) notFound();

  const session = await getSession();

  const user = await getUser(session);

  const issue = await getIssue(parseInt(id)).catch(notFound);

  if (issue.closed_at ?? issue.user?.login !== user.login)
    redirect(`/posts/${id}`);

  return <>{children}</>;
}
