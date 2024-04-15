"use client";

import { type Post } from "@/common/github";
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export const PostHelper = ({ post }: { post: Post }) => {
  const { data: user } = useUser();

  if (user?.id !== post.user?.id) return null;

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
