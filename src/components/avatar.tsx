import { cn } from "@/lib/utils";
import type { ComponentProps, FC } from "react";

export const Avatar: FC<
  ComponentProps<"img"> & {
    alt: string;
  }
> = (props) => {
  if (props.src)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        alt={props.alt}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full aspect-square object-cover",
          props.className,
        )}
      />
    );

  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted",
        props.className,
      )}
    >
      <span>{props.alt[0]}</span>
    </div>
  );
};
