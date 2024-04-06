import { createSafeActionClient } from "next-safe-action";
import { whitelistCheckWithFallback } from "@/common/whitelist";
import { getSession } from "@/session";
import { getUser } from "@/common/github";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const session = await getSession();

    const user = await getUser(session);

    if (!whitelistCheckWithFallback(user.login))
      throw new Error("You are not allowed to perform this action");

    return {
      user,
      session,
    };
  },
});
