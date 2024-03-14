import { listPosts } from "@/common/github";
import { PostOverview } from "@/components/post-overview";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Rocket, Star } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";

export const revalidate = 30;

export default async function HomePage() {
  const posts = await listPosts();

  return (
    <div className="flex items-center gap-4 flex-col space-y-4 py-4 justify-center text-center">
      <h1 className="text-3xl md:text-5xl lg:text-6xl !leading-relaxed font-bold">
        Blogging should be
        <br /> easy as GitHub issue.
      </h1>
      <p className="text-foreground/80">
        Effortless blogging with GitHub issues and Next.js.
      </p>
      <div className="gap-2 flex flex-col sm:flex-row w-full sm:w-fit">
        <Button asChild>
          <Link href="/posts">
            <Rocket className="w-4 mr-2" />
            Start blogging now
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <a href="https://github.com/kane50613/github-as-a-blog/">
            <Star className="w-4 mr-2" />
            Star on GitHub
          </a>
        </Button>
      </div>
      <Separator />
      {posts.map((post, index) => (
        <PostOverview post={post} key={index} />
      ))}
    </div>
  );
}
