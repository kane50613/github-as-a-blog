import { type Post } from "@/common/github";
import { Avatar } from "@/components/avatar";
import { formatter } from "@/lib/utils";

export const Author = ({
  user,
  date,
}: {
  user: Pick<NonNullable<Post["user"]>, "avatar_url" | "login">;
  date?: string;
}) => (
  <a
    href={`https://github.com/${user.login}`}
    target="_blank"
    rel="nofollow"
    className="flex gap-2 items-center not-prose text-sm text-foreground/80"
  >
    <Avatar
      className="w-5 h-5"
      src={`${user.avatar_url}&s=40`}
      alt="User avatar"
      title={user.login ?? undefined}
    />
    <span>@{user.login}</span>
    {date && <span>{formatter.format(new Date(date))}</span>}
  </a>
);
