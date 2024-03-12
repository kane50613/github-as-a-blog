"use client";

import { listPosts, type Post } from "@/app/(auth)/posts/action";
import { PostOverview } from "@/components/post-overview";
import { useCallback, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(0);

  const { ref } = useInView({
    onChange(value) {
      if (value && hasMore) nextPage();
    },
  });

  const nextPage = useCallback(() => {
    listPosts(page.current++)
      .then((newPosts) => {
        if (!newPosts.length) return setHasMore(false);

        setPosts((posts) => [...posts, ...newPosts]);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <main className="space-y-4">
      <h1 className="text-4xl font-semibold">My Posts</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {posts.map((post) => (
          <PostOverview key={post.id} post={post} />
        ))}
        <div ref={ref} />
        {!hasMore && <p>No more posts</p>}
      </div>
    </main>
  );
}
