import { type ReactNode } from "react";
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
    // create a key for each page
    (page) => [page + 1, props.key] as const,
    ([page]) => props.loader(page as number),
  );

  // check if the last page has 10 items, if not, there are no more items
  const hasMore = data.length > 0 && data?.at(-1)?.length === 10;

  const { ref } = useInView({
    async onChange(value) {
      // update the page size when the last item is in view
      if (value && hasMore) await setSize((s) => s + 1);
    },
  });

  // flatten the data from each page and render the component
  const components = data.flat().map(props.render);

  return {
    components,
    ref,
    isLoading: isLoading || isValidating,
    hasMore,
  };
}
