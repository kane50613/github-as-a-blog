import { getUser } from "@/common/github";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const User = async () => {
  const user = await getUser();

  if (!user)
    return (
      <Button>
        <Link href="/api/auth">Login</Link>
      </Button>
    );

  return <Avatar src={user.avatar_url} alt={user.name ?? "User avatar"} />;
};
