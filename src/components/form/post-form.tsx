"use client";

import { upsertPost } from "@/actions/upsert-post";
import { Preview } from "@/app/(auth)/posts/create/preview";
import {
  useCreatePostStore,
  type CreatePostStore,
} from "@/app/(auth)/posts/create/store";
import { Submit } from "@/components/submit";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useId, useMemo } from "react";
import { useActionWithHandler } from "@/lib/action-hook";

export const PostForm = ({
  defaultState,
  id,
}: {
  defaultState?: CreatePostStore;
  id?: number;
}) => {
  const titleInputId = useId();
  const bodyInputId = useId();

  const initialState = useMemo(
    () => defaultState ?? useCreatePostStore.getState(),
    [defaultState],
  );

  useEffect(
    () => defaultState && useCreatePostStore.setState(defaultState),
    [defaultState],
  );

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
        <p className="text-xs text-foreground/80">
          Markdown is supported. Minimum length is 30 characters.
        </p>
        <Textarea
          rows={20}
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
  );
};
