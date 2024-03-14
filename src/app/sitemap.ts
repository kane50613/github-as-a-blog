import { listPosts } from "@/common/github";
import { type MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts(undefined, 1, 100);

  return posts.map((product) => ({
    url: `https://github-as-a-blog.vercel.app/posts/${product.number}`,
    lastModified: product.updated_at,
  }));
}
