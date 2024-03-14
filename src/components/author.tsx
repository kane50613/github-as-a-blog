import { type Post } from "@/common/github";
import { Avatar } from "@/components/avatar";

export const Author = ({
  user,
}: {
  user: Pick<NonNullable<Post["user"]>, "avatar_url" | "login">;
}) => (
  <a
    href={`https://github.com/${user.login}`}
    target="_blank"
    rel="nofollow"
    className="flex gap-2 items-center not-prose hover:underline focus:underline"
  >
    <Avatar
      className="w-5 h-5"
      src={`${user.avatar_url}&s=40`}
      alt="User avatar"
      title={user.login ?? undefined}
    />
    <span className="text-sm text-primary/80">@{user.login}</span>
  </a>
);
