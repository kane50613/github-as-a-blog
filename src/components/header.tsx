import { User } from "@/components/User";
import { Avatar } from "@/components/avatar";
import Link from "next/link";
import { Suspense } from "react";

export const Header = () => {
  return (
    <div className="h-16 flex justify-between w-full items-center sticky top-0 bg-background z-50">
      <Link href="/">GaaS</Link>
      <Suspense fallback={<Avatar alt="User avatar" />}>
        <User />
      </Suspense>
    </div>
  );
};
