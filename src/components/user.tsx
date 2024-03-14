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
        <Link href="/api/auth">Login</Link>
      </Button>
    );

  return (
    <Link href="/posts">
      <Avatar
        src={`${user.avatar_url}&s=80`}
        alt={user.name ?? "User avatar"}
      />
    </Link>
  );
};
