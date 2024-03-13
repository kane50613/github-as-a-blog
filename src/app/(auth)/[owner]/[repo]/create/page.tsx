"use client";

import { createPost } from "@/app/(auth)/[owner]/[repo]/create/action";
import { Preview } from "@/app/(auth)/[owner]/[repo]/create/preview";
import { useCreatePostStore } from "@/app/(auth)/[owner]/[repo]/create/store";
import { Submit } from "@/components/submit";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useId, useMemo } from "react";

export default function Page({
  params: { owner, repo },
}: {
  params: { owner: string; repo: string };
}) {
  const titleInputId = useId();
  const bodyInputId = useId();

  // if user went back from other page, we need to restore the state from the store
  const initialState = useMemo(() => useCreatePostStore.getState(), []);

  return (
    <div className="space-y-4 mt-4">
      <h1>Create Post</h1>
      <form action={createPost.bind(null, owner, repo)} className="space-y-4">
        <FormItem>
          <label htmlFor={titleInputId}>Title</label>
          <p className="text-xs text-primary/75">
            This field will be an H1 in the post.
          </p>
          <Input
            name="title"
            id={titleInputId}
            defaultValue={initialState.title}
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
            defaultValue={initialState.body}
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
