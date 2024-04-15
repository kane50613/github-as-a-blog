"use client";

import { type Post } from "@/common/github";
import { CommentForm } from "@/components/form/comment-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { MessageCircleOff } from "lucide-react";
import { useUser } from "@/hooks/use-user";

export const CommentFormLoader = ({ post }: { post: Post }) => {
  const { data: user } = useUser();

  if (!post.id) return <CommentUnavailable message="Invalid post" />;

  if (!user)
    return <CommentUnavailable message="You must be logged in to comment" />;

  if (!user)
    return (
      <CommentUnavailable message="Failed to get user, please try logging in again" />
    );

  if (user.login === post.user?.login)
    return <CommentUnavailable message="You can't comment on your own post" />;

  if (user.login !== post.user?.login)
    return <CommentUnavailable message="You can only view comments" />;

  return <CommentForm post={post} />;
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
