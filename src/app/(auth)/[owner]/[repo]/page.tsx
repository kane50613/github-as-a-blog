"use client";

import { listPosts } from "@/app/(auth)/[owner]/[repo]/action";
import { PostOverview } from "@/components/post-overview";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

export const runtime = "edge";

export default function Page({
  params: { owner, repo },
}: {
  params: { owner: string; repo: string };
}) {
  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
  } = useSWRInfinite(
    (index) => [index + 1] as const,
    ([index]) => listPosts(owner, repo, index),
  );

  const hasMore = useMemo(
    () => data.length > 0 && data?.at(-1)?.length === 10,
    [data],
  );

  const { ref } = useInView({
    async onChange(value) {
      if (value && hasMore) await setSize((s) => s + 1);
    },
  });

  const posts = useMemo(
    () =>
      data.flat().map((post) => <PostOverview key={post.number} post={post} />),
    [data],
  );

  return (
    <main className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h1>My Posts</h1>
        <Button asChild>
          <Link href={`/${owner}/${repo}/create`}>
            <Plus className="w-4 mr-2" />
            Create
          </Link>
        </Button>
      </div>
      <p className="text-primary/80">
        This page shows the posts you have created in{" "}
        <a
          target="_blank"
          href={`https://github.com/${owner}/${repo}/issues`}
          className="underline text-primary"
        >
          {owner}/{repo}
        </a>
        .
      </p>
      <div className="grid gap-3 md:grid-cols-3 grid-cols-1">
        {posts}
        <div ref={ref} />
      </div>
      {(isLoading || isValidating) && (
        <div className="flex h-16 justify-center items-center">
          <Loader2 className="animate-spin mr-2" /> Loading posts...
        </div>
      )}
      {!hasMore && !isLoading && !isValidating && <p>No more posts</p>}
    </main>
  );
}
