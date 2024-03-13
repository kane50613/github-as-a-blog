import { type Post } from "@/app/(auth)/posts/action";
import { Avatar } from "@/components/avatar";
import Link from "next/link";
import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const PostOverview = memo(({ post }: { post: Post }) => (
  <Link href={`/posts/${post.number}`} className="h-full">
    <Card className="flex flex-col h-full hover:bg-secondary/50 transition-colors">
      <CardHeader className="flex-grow">
        <div className="flex gap-2 items-center">
          <Avatar
            className="w-4 h-4"
            src={post.user?.avatar_url}
            alt={post.user?.login ?? "User avatar"}
          />
          <span className="text-secondary-foreground/75 text-sm">
            #{post.number} • @{post.user?.login}
          </span>
        </div>
        <CardTitle className="text-lg md:text-lg h-full line-clamp-2 break-normal">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-secondary-foreground/80">
        <div
          className="line-clamp-3 text-sm break-all"
          dangerouslySetInnerHTML={{
            __html: post.body ?? "",
          }}
        />
      </CardContent>
    </Card>
  </Link>
));

PostOverview.displayName = "PostOverview";
