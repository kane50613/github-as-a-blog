"use client";

import type { Post } from "@/common/github";
import { PostOverview } from "@/components/post-overview";
import { PostsContainer } from "@/components/posts-container";
import {
  type InfiniteDataProps,
  useInfiniteData,
} from "@/hooks/use-infinite-data";
import { Loader2 } from "lucide-react";

export const PostsLoader = ({
  loader,
  key,
}: {
  loader: InfiniteDataProps<Post>["loader"];
  key: string;
}) => {
  const { ref, components, isLoading, hasMore } = useInfiniteData<Post>({
    loader,
    render: (post) => <PostOverview key={post.number} post={post} />,
    key,
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
