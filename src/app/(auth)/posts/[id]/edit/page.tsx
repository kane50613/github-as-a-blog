import { useCreatePostStore } from "@/app/(auth)/posts/create/store";
import { getIssue } from "@/common/github";
import { PostForm } from "@/components/form/post-form";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const issue = await getIssue(parseInt(id));

  return (
    <div className="space-y-4 py-4 container">
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
