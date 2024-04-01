"use client";

import { create } from "zustand";
import { cn } from "@/lib/utils";

export const useHeaderTitle = create<{
  title: string;
  visible: boolean;
}>(() => ({
  title: "",
  visible: false,
}));

export const HeaderSecondaryTitle = () => {
  const { title, visible } = useHeaderTitle();

  return (
    <h3
      className={cn(
        "md:block hidden text-sm transition-transform",
        !visible && "translate-y-12",
      )}
    >
      {title}
    </h3>
  );
};
