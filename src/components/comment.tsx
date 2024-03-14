import { type GithubComment } from "@/app/posts/[id]/comment";
import { Author } from "@/components/author";
import { MDX } from "@/components/mdx";
import { memo } from "react";

export const Comment = memo(({ comment }: { comment: GithubComment }) => (
  <li className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      {comment.user && <Author user={comment.user} date={comment.updated_at} />}
    </div>
    <div className="prose dark:prose-invert">
      <MDX>{comment.body}</MDX>
    </div>
  </li>
));

Comment.displayName = "Comment";
