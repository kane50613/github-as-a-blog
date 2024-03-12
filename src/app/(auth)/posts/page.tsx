"use client";

import { listPosts } from "@/app/(auth)/posts/action";
import { PostOverview } from "@/components/post-overview";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

export default function Page() {
  const [hasMore, setHasMore] = useState(true);

  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
  } = useSWRInfinite(
    (index) => {
      if (!hasMore) return null;

      console.log(index);

      return [index];
    },
    async ([index]) => {
      const posts = await listPosts(index);

      if (!posts.length) setHasMore(false);

      return posts;
    },
  );

  const { ref } = useInView({
    async onChange(value) {
      if (value && hasMore) await setSize((s) => s + 1);
    },
  });

  return (
    <main className="space-y-4">
      <h1 className="text-4xl font-semibold">My Posts</h1>
      <div className="grid gap-3 md:grid-cols-3 grid-cols-1">
        {data.flat().map((post) => (
          <PostOverview key={post.number} post={post} />
        ))}
      </div>
      <div ref={ref} />
      {(isLoading || isValidating) && (
        <div className="flex h-16 justify-center items-center">
          <Loader2 className="animate-spin mr-2" /> Loading posts...
        </div>
      )}
      {!hasMore && <p>No more posts</p>}
    </main>
  );
}
