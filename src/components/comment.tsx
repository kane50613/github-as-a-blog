import { type GithubComment } from "@/common/github";
import { Author } from "@/components/author";
import { MDX } from "@/components/mdx";
import { memo } from "react";

export const Comment = memo(({ comment }: { comment: GithubComment }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      {comment.user && <Author user={comment.user} date={comment.updated_at} />}
    </div>
    <div className="prose dark:prose-invert">
      <MDX>{comment.body}</MDX>
    </div>
  </div>
));

Comment.displayName = "Comment";
