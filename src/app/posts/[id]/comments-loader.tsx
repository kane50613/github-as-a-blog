"use client";

import { getIssueComments, GithubComment } from "@/common/github";
import { Comment } from "@/components/comment";
import { useInfiniteData } from "@/hooks/use-infinite-data";

export const CommentsLoader = ({ id }: { id: number }) => {
  const { ref, components } = useInfiniteData<GithubComment>({
    render: (comment) => <Comment key={comment.id} comment={comment} />,
    loader: (index) => getIssueComments(id, index),
    key: `comments-${id}`,
  });

  return (
    <div className="space-y-6">
      {components}
      <div ref={ref} />
    </div>
  );
};
