import { useMemo, type ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

export interface InfiniteDataProps<Data> {
  render: (props: Data) => ReactNode;
  loader: (page: number) => Promise<Data[]>;
  key: string;
}

export function useInfiniteData<T>(props: InfiniteDataProps<T>) {
  const {
    data = [],
    isLoading,
    isValidating,
    setSize,
  } = useSWRInfinite<T[]>(
    (page) => [page + 1, props.key] as const,
    ([page, _]) => props.loader(page as number),
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

  const components = useMemo(
    () => data.flat().map(props.render),
    [data, props.render],
  );

  return {
    components,
    ref,
    isLoading: isLoading || isValidating,
    hasMore,
  };
}
