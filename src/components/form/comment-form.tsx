"use client";

import { createComment } from "@/actions/create-comment";
import { type Post } from "@/common/github";
import { Submit } from "@/components/submit";
import { Textarea } from "@/components/ui/textarea";
import { useActionWithHandler } from "@/lib/action-hook";

export const CommentForm = ({ post }: { post: Post }) => {
  const { execute } = useActionWithHandler(createComment);

  return (
    <form action={execute} className="space-y-4">
      <input type="hidden" name="issue_number" value={post.number} />
      <Textarea name="body" placeholder={`Comment on ${post.title}`} />
      <Submit>Comment</Submit>
    </form>
  );
};
