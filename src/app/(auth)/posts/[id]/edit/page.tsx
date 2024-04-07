import { getIssue } from "@/common/github";
import { PostForm } from "@/components/form/post-form";
import { BackButton } from "@/components/back-button";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const issue = await getIssue(parseInt(id));

  return (
    <div className="space-y-4 py-4 container max-w-screen-md">
      <BackButton href={`/posts/${issue.number}`}>Back to Post</BackButton>
      <h1>Edit Post</h1>
      <PostForm
        id={issue.number}
        defaultState={{
          title: issue.title,
          body: issue.body ?? "",
        }}
      />
    </div>
  );
}
