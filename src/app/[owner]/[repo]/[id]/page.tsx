import { CommentsLoader } from "@/app/[owner]/[repo]/[id]/comments-loader";
import { getIssue } from "@/common/github";
import { MDX } from "@/components/mdx";
import { Separator } from "@/components/ui/separator";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import removeMarkdown from "remove-markdown";

export const runtime = "edge";

const formatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export async function generateMetadata({
  params: { owner, repo, id },
}: {
  params: { owner: string; repo: string; id: string };
}) {
  if (!Number(id)) notFound();

  const post = await getIssue(owner, repo, parseInt(id)).catch(notFound);

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
  params: { owner, repo, id },
}: {
  params: { owner: string; repo: string; id: string };
}) {
  if (!Number(id)) notFound();

  const post = await getIssue(owner, repo, parseInt(id)).catch(notFound);

  if (post.closed_at) notFound();

  const issueUrl = `https://github.com/${owner}/${repo}/issues/${post.number}`;

  return (
    <main className="mx-auto py-4 space-y-4 prose dark:prose-invert lg:prose-xl">
      <article>
        <a
          href={issueUrl}
          target="_blank"
          rel="nofollow"
          className="text-primary/80"
        >
          #{post.number}
        </a>
        <h1>{post.title}</h1>
        <p className="text-base mb-4">
          <a
            href={`https://github.com/${post.user?.login}`}
            target="_blank"
            rel="nofollow"
          >
            @{post.user?.login}
          </a>{" "}
          • {formatter.format(new Date(post.created_at))}
        </p>
        <Separator />
        <MDX>{post.body}</MDX>
      </article>
      <Separator />
      <section className="not-prose space-y-4">
        <p className="text-primary text-2xl font-medium">
          Comments ({post.comments})
        </p>
        <CommentsLoader owner={owner} repo={repo} id={post.number} />
      </section>
    </main>
  );
}
