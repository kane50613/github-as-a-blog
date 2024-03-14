import { type Post } from "@/app/(auth)/[owner]/[repo]/action";
import { Avatar } from "@/components/avatar";

export const Author = ({ user }: { user: NonNullable<Post["user"]> }) => (
  <div className="flex gap-2 items-center">
    <Avatar
      className="w-5 h-5"
      src={`${user.avatar_url}&s=40`}
      alt="User avatar"
      title={user.name ?? undefined}
    />
    <span className="text-primary/75 text-sm">@{user.login}</span>
  </div>
);
