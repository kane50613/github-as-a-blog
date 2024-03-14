import { type Post } from "@/app/(auth)/[owner]/[repo]/action";
import { Author } from "@/components/Author";
import { MDX } from "@/components/mdx";
import { getPostIds } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const PostOverview = memo(({ post }: { post: Post }) => {
  const { owner, repo, number } = getPostIds(post);

  return (
    <Link href={`/${owner}/${repo}/${number}`} className="h-full">
      <Card className="flex flex-col h-full hover:bg-secondary/50 transition-colors">
        <CardHeader className="flex-grow">
          {post.user && <Author user={post.user} />}
          <CardTitle className="text-lg md:text-lg h-full line-clamp-2 break-normal">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-primary/80">
          <div className="line-clamp-3 text-sm break-all">
            <MDX>{post.body}</MDX>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

PostOverview.displayName = "PostOverview";
