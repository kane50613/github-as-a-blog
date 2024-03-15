import { listPosts } from "@/app/(auth)/posts/action";
import type { Post } from "@/common/github";
import { PostOverview } from "@/components/post-overview";
import { PostsContainer } from "@/components/posts-container";
import { useInfiniteData } from "@/hooks/use-infinite-data";
import { Loader2 } from "lucide-react";

export const PostsLoader = () => {
  const { ref, components, isLoading, hasMore } = useInfiniteData<Post>({
    loader: (index) => listPosts(index),
    render: (post) => <PostOverview key={post.number} post={post} />,
    key: "my-posts",
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
