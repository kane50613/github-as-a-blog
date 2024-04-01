"use client";

import { type FC, type PropsWithChildren, useLayoutEffect } from "react";
import { InView } from "react-intersection-observer";
import { useHeaderTitle } from "@/components/header-secondary-title";

export const HeaderTitle: FC<
  PropsWithChildren & {
    label: string;
    className?: string;
  }
> = ({ label, children, className }) => {
  useLayoutEffect(() => {
    useHeaderTitle.setState({
      title: label,
      visible: false,
    });
  }, [label]);

  return (
    <InView
      as="div"
      onChange={(inView) => useHeaderTitle.setState({ visible: !inView })}
      className={className}
    >
      {children}
    </InView>
  );
};
