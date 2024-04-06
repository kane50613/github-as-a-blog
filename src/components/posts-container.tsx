import { Children, type ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

export const PostsContainer = ({ children }: { children: ReactNode }) => {
  const separator = <Separator />;

  const childrenWithSeparator = Children.map(children, (child, index) => (
    <>
      {child}
      {index < Children.count(children) - 1 && separator}
    </>
  ));

  return (
    <div className="flex md:gap-2 flex-col mx-auto w-fit">
      {childrenWithSeparator}
    </div>
  );
};
