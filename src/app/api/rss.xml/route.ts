import { listAllPosts } from "@/common/github";
import { env } from "@/env";
import removeMarkdown from "remove-markdown";

export const runtime = "edge";

export async function GET() {
  const posts = await listAllPosts();

  const latestDate = new Date(posts[0]?.updated_at ?? Date.now());

  const postsXml = posts
    .map(
      (post) => `<item>
      <title>${post.title}</title>
      <link>${env.NEXT_PUBLIC_BASE_URL}/posts/${post.number}</link>
      <pubDate>${new Date(post.updated_at).toUTCString()}</pubDate>
      <description>${post.body ? removeMarkdown(post.body) : ""}</description>
      <author>${post.user?.login ?? "Unknown"}</author>
    </item>`,
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>GitHub as a Blog</title>
      <description>GitHub as a Blog</description>
      <link>${env.NEXT_PUBLIC_BASE_URL}</link>
      <language>en</language>
      <image>
        <url>${env.NEXT_PUBLIC_BASE_URL}/cover.jpg</url>
        <title>GitHub as a Blog</title>
        <link>${env.NEXT_PUBLIC_BASE_URL}</link>
      </image>
      <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
      <pubDate>${latestDate.toUTCString()}</pubDate>
      <ttl>60</ttl>
      ${postsXml}
    </channel>
  </rss>`;

  return new Response(feed, {
    headers: {
      "content-type": "application/rss+xml",
    },
  });
}
