import { Loader2 } from "lucide-react";

export function FullPageLoader() {
  return (
    <div className="flex justify-center h-[calc(100dvh-4.5rem)] items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
