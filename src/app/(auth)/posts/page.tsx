"use client";

import { PostsLoader } from "@/app/(auth)/posts/posts-loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { Plus } from "lucide-react";
import Link from "next/link";
import { HeaderTitle } from "@/components/header-title";

export default function Page() {
  return (
    <main className="space-y-4">
      <div className="container flex flex-col gap-4">
        <HeaderTitle label="My Posts" />
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
            className="text-foreground font-medium"
          >
            {env.NEXT_PUBLIC_GITHUB_REPO_OWNER}/{env.NEXT_PUBLIC_GITHUB_REPO}
          </a>
          .
        </p>
      </div>
      <Separator />
      <PostsLoader type="mine" />
    </main>
  );
}
