import { type ComponentProps } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MDX = (props: ComponentProps<typeof Markdown>) => (
  <Markdown
    {...props}
    remarkPlugins={[remarkGfm]}
    components={{
      img: (props) => (
        // since we can't get the width and height of the image, we won't be using the `next/image` component.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...props}
          className="rounded-md"
          loading="lazy"
          decoding="async"
          alt={props.alt ?? ""}
        />
      ),
      a: (props) => (
        <a
          {...props}
          className="foreground underline break-all"
          rel="nofollow"
        />
      ),
      ...props.components,
    }}
  />
);
