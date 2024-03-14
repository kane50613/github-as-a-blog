import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    JWT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_GITHUB_REPO_OWNER: z.string(),
    NEXT_PUBLIC_GITHUB_REPO: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NEXT_PUBLIC_GITHUB_REPO_OWNER:
      process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER ?? "kane50613",
    NEXT_PUBLIC_GITHUB_REPO:
      process.env.NEXT_PUBLIC_GITHUB_REPO ?? "github-issues-blog-demo",
    JWT_SECRET: process.env.JWT_SECRET,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
