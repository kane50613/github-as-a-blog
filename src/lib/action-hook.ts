import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export function useActionWithHandler<T extends Parameters<typeof useAction>[0]>(
  func: T,
) {
  return useAction(func, {
    onError(error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    },
  });
}

export function wrapInfiniteSafeAction<Data>(
  func: (input: number) => Promise<{
    data?: Data;
    serverError?: string;
    validationErrors?: Partial<Record<string, string[]>>;
  }>,
) {
  return async function (page: number) {
    const data = await func(page);

    if (data.serverError) {
      toast.error(JSON.stringify(data.serverError));
      throw new Error(data.serverError);
    }

    if (data.validationErrors) {
      toast.error(JSON.stringify(data.validationErrors));
      throw new Error("Validation error");
    }

    if (!data.data) throw new Error("No data returned");

    return data.data;
  };
}
