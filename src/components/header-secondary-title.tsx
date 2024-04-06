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
    <div className="md:text-center">
      <Link
        href="/"
        className={cn(
          "text-medium md:invisible transition-transform block absolute",
          visible && "-translate-y-12",
        )}
      >
        GaaB
      </Link>
      <button
        onClick={() =>
          scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className={cn(
          "text-sm transition-transform line-clamp-1",
          !visible && "translate-y-12",
        )}
      >
        {title || "GaaB"}
      </button>
    </div>
  );
};
