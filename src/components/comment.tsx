import { type GithubComment } from "@/app/[owner]/[repo]/[id]/comment";
import { Author } from "@/components/Author";
import { MDX } from "@/components/mdx";
import { memo } from "react";

export const Comment = memo(
  ({ baseUrl, comment }: { baseUrl: string; comment: GithubComment }) => (
    <li key={comment.id} className="flex flex-col gap-2">
      <a
        className="flex gap-2 items-center w-fit"
        href={`${baseUrl}#issuecomment-${comment.id}`}
        target="_blank"
        rel="nofollow"
      >
        {comment.user && <Author user={comment.user} />}
      </a>
      <div className="prose dark:prose-invert">
        <MDX>{comment.body}</MDX>
      </div>
    </li>
  ),
);

Comment.displayName = "Comment";
