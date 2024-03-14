import { Avatar } from "@/components/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { User } from "@/components/user";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { Suspense } from "react";

export const Header = () => {
  return (
    <div className="sticky top-0 bg-background z-50 border-b">
      <div className="h-16 flex justify-between w-full items-center container">
        <Link href="/">GaaB</Link>
        <div className="flex items-center">
          <Button asChild variant="ghost" size="sm">
            <a
              href="https://github.com/kane50613/github-as-a-blog/"
              target="_blank"
            >
              <SiGithub className="w-5" />
            </a>
          </Button>
          <ThemeToggle />
          <div className="w-2" />
          <Suspense fallback={<Avatar alt="User avatar" />}>
            <User />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
