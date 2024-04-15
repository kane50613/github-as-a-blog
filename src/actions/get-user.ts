"use server";

import { getUser } from "@/common/github";
import { getUnsafeSession } from "@/session";

export async function getUserAction() {
  const session = await getUnsafeSession();

  if (!session.token) return null;

  return getUser(session);
}
