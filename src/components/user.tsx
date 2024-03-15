import { getUser } from "@/common/github";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { getUnsafeSession } from "@/session";
import Link from "next/link";

export const User = async () => {
  const session = await getUnsafeSession();
  const user = session.token ? await getUser(session) : undefined;

  if (!user)
    return (
      <Button asChild size="sm" variant="secondary">
        <a href="/api/auth">Login</a>
      </Button>
    );

  return (
    <Link href="/posts">
      <Avatar
        className="w-8 h-8"
        src={`${user.avatar_url}&s=64`}
        alt={user.name ?? "User avatar"}
      />
    </Link>
  );
};
