"use client";

import type { Post } from "@/common/github";
import { PostOverview } from "@/components/post-overview";
import { PostsContainer } from "@/components/posts-container";
import { useInfiniteData } from "@/hooks/use-infinite-data";
import { Loader2 } from "lucide-react";
import { listMyPosts } from "@/actions/list-my-posts";
import { listAllPosts } from "@/actions/list-all-posts";

export const PostsLoader = ({ type }: { type: "all" | "mine" }) => {
  const loader = type === "all" ? listAllPosts : listMyPosts;

  const { ref, components, isLoading, hasMore } = useInfiniteData<Post>({
    loader,
    render: (post) => <PostOverview key={post.number} post={post} />,
    key: type,
  });

  return (
    <>
      <PostsContainer>{components}</PostsContainer>
      <div ref={ref} />
      {isLoading && (
        <div className="flex h-16 justify-center items-center">
          <Loader2 className="animate-spin mr-2" /> Loading posts...
        </div>
      )}
      {!hasMore && !isLoading && <p className="text-center">No more posts</p>}
    </>
  );
};
