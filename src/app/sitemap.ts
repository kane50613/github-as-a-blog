import { listPosts } from "@/common/github";
import { env } from "@/env";
import { type MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts(undefined, 1, 100);

  return posts.map((product) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}/posts/${product.number}`,
    lastModified: product.updated_at,
  }));
}
