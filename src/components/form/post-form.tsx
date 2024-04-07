"use client";

import { upsertPost } from "@/actions/upsert-post";
import { Submit } from "@/components/submit";
import { FormItem } from "@/components/ui/form";
import { useId } from "react";
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
  const bodyInputId = useId();

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
        <label htmlFor={bodyInputId}>Body</label>
        <p className="text-xs text-foreground/80">
          Markdown is supported. Minimum length is 30 characters.
        </p>
        <Editor initialContent={body} />
      </FormItem>
      <Submit />
    </form>
  );
};
