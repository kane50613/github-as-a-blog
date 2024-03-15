import { type Post } from "@/common/github";
import { Author } from "@/components/author";
import { Stats } from "@/components/stats";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import removeMarkdown from "remove-markdown";

// Rendering mdx content in overview is not necessary and could break the LightHouse score, so we remove it.
export const PostOverview = memo(({ post }: { post: Post }) => (
  <article className="flex items-start flex-col gap-2 max-w-xl w-full">
    {post.user && <Author user={post.user} date={post.updated_at} />}
    <Link href={`/posts/${post.number}`} className="h-full w-full">
      <p className="text-lg md:text-xl h-full line-clamp-2 break-normal font-semibold">
        {post.title}
      </p>
    </Link>
    <div className="line-clamp-3 text-sm break-all prose dark:prose-invert text-foreground/75">
      {post.body && removeMarkdown(post.body)}
    </div>
    <div className="flex text-sm items-center text-foreground/80 gap-4">
      <Stats
        icon={<Heart className="w-4" />}
        count={post.reactions?.total_count ?? 0}
      />
      <Stats icon={<MessageCircle className="w-4" />} count={post.comments} />
    </div>
  </article>
));

PostOverview.displayName = "PostOverview";
