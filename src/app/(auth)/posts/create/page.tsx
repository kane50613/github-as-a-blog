"use client";

import { Preview } from "@/app/(auth)/create/preview";
import { useCreatePostStore } from "@/app/(auth)/create/store";
import { createPost } from "@/app/(auth)/posts/create/action";
import { Submit } from "@/components/submit";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

export const runtime = "edge";

export default function Page() {
  const titleInputId = useId();
  const bodyInputId = useId();

  return (
    <div className="space-y-4 mt-4">
      <h1>Create Post</h1>
      <form action={createPost} className="space-y-4">
        <FormItem>
          <label htmlFor={titleInputId}>Title</label>
          <p className="text-xs text-primary/75">
            This field will be an H1 in the post.
          </p>
          <Input
            name="title"
            id={titleInputId}
            required
            onChange={(event) =>
              useCreatePostStore.setState({ title: event.target.value })
            }
          />
        </FormItem>
        <FormItem>
          <label htmlFor={bodyInputId}>Body</label>
          <p className="text-xs text-primary/75">
            Markdown is supported. Minimum length is 30 characters.
          </p>
          <Textarea
            name="body"
            id={bodyInputId}
            onChange={(event) =>
              useCreatePostStore.setState({ body: event.target.value })
            }
            required
            minLength={30}
          />
        </FormItem>
        <Preview />
        <Submit />
      </form>
    </div>
  );
}
