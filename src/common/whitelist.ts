import { env } from "@/env";

export function whitelistCheck(userId: string) {
  if (!env.WHITELISTED_AUTHORS)
    throw new Error(
      `The user ${userId} is not in the whitelist, please add them to the WHITELISTED_AUTHORS environment variable if you want to allow them to access the site.`,
    );
}

export function whitelistCheckWithFallback(userId: string) {
  // If the WHITELISTED_AUTHORS environment variable is not set, allow all users
  // If the user is in the whitelist, allow them
  return !env.WHITELISTED_AUTHORS || env.WHITELISTED_AUTHORS.includes(userId);
}
