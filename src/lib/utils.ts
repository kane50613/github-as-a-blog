import { type Post } from "@/app/(auth)/[owner]/[repo]/action";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPostIds(post: Post) {
  const [owner, repo] = post.url.split("/").slice(4);

  if (!owner || !repo) throw new Error(`Invalid post URL: ${post.url}`);

  return {
    owner,
    repo,
    number: post.number,
  };
}
