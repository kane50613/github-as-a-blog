import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const BackButton = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => (
  <Button variant="ghost" size="sm" asChild>
    <Link href={href} className="text-muted-foreground -ml-4">
      <ChevronLeft className="w-4 mr-2" /> {children}
    </Link>
  </Button>
);
