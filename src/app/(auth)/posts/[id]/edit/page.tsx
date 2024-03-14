import { useCreatePostStore } from "@/app/(auth)/posts/create/store";
import { getIssue } from "@/common/github";
import { PostForm } from "@/components/form/post-form";
import { notFound } from "next/navigation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!Number(id)) notFound();

  const issue = await getIssue(parseInt(id)).catch(notFound);

  return (
    <div className="space-y-4 mt-4">
      <h1>Edit Post</h1>
      <PostForm
        id={issue.number}
        defaultState={{
          ...useCreatePostStore.getInitialState(),
          title: issue.title,
          body: issue.body ?? "",
        }}
      />
    </div>
  );
}
