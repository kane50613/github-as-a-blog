"use client";

import {
  getIssueComments,
  type GithubComment,
} from "@/app/[owner]/[repo]/[id]/comment";
import { Comment } from "@/components/comment";
import { useInfiniteData } from "@/hooks/use-infinite-data";

export const CommentsLoader = ({
  owner,
  repo,
  id,
}: {
  owner: string;
  repo: string;
  id: number;
}) => {
  const baseUrl = `https://github.com/${owner}/${repo}/issues/${id}`;

  const { ref, components } = useInfiniteData<GithubComment>({
    render: (comment) => (
      <Comment key={comment.id} comment={comment} baseUrl={baseUrl} />
    ),
    loader: (index) => getIssueComments(owner, repo, id, index),
  });

  return (
    <ul className="space-y-4">
      {components}
      <div ref={ref} />
    </ul>
  );
};
