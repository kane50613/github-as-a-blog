import { createComment } from "@/app/posts/[id]/action";
import { getUser, type Post } from "@/common/github";
import { Submit } from "@/components/submit";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { getUnsafeSession } from "@/session";
import { MessageCircleOff } from "lucide-react";

export const CommentForm = async ({ post }: { post: Post }) => {
  const session = await getUnsafeSession();

  if (!post.id) return <CommentUnavailable message="Invalid post" />;

  if (!session.token)
    return <CommentUnavailable message="You must be logged in to comment" />;

  const user = await getUser(session).catch(() => null);

  if (!user)
    return (
      <CommentUnavailable message="Failed to get user, please try logging in again" />
    );

  if (user.login === post.user?.login)
    return <CommentUnavailable message="You can't comment on your own post" />;

  return (
    <form action={createComment.bind(null, post.number)}>
      <Textarea placeholder="Write a comment" />
      <Submit>Comment</Submit>
    </form>
  );
};

export const CommentUnavailable = ({
  message = "You don't have permission to comment",
}: {
  message?: string;
}) => (
  <Alert>
    <MessageCircleOff className="w-4 h-4" />
    <AlertTitle>{message}</AlertTitle>
  </Alert>
);
