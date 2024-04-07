import { getIssue } from "@/common/github";
import { PostForm } from "@/components/form/post-form";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const issue = await getIssue(parseInt(id));

  return (
    <div className="space-y-4 py-4 container max-w-screen-md">
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
