import { getIssue } from "@/common/github";
import { Author } from "@/components/author";
import { CommentFormLoader } from "@/components/form/comment-form-loader";
import { MDX } from "@/components/mdx";
import { PostHelper } from "@/components/post-helper";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import removeMarkdown from "remove-markdown";
import { HeaderTitle } from "@/components/header/header-title";
import { CommentsLoader } from "@/app/posts/[id]/comments-loader";

export const revalidate = 60;
export const dynamic = "force-static";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!Number(id)) notFound();

  const post = await getIssue(parseInt(id)).catch(notFound);

  if (post.closed_at) notFound();

  const description = post.body ? removeMarkdown(post.body) : undefined;

  return {
    title: post.title,
    description,
    date: new Date(post.created_at).toISOString(),
    authors: {
      name: post.user?.login,
      url: `https://github.com/${post.user?.login}`,
    },
    openGraph: {
      siteName: "GitHub as a Blog",
      type: "article",
      title: post.title,
      publishedTime: new Date(post.created_at).toISOString(),
      modifiedTime: new Date(post.updated_at).toISOString(),
      authors: post.user?.login,
      description,
      images: {
        width: 1200,
        height: 630,
        url: "/cover.jpg",
      },
    },
    creator: post.user?.login,
    publisher: post.user?.login,
  } as Metadata;
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!Number(id)) notFound();

  const post = await getIssue(parseInt(id)).catch(notFound);

  if (post.closed_at) notFound();

  const issueUrl = `https://github.com/${env.NEXT_PUBLIC_GITHUB_REPO_OWNER}/${env.NEXT_PUBLIC_GITHUB_REPO}/issues/${post.number}`;

  return (
    <main className="mx-auto py-4 space-y-4 prose dark:prose-invert lg:prose-lg container">
      <article className="break-words">
        <HeaderTitle label={post.title}>
          <h1>{post.title}</h1>
        </HeaderTitle>
        <div className="flex justify-between flex-wrap gap-4 items-end">
          {post.user ? (
            <Author user={post.user} date={post.updated_at} />
          ) : (
            <div>Unknown Author</div>
          )}
          <PostHelper post={post} />
        </div>
        <Separator className="my-4" />
        {post.body && <MDX>{post.body}</MDX>}
        <p className="text-sm">
          View source on GitHub issue:{" "}
          <a href={issueUrl} target="_blank" rel="nofollow">
            {post.title} (#{post.number})
          </a>
        </p>
      </article>
      <Separator />
      <section className="not-prose space-y-4">
        <p className="text-foreground text-2xl font-medium">
          Comments ({post.comments})
        </p>
        <CommentFormLoader post={post} />
        <CommentsLoader id={post.number} />
      </section>
    </main>
  );
}
