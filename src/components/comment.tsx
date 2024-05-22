import { Author } from "@/components/author";
import { MDX } from "@/components/mdx";
import { type ListIssueComments } from "@/actions/list-issue-comments";

export const Comment = ({
  comment,
}: {
  comment: ListIssueComments[number];
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      {comment.user && <Author user={comment.user} date={comment.updated_at} />}
    </div>
    <div className="prose dark:prose-invert">
      {comment.body && <MDX>{comment.body}</MDX>}
    </div>
  </div>
);
