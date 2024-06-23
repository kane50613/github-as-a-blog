"use server";

import { listPosts as listPostsInternal } from "@/common/github";
import { authAction } from "@/common/action";
import { z } from "zod";

// needs the re-export here with the "use server" directive, otherwise it will not be available in the client
export const listMyPosts = authAction
  .schema(z.number())
  .action(async ({ parsedInput, ctx }) =>
    listPostsInternal(ctx.user.login, parsedInput),
  );
