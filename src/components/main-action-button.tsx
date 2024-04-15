"use client";

import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export const MainActionButton = ({
  redirectToAuth,
}: {
  redirectToAuth: boolean;
}) => {
  if (redirectToAuth)
    return (
      <Button asChild>
        <a href="/api/auth">
          <Rocket className="w-4 mr-2" />
          Start blogging now
        </a>
      </Button>
    );

  return (
    <Button asChild>
      <Link href="/posts">
        <Rocket className="w-4 mr-2" />
        Start blogging now
      </Link>
    </Button>
  );
};

// this loader is used to prevent some wierd browser behavior,
// which shows an empty page when the user is not authenticated
export const MainActionButtonLoader = () => {
  const user = useUser();

  return <MainActionButton redirectToAuth={!user.data && !user.isLoading} />;
};
