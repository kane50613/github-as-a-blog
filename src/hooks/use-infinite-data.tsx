import { useMemo, type ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

interface InfiniteDataProps<T> {
  render: (props: T) => ReactNode;
  loader: (index: number) => Promise<T[]>;
}

export function useInfiniteData<T>(props: InfiniteDataProps<T>) {
  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
  } = useSWRInfinite<T[]>(
    (index) => [index + 1] as const,
    ([index]) => props.loader(index as number),
  );

  const hasMore = useMemo(
    () => data.length > 0 && data?.at(-1)?.length === 10,
    [data],
  );

  const { ref } = useInView({
    async onChange(value) {
      if (value && hasMore) await setSize((s) => s + 1);
    },
  });

  const components = useMemo(() => data.flat().map(props.render), [data]);

  return {
    components,
    ref,
    isLoading: isLoading || isValidating,
    hasMore,
  };
}
