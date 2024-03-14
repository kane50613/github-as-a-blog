import { type ComponentProps } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MDX = (props: ComponentProps<typeof Markdown>) => (
  <Markdown
    {...props}
    remarkPlugins={[remarkGfm]}
    components={{
      a: (props) => (
        <a
          {...props}
          className="text-primary underline break-all"
          rel="nofollow"
        />
      ),
      ...props.components,
    }}
  />
);
