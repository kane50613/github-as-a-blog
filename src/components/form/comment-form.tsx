import { createComment } from "@/app/posts/[id]/action";
import { type Post } from "@/common/github";
import { Submit } from "@/components/submit";
import { Textarea } from "@/components/ui/textarea";

export const CommentForm = ({ post }: { post: Post }) => {
  return (
    <form action={createComment.bind(null, post.number)}>
      <Textarea name="body" placeholder={`Comment on ${post.title}`} />
      <Submit>Comment</Submit>
    </form>
  );
};
