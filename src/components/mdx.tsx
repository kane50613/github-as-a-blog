import { createElement } from "react";
import Markdown from "markdown-to-jsx";

export const MDX = ({ children }: { children: string }) => (
  <Markdown
    options={{
      createElement(type, props, children) {
        if (type === "img")
          return (
            // since we can't get the width and height of the image, we won't be using the `next/image` component.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...props}
              className="rounded-md"
              loading="lazy"
              decoding="async"
              alt={
                "alt" in props && typeof props.alt === "string" ? props.alt : ""
              }
              key={null}
            />
          );

        if (type === "a")
          return (
            <a
              {...props}
              className="foreground underline break-words"
              rel="nofollow"
              key={null}
            >
              {children}
            </a>
          );

        return createElement(type, props, children);
      },
      // safety measure to prevent XSS attacks
      disableParsingRawHTML: true,
    }}
  >
    {children}
  </Markdown>
);
