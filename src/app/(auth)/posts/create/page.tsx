import { PostForm } from "@/components/form/post-form";

export default async function Page() {
  return (
    <div className="space-y-4 py-4 container max-w-screen-md">
      <h1>Create Post</h1>
      <PostForm />
    </div>
  );
}
