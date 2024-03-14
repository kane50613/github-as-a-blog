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
      src={`${user.avatar_url}&s=40`}
      alt="User avatar"
      className="w-8 h-8"
      title={user.login ?? undefined}
    />
    <div className="flex flex-col">
      <span className="text-white">{user.login}</span>
      {date && (
        <span className="text-xs">{formatter.format(new Date(date))}</span>
      )}
    </div>
  </a>
);
