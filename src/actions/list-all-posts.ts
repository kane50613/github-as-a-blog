"use server";

import { listPosts as listPostsInternal } from "@/common/github";
import { action } from "@/common/action";
import { z } from "zod";

export const listAllPosts = action
  .schema(z.number())
  .action(async ({ parsedInput }) => listPostsInternal(undefined, parsedInput));
