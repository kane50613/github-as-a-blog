import { deletePost } from "@/app/(auth)/posts/[id]/delete/action";
import { getIssue } from "@/common/github";
import { Submit } from "@/components/submit";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const issue = await getIssue(parseInt(id));

  return (
    <form
      action={deletePost.bind(null, issue.id)}
      className="flex flex-col items-center gap-4 h-[calc(100dvh-4.5rem)] justify-center"
    >
      <h1 className="text-3xl">Are you sure you want to delete this post?</h1>
      <p>{issue.title}</p>
      <div className="flex gap-2">
        <Button variant="secondary" asChild>
          <Link href={`/posts/${issue.number}`}>Cancel</Link>
        </Button>
        <Submit variant="destructive">
          <Trash className="mr-2 w-4" />
          Yes
        </Submit>
      </div>
    </form>
  );
}
