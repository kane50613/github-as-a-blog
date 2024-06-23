import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export const useActionWithHandler: typeof useAction = (func, utils) => {
  return useAction(func, {
    onError({ error }) {
      console.error(error);

      if (error.serverError)
        toast.error(
          typeof error.serverError === "string"
            ? error.serverError
            : JSON.stringify(error.serverError),
        );

      if (error.validationErrors)
        toast.error(JSON.stringify(error.validationErrors));

      if (error.fetchError) toast.error("Failed to fetch data");
    },
    ...utils,
  });
};

export function wrapInfiniteSafeAction<Data>(
  func: (input: number) => Promise<
    | {
        data?: Data;
        serverError?: string;
        validationErrors?: unknown;
      }
    | undefined
  >,
) {
  return async function (page: number) {
    const data = await func(page);

    if (data?.serverError) {
      toast.error(JSON.stringify(data.serverError));
      throw new Error(data.serverError);
    }

    if (data?.validationErrors) {
      toast.error(JSON.stringify(data.validationErrors));
      throw new Error("Validation error");
    }

    if (!data?.data) throw new Error("No data returned");

    return data.data;
  };
}
