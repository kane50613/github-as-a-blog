import { listAllPosts } from "@/common/github";
import { env } from "@/env";
import { Feed } from "feed";
import removeMarkdown from "remove-markdown";

export const runtime = "edge";

export async function GET() {
  const posts = await listAllPosts();

  const latestDate = new Date(posts[0]?.updated_at ?? Date.now());

  const feed = new Feed({
    title: "GitHub as a Blog",
    description: "GitHub as a Blog",
    id: env.NEXT_PUBLIC_BASE_URL,
    link: env.NEXT_PUBLIC_BASE_URL,
    language: "en",
    image: `${env.NEXT_PUBLIC_BASE_URL}/cover.jpg`,
    updated: latestDate,
    copyright: "unknown",
  });

  for (const post of posts) {
    feed.addItem({
      date: new Date(post.updated_at),
      title: post.title,
      id: `${env.NEXT_PUBLIC_BASE_URL}/posts/${post.number}`,
      link: `${env.NEXT_PUBLIC_BASE_URL}/posts/${post.number}`,
      content: post.body ? removeMarkdown(post.body) : "",
      author: [
        {
          name: post.user?.login ?? "Unknown",
          link: post.user
            ? `https://github.com/${post.user.login}`
            : "https://github.com/",
        },
      ],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "content-type": "application/rss+xml",
    },
  });
}
