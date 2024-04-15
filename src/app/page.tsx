import { MainActionButtonLoader } from "@/components/main-action-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { HeaderTitle } from "@/components/header/header-title";
import { PostsLoader } from "@/app/(auth)/posts/posts-loader";

export default function HomePage() {
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="flex flex-col gap-4 justify-center items-center container py-6">
        <HeaderTitle label="Latest Posts">
          <h1 className="text-3xl xs:text-5xl md:text-6xl !leading-relaxed font-bold text-center">
            Blogging should be
            <br /> easy as GitHub issue.
          </h1>
        </HeaderTitle>
        <p className="text-foreground/80 text-center">
          Effortless blogging with GitHub issues and Next.js.
        </p>
        <div className="gap-2 flex flex-col sm:flex-row w-full sm:w-fit">
          <MainActionButtonLoader />
          <Button variant="secondary" asChild>
            <a href="https://github.com/kane50613/github-as-a-blog/">
              <Star className="w-4 mr-2" />
              Star on GitHub
            </a>
          </Button>
        </div>
      </div>
      <Separator className="md:mb-4" />
      <PostsLoader type="all" />
    </div>
  );
}
