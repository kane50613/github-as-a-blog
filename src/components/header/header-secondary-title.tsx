"use client";

import { create } from "zustand";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const useHeaderTitle = create(() => ({
  title: "",
  visible: false,
}));

export const HeaderSecondaryTitle = () => {
  const { title, visible } = useHeaderTitle();

  return (
    <div className="md:mx-auto">
      <Link
        href="/"
        className={cn(
          "text-medium md:invisible transition-transform block absolute",
          visible && "-translate-y-12",
        )}
      >
        GaaB
      </Link>
      <a
        href="#"
        onClick={() =>
          // since body has overflow auto, we need to scroll the top element defined in layout.tsx
          document.querySelector("#top")?.scrollIntoView({
            behavior: "smooth",
          })
        }
        aria-label="Back to top"
        className={cn(
          "text-sm transition-transform line-clamp-1 cursor-pointer",
          !visible && "translate-y-12",
        )}
      >
        {title || "GaaB"}
      </a>
    </div>
  );
};
