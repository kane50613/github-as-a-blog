import { Avatar } from "@/components/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { User } from "@/components/user";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { Suspense } from "react";
import { HeaderSecondaryTitle } from "@/components/header-secondary-title";

// React type definition for svg is broken
// https://github.com/icons-pack/react-simple-icons/issues/215
export const Header = () => (
  <div className="sticky top-0 bg-background z-50 border-b">
    <div className="h-16 md:grid flex justify-between md:grid-cols-3 overflow-y-hidden w-full items-center container">
      <Link href="/" className="text-medium">
        GaaB
      </Link>
      <div className="text-center md:block hidden">
        <HeaderSecondaryTitle />
      </div>
      <div className="flex items-center justify-self-end">
        <Button asChild variant="ghost" size="sm">
          <a
            href="https://github.com/kane50613/github-as-a-blog/"
            target="_blank"
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <SiGithub className="w-5" />
          </a>
        </Button>
        <ThemeToggle />
        <div className="w-2" />
        <Suspense fallback={<Avatar className="w-8" alt="User avatar" />}>
          <User />
        </Suspense>
      </div>
    </div>
  </div>
);
