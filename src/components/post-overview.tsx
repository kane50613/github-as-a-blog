import { type Post } from "@/common/github";
import { AuthorContent } from "@/components/author";
import { Stats } from "@/components/stats";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import removeMarkdown from "remove-markdown";

// Rendering mdx content in overview is not necessary and could break the LightHouse score, so only render plain text.
export const PostOverview = ({ post }: { post: Post }) => (
  <Link
    href={`/posts/${post.number}`}
    className="!no-underline"
    aria-label={post.title}
    // disable prefetching to avoid loading unnecessary post content
    prefetch={false}
  >
    <article className="flex items-start flex-col gap-2 max-w-2xl w-full md:rounded-md hover:bg-secondary/15 transition-colors py-4 container">
      {post.user && (
        <AuthorContent user={post.user} date={post.updated_at} compact />
      )}
      <p className="text-lg md:text-xl h-full line-clamp-2 break-normal font-semibold">
        {post.title}
      </p>
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
  </Link>
);
