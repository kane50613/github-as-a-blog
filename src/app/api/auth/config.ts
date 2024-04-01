import { env } from "@/env";

export const loginUrl = new URL("https://github.com/login/oauth/authorize");

export const scopes = ["read:user", "public_repo"];
export const scope = scopes.join(" ");

loginUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
loginUrl.searchParams.set("response_type", "code");
loginUrl.searchParams.set("scope", scope);
