import { type Post } from "@/common/github";
import { Author } from "@/components/author";
import { MDX } from "@/components/mdx";
import Link from "next/link";
import { memo } from "react";

export const PostOverview = memo(({ post }: { post: Post }) => (
  <article className="flex items-start flex-col gap-4 max-w-xl w-full">
    {post.user && <Author user={post.user} date={post.updated_at} />}
    <Link href={`/posts/${post.number}`} className="h-full">
      <p className="text-xl md:text-2xl h-full line-clamp-2 break-normal font-semibold text-start">
        {post.title}
      </p>
    </Link>
    <div className="line-clamp-3 text-sm break-all prose dark:prose-invert">
      <MDX>{post.body}</MDX>
    </div>
    <Link
      href={`/posts/${post.number}`}
      className="not-prose text-sm text-foreground/75 underline"
    >
      Read more
    </Link>
  </article>
));

PostOverview.displayName = "PostOverview";
