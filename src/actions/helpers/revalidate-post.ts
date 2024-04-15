import { revalidatePath, revalidateTag } from "next/cache";
import { type Issue } from "@/common/github";

export function revalidatePost(issue: Pick<Issue, "user" | "number">) {
  revalidateTag(`posts-${issue.user?.login}`);
  revalidateTag(`posts-${issue.number}`);
  revalidateTag("posts");

  revalidatePath(`/posts/${issue.number}`);
}
