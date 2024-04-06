"use client";

import type { Post } from "@/common/github";
import { PostOverview } from "@/components/post-overview";
import { PostsContainer } from "@/components/posts-container";
import { useInfiniteData } from "@/hooks/use-infinite-data";
import { Loader2 } from "lucide-react";
import { listMyPosts } from "@/actions/list-my-posts";
import { listAllPosts } from "@/actions/list-all-posts";
import { wrapInfiniteSafeAction } from "@/lib/action-hook";

export const PostsLoader = ({ type }: { type: "all" | "mine" }) => {
  const loader = wrapInfiniteSafeAction(
    type === "all" ? listAllPosts : listMyPosts,
  );

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
      {!hasMore && !isLoading && (
        <div className="text-center h-16 flex justify-center items-center text-muted-foreground">
          <p>No more posts</p>
        </div>
      )}
    </>
  );
};
