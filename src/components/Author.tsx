import { type Post } from "@/app/(auth)/[owner]/[repo]/action";
import { Avatar } from "@/components/avatar";

export const Author = ({
  user,
}: {
  user: Pick<NonNullable<Post["user"]>, "avatar_url" | "login">;
}) => (
  <div className="flex gap-2 items-center">
    <Avatar
      className="w-5 h-5"
      src={`${user.avatar_url}&s=40`}
      alt="User avatar"
      title={user.login ?? undefined}
    />
    <span className="text-primary/75 text-sm">@{user.login}</span>
  </div>
);
