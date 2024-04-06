"use client";

import { Comment } from "@/components/comment";
import { useInfiniteData } from "@/hooks/use-infinite-data";
import {
  type ListIssueComments,
  listIssueComments,
} from "@/actions/list-issue-comments";
import { wrapInfiniteSafeAction } from "@/lib/action-hook";

export const CommentsLoader = ({ id }: { id: number }) => {
  const { ref, components } = useInfiniteData<ListIssueComments[number]>({
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
    <div className="space-y-6">
      {components}
      <div ref={ref} />
    </div>
  );
};
