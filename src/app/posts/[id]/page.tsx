import { CommentsLoader } from "@/app/posts/[id]/comments-loader";
import { getIssue } from "@/common/github";
import { Author } from "@/components/author";
import { MDX } from "@/components/mdx";
import { PostHelper } from "@/components/post-helper";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import removeMarkdown from "remove-markdown";

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
    <main className="mx-auto py-4 space-y-4 prose dark:prose-invert lg:prose-xl">
      <article>
        <div className="flex justify-between">
          <a
            href={issueUrl}
            target="_blank"
            rel="nofollow"
            className="text-foreground/80 not-prose"
          >
            #{post.number}
          </a>
          <Suspense>
            <PostHelper post={post} />
          </Suspense>
        </div>
        <h1>{post.title}</h1>
        {post.user && <Author user={post.user} date={post.updated_at} />}
        <Separator className="my-4" />
        <MDX>{post.body}</MDX>
      </article>
      <Separator />
      <section className="not-prose space-y-4">
        <p className="text-foreground text-2xl font-medium">
          Comments ({post.comments})
        </p>
        <CommentsLoader id={post.number} />
      </section>
    </main>
  );
}
