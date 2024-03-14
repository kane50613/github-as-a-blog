"use client";

import { listPosts, type Post } from "@/app/(auth)/[owner]/[repo]/action";
import { PostOverview } from "@/components/post-overview";
import { Button } from "@/components/ui/button";
import { useInfiniteData } from "@/hooks/use-infinite-data";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";

export default function Page({
  params: { owner, repo },
}: {
  params: { owner: string; repo: string };
}) {
  const { ref, components, isLoading, hasMore } = useInfiniteData<Post>({
    loader: (index) => listPosts(owner, repo, index),
    render: (post) => <PostOverview key={post.number} post={post} />,
  });

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
        {components}
        <div ref={ref} />
      </div>
      {isLoading && (
        <div className="flex h-16 justify-center items-center">
          <Loader2 className="animate-spin mr-2" /> Loading posts...
        </div>
      )}
      {!hasMore && !isLoading && <p>No more posts</p>}
    </main>
  );
}
