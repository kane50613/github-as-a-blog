import { getUnsafeSession } from "@/session";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getUnsafeSession();

  if (!session.token) return redirect("/api/auth");

  return <>{children}</>;
}
