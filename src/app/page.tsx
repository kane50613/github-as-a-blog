import { listPosts } from "@/common/github";
import { PostOverview } from "@/components/post-overview";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Rocket } from "lucide-react";

export const runtime = "edge";

export const revalidate = 30;

export default async function HomePage() {
  const posts = await listPosts();

  return (
    <div className="flex items-center gap-4 flex-col space-y-4 py-4 justify-center text-center">
      <h1 className="text-3xl lg:text-5xl !leading-relaxed font-semibold">
        Blogging should be
        <br /> easy as GitHub issue.
      </h1>
      <p className="text-foreground/80">
        Effortless blogging with GitHub issues and Next.js.
      </p>
      <Button>
        <Rocket className="w-4 mr-2" />
        Starts now
      </Button>
      <Separator />
      {posts.map((post, index) => (
        <PostOverview post={post} key={index} />
      ))}
    </div>
  );
}
