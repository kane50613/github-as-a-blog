import { getIssue, getIssueComments } from "@/common/github";
import { Avatar } from "@/components/avatar";
import { Separator } from "@/components/ui/separator";
import { marked } from "marked";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import removeMarkdown from "remove-markdown";
import xss from "xss";

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

  const post = await getIssue(owner, repo, parseInt(id));

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
      type: "article",
      title: post.title,
      description,
    },
    creator: post.user?.login,
  } as Metadata;
}

export default async function Page({
  params: { owner, repo, id },
}: {
  params: { owner: string; repo: string; id: string };
}) {
  if (!Number(id)) notFound();

  const post = await getIssue(owner, repo, parseInt(id));

  if (post.closed_at) notFound();

  const comments = await getIssueComments(owner, repo, post.number);

  const html = xss(await marked(post.body ?? "", { async: true }));

  const issueUrl = `https://github.com/${owner}/${repo}/issues/${post.number}`;

  return (
    <main className="mx-auto py-4 space-y-4 prose dark:prose-invert lg:prose-xl">
      <article>
        <a href={issueUrl} target="_blank" rel="nofollow">
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
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <Separator />
      <section className="not-prose space-y-4">
        <h3 className="text-white text-2xl font-medium">
          Comments ({comments.length})
        </h3>
        <ul>
          {await Promise.all(
            comments.map(async (comment) => (
              <li key={comment.id} className="flex flex-col gap-2">
                <a
                  className="flex gap-2 items-center w-fit"
                  href={`${issueUrl}#issuecomment-${comment.id}`}
                  target="_blank"
                  rel="nofollow"
                >
                  <Avatar
                    className="w-5 h-5"
                    src={comment.user?.avatar_url}
                    alt={comment.user?.login ?? "User avatar"}
                  />
                  <span className="text-sm">{comment.user?.login}</span>
                </a>
                <span
                  className="prose dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html: xss(
                      await marked(comment.body ?? "", { async: true }),
                    ),
                  }}
                />
              </li>
            )),
          )}
        </ul>
      </section>
    </main>
  );
}
