"use client";

import { upsertPost } from "@/actions/upsert-post";
import { Submit } from "@/components/submit";
import { FormItem } from "@/components/ui/form";
import { useEffect, useId, useRef } from "react";
import { useActionWithHandler } from "@/lib/action-hook";
import { Editor } from "@/components/ui/editor/editor";
import { Input } from "@/components/ui/input";

export const PostForm = ({
  defaultState: { title, body } = {
    title: "",
    body: "",
  },
  id,
}: {
  defaultState?: {
    title: string;
    body: string;
  };
  id?: number;
}) => {
  const titleInputId = useId();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Set the initial value of the textarea
    if (textareaRef.current) textareaRef.current.value = body;
  }, [body]);

  const { execute } = useActionWithHandler(upsertPost);

  return (
    <form action={execute} className="space-y-4">
      <input type="hidden" name="id" value={id} />
      <FormItem>
        <label htmlFor={titleInputId}>Title</label>
        <p className="text-xs text-foreground/80">
          This field will be an H1 in the post.
        </p>
        <Input
          name="title"
          placeholder="Make a title for your interesting post!"
          className="text-xl font-semibold bg-transparent h-12"
          id={titleInputId}
          defaultValue={title}
          required
        />
      </FormItem>
      <FormItem>
        <label>Body</label>
        <p className="text-xs text-foreground/80">
          Markdown is supported. Minimum length is 30 characters.
        </p>
        <Editor
          initialContent={body}
          onValueChange={(body) =>
            textareaRef.current && (textareaRef.current.value = body)
          }
        />
        <textarea
          name="body"
          ref={textareaRef}
          hidden
          className="hidden pointer-events-none"
        />
      </FormItem>
      <Submit />
    </form>
  );
};
