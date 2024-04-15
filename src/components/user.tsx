"use client";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { LogIn } from "lucide-react";

export const User = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <Avatar className="w-8 h-8" alt="User" />;

  // login button to match the size of the avatar, prevent layout shift
  if (!user)
    return (
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="w-8 h-8 p-0 rounded-full"
      >
        <a href="/api/auth">
          <LogIn className="w-5" />
        </a>
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
