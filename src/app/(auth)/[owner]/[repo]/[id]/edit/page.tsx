import { useCreatePostStore } from "@/app/(auth)/[owner]/[repo]/create/store";
import { getIssue } from "@/common/github";
import { PostForm } from "@/components/form/post-form";
import { notFound } from "next/navigation";

export default async function Page({
  params: { owner, repo, id },
}: {
  params: { owner: string; repo: string; id: string };
}) {
  if (!Number(id)) notFound();

  const issue = await getIssue(owner, repo, parseInt(id)).catch(notFound);

  return (
    <div className="space-y-4 mt-4">
      <h1>Edit Post</h1>
      <PostForm
        owner={owner}
        repo={repo}
        id={parseInt(id)}
        defaultState={{
          ...useCreatePostStore.getInitialState(),
          title: issue.title,
          body: issue.body ?? "",
        }}
      />
    </div>
  );
}
