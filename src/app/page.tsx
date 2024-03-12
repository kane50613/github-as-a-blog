import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";

export default async function HomePage() {
  return (
    <div className="flex items-center gap-4 flex-col h-[calc(100dvh-4rem)] justify-center text-center">
      <h1 className="text-3xl lg:text-6xl font-semibold">
        Blogging should be
        <br /> easy as GitHub issue.
      </h1>
      <p className="text-primary/75">
        GaaB is a tool to convert Github issues into blog posts for effortless
        content sharing and SEO enhancement.
      </p>
      <Button asChild className="mt-8">
        <Link href="/posts">
          <Rocket className="mr-2 w-4" />
          Starts now
        </Link>
      </Button>
    </div>
  );
}
