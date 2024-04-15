"use client";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export const User = () => {
  const { data: user } = useUser();

  if (!user)
    return (
      <Button asChild size="sm" variant="secondary">
        <a href="/api/auth">Login</a>
      </Button>
    );

  return (
    <Link href="/posts" className="w-8">
      <Avatar
        className="w-8 h-8"
        src={`${user.avatar_url}&s=64`}
        alt={user.name ?? "User avatar"}
      />
    </Link>
  );
};
