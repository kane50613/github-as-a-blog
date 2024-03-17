import { getUser } from "@/common/github";
import { whitelistCheckWithFallback } from "@/common/whitelist";
import { getSession } from "@/session";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  const user = await getUser(session);

  if (!whitelistCheckWithFallback(user.login))
    return (
      <div className="h-[calc(100dvh-4.5rem)] flex justify-center items-center text-center gap-4 flex-col">
        <h1>Forbidden</h1>
        <p>
          You are not allowed to access this page, please contact the owner of
          the blog.
        </p>
      </div>
    );

  return <>{children}</>;
}
