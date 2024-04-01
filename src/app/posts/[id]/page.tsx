import { getIssue } from "@/common/github";
import { Author } from "@/components/author";
import { CommentFormLoader } from "@/components/form/comment-form-loader";
import { MDX } from "@/components/mdx";
import { PostHelper } from "@/components/post-helper";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { type Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import removeMarkdown from "remove-markdown";
import { HeaderTitle } from "@/components/header-title";

// this component is lazy loaded because it uses the octokit client, it adds a lot of weight to the initial bundle.
const CommentsLoader = dynamic(
  import("./comments-loader").then((mod) => mod.CommentsLoader),
  {
    ssr: false,
  },
);

export const runtime = "edge";

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
        url: `${env.NEXT_PUBLIC_BASE_URL}/cover.jpg`,
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
    <main className="mx-auto py-4 space-y-4 prose dark:prose-invert lg:prose-lg">
      <article>
        <HeaderTitle label={post.title}>
          <h1 className="!mb-4">{post.title}</h1>
        </HeaderTitle>
        <div className="flex justify-between flex-wrap gap-4 items-end">
          {post.user ? (
            <Author user={post.user} date={post.updated_at} />
          ) : (
            <div>Unknown Author</div>
          )}
          <Suspense>
            <PostHelper post={post} />
          </Suspense>
        </div>
        <Separator className="my-4" />
        <MDX>{post.body}</MDX>
        <span className="text-sm">
          View source on GitHub issue:{" "}
          <a href={issueUrl} target="_blank" rel="nofollow">
            {post.title} (#{post.number})
          </a>
        </span>
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
