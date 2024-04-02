import {
  MainActionButton,
  MainActionButtonLoader,
} from "@/components/main-action-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { Suspense } from "react";
import { HeaderTitle } from "@/components/header-title";
import { PostsLoader } from "@/app/(auth)/posts/posts-loader";
import { listAllPosts } from "@/actions/list-all-posts";

export const runtime = "edge";

export default function HomePage() {
  return (
    <div className="flex items-center gap-4 flex-col space-y-4 py-4 justify-center">
      <HeaderTitle label="Blogging should be easy as GitHub issue.">
        <h1 className="text-3xl md:text-5xl lg:text-6xl !leading-relaxed font-bold text-center">
          Blogging should be
          <br /> easy as GitHub issue.
        </h1>
      </HeaderTitle>
      <p className="text-foreground/80 text-center">
        Effortless blogging with GitHub issues and Next.js.
      </p>
      <div className="gap-2 flex flex-col sm:flex-row w-full sm:w-fit">
        <Suspense fallback={<MainActionButton redirectToAuth={false} />}>
          <MainActionButtonLoader />
        </Suspense>
        <Button variant="secondary" asChild>
          <a href="https://github.com/kane50613/github-as-a-blog/">
            <Star className="w-4 mr-2" />
            Star on GitHub
          </a>
        </Button>
      </div>
      <Separator />
      <PostsLoader key="all-posts" loader={listAllPosts} />
    </div>
  );
}
