"use client";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { LayoutList, LogIn, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <a href="/api/auth" aria-label="Login">
          <LogIn className="w-5" />
        </a>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          className="w-8 h-8"
          src={`${user.avatar_url}&s=64`}
          alt={user.name ?? "User avatar"}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel asChild>
          <a
            target="_blank"
            href={`https://github.com/${user.login}`}
            className="flex flex-col"
          >
            {user.login}
            <span className="block text-muted-foreground font-normal">
              {user.email}
            </span>
          </a>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/posts">
            <LayoutList className="w-4 mr-2" />
            My Posts
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/api/auth/logout"
            className="!text-destructive"
            prefetch={false}
          >
            <LogOut className="w-4 mr-2" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
