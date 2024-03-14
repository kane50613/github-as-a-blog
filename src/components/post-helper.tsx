import { getUser, type Post } from "@/common/github";
import { getUnsafeSession } from "@/session";
import { Pen, Trash } from "lucide-react";
import Link from "next/link";

export const PostHelper = async ({ post }: { post: Post }) => {
  const session = await getUnsafeSession();

  if (!session) return null;

  const user = await getUser(session);

  if (user.id !== post.user?.id) return null;

  return (
    <div className="text-base not-prose flex gap-4">
      <Link href={`/posts/${post.number}/edit`} className="flex">
        <Pen className="mr-2 w-4" />
        Edit
      </Link>
      <Link
        href={`/posts/${post.number}/delete`}
        className="flex text-destructive"
      >
        <Trash className="mr-2 w-4" />
        Delete
      </Link>
    </div>
  );
};
