"use client";

import { createComment } from "@/actions/create-comment";
import { type Post } from "@/common/github";
import { Submit } from "@/components/submit";
import { useActionWithHandler } from "@/lib/action-hook";
import { Editor } from "@/components/ui/editor/editor";
import { useRef } from "react";

export const CommentForm = ({ post }: { post: Post }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { execute } = useActionWithHandler(createComment);

  return (
    <form action={execute} className="space-y-4">
      <input type="hidden" name="issue_number" value={post.number} />
      <Editor
        initialContent=""
        onValueChange={(body) =>
          textareaRef.current && (textareaRef.current.value = body)
        }
      />
      <textarea name="body" hidden className="hidden" ref={textareaRef} />
      <Submit>Comment</Submit>
    </form>
  );
};
