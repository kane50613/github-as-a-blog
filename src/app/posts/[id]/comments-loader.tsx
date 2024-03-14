"use client";

import { getIssueComments, type GithubComment } from "@/app/posts/[id]/comment";
import { Comment } from "@/components/comment";
import { useInfiniteData } from "@/hooks/use-infinite-data";

export const CommentsLoader = ({ id }: { id: number }) => {
  const { ref, components } = useInfiniteData<GithubComment>({
    render: (comment) => <Comment key={comment.id} comment={comment} />,
    loader: (index) => getIssueComments(id, index),
  });

  return (
    <div className="space-y-6">
      {components}
      <div ref={ref} />
    </div>
  );
};
