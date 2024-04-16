import { createElement, type JSX, type ReactNode } from "react";
import Markdown from "markdown-to-jsx";

type Components = Partial<{
  [Key in keyof JSX.IntrinsicElements]: (
    props: JSX.IntrinsicElements[Key],
    children: ReactNode,
  ) => JSX.Element;
}>;

const components: Components = {
  img: (props) => (
    <span className="aspect-video w-full flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        className="rounded-md w-full h-full object-contain"
        loading="lazy"
        decoding="async"
        alt={"alt" in props && typeof props.alt === "string" ? props.alt : ""}
        key={null}
      />
    </span>
  ),
  a: (props, children) => (
    <a
      {...props}
      className="foreground underline break-words"
      rel="nofollow"
      key={null}
    >
      {children}
    </a>
  ),
};

export const MDX = ({ children }: { children: string }) => (
  <Markdown
    options={{
      createElement(type, props, children) {
        if (typeof type === "string") {
          const renderer = components[type as keyof typeof components];

          if (renderer) return renderer(props, children);
        }

        return createElement(type, props, children);
      },
      // safety measure to prevent XSS attacks
      disableParsingRawHTML: true,
    }}
  >
    {children}
  </Markdown>
);
