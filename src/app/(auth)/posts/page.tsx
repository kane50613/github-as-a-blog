"use client";

import { listPosts } from "@/app/(auth)/posts/action";
import { type Post } from "@/common/github";
import { PostOverview } from "@/components/post-overview";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { useInfiniteData } from "@/hooks/use-infinite-data";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";

export default function Page() {
  const { ref, components, isLoading, hasMore } = useInfiniteData<Post>({
    loader: (index) => listPosts(index),
    render: (post) => <PostOverview key={post.number} post={post} />,
  });

  return (
    <main className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h1>My Posts</h1>
        <Button asChild>
          <Link href="/posts/create">
            <Plus className="w-4 mr-2" />
            Create
          </Link>
        </Button>
      </div>
      <p className="text-foreground/80">
        This page shows the posts you have created in{" "}
        <a
          target="_blank"
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO_OWNER}/${env.NEXT_PUBLIC_GITHUB_REPO}/issues`}
          className="underline text-foreground"
        >
          {env.NEXT_PUBLIC_GITHUB_REPO_OWNER}/{env.NEXT_PUBLIC_GITHUB_REPO}
        </a>
        .
      </p>
      <Separator />
      <div className="mx-auto space-y-4 w-fit">{components}</div>
      <div ref={ref} />
      {isLoading && (
        <div className="flex h-16 justify-center items-center">
          <Loader2 className="animate-spin mr-2" /> Loading posts...
        </div>
      )}
      {!hasMore && !isLoading && <p className="text-center">No more posts</p>}
    </main>
  );
}
