import { listAllPosts } from "@/common/github";
import { env } from "@/env";
import { type MetadataRoute } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listAllPosts();

  return posts.map((product) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}/posts/${product.number}`,
    lastModified: product.updated_at,
  }));
}
