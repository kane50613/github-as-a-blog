import { type ReactNode } from "react";

export const PostsContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-8 flex-col mx-auto w-fit">{children}</div>
);
