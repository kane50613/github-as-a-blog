import { PostForm } from "@/components/form/post-form";

export default function Page({
  params: { owner, repo },
}: {
  params: { owner: string; repo: string };
}) {
  return (
    <div className="space-y-4 mt-4">
      <h1>Create Post</h1>
      <PostForm owner={owner} repo={repo} />
    </div>
  );
}
