"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function Submit({
  loading,
  ...props
}: ButtonProps & {
  loading?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={loading ?? pending} type="submit" {...props}>
      {loading ?? pending ? (
        <Loader2 className="w-4 animate-spin" />
      ) : (
        props.children ?? "Submit"
      )}
    </Button>
  );
}
