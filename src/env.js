import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    JWT_SECRET: z.string(),
    WHITELISTED_AUTHORS: z
      .string()
      .trim()
      .transform((value) => value.split(",").filter(Boolean))
      .optional(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string(),
    NEXT_PUBLIC_GITHUB_REPO_OWNER: z.string(),
    NEXT_PUBLIC_GITHUB_REPO: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
    WHITELISTED_AUTHORS: process.env.WHITELISTED_AUTHORS,
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NEXT_PUBLIC_GITHUB_REPO_OWNER:
      process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER ?? "kane50613",
    NEXT_PUBLIC_GITHUB_REPO:
      process.env.NEXT_PUBLIC_GITHUB_REPO ?? "github-as-a-blog",
    JWT_SECRET: process.env.JWT_SECRET,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
