import { PostForm } from "@/components/form/post-form";
import { BackButton } from "@/components/back-button";

export default async function Page() {
  return (
    <div className="space-y-4 py-4 container max-w-screen-md">
      <BackButton href="/posts">Back to My Posts</BackButton>
      <h1>Create Post</h1>
      <PostForm />
    </div>
  );
}
