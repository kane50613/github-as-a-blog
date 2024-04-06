import { type Post } from "@/common/github";
import { Avatar } from "@/components/avatar";
import { cn, formatter } from "@/lib/utils";

export const Author = ({
  user,
  date,
  compact,
}: {
  user: Pick<NonNullable<Post["user"]>, "avatar_url" | "login">;
  date?: string;
  compact?: boolean;
}) => (
  <a
    href={
      user.login === "github-actions[bot]"
        ? "https://docs.github.com/en/actions"
        : `https://github.com/${user.login}`
    }
    target="_blank"
    rel="nofollow"
    className="not-prose"
  >
    <AuthorContent user={user} date={date} compact={compact} />
  </a>
);

export const AuthorContent = ({
  user,
  date,
  compact,
}: {
  user: Pick<NonNullable<Post["user"]>, "avatar_url" | "login">;
  date?: string;
  compact?: boolean;
}) => (
  <div className="flex gap-2 items-center not-prose text-sm text-foreground/80">
    <Avatar
      src={`${user.avatar_url}&s=40`}
      alt="User avatar"
      className={cn("w-8 h-8", compact && "w-6 h-6")}
      title={user.login ?? undefined}
    />
    <div
      className={cn("flex flex-col", compact && "flex-row gap-2 items-center")}
    >
      <span className="text-foreground">{user.login}</span>
      {date && (
        <span className="text-xs">{formatter.format(new Date(date))}</span>
      )}
    </div>
  </div>
);
