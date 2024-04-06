"use client";

import { Comment } from "@/components/comment";
import { useInfiniteData } from "@/hooks/use-infinite-data";
import {
  type ListIssueComments,
  listIssueComments,
} from "@/actions/list-issue-comments";
import { wrapInfiniteSafeAction } from "@/lib/action-hook";

export const CommentsLoader = ({ id }: { id: number }) => {
  const { ref, components, isLoading } = useInfiniteData<
    ListIssueComments[number]
  >({
    render: (comment) => <Comment key={comment.id} comment={comment} />,
    loader: wrapInfiniteSafeAction((index) =>
      listIssueComments({
        issue_number: id,
        page: index,
      }),
    ),
    key: `comments-${id}`,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {components}
        <div ref={ref} />
      </div>
      {isLoading && (
        <p className="text-muted-foreground text-sm">Loading comments...</p>
      )}
    </div>
  );
};
