import { createComment } from "@/actions/create-comment";
import { type Post } from "@/common/github";
import { Submit } from "@/components/submit";
import { Textarea } from "@/components/ui/textarea";

export const CommentForm = ({ post }: { post: Post }) => {
  return (
    <form action={createComment.bind(null, post.number)} className="space-y-4">
      <Textarea name="body" placeholder={`Comment on ${post.title}`} />
      <Submit>Comment</Submit>
    </form>
  );
};
