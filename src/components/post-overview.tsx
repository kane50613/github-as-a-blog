import { type Post } from "@/app/(auth)/posts/action";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const PostOverview = ({ post }: { post: Post }) => (
  <Link href={`/posts/${post.number}`} className="h-full">
    <Card className="flex flex-col h-full hover:bg-secondary/50 transition-colors">
      <CardHeader className="flex-grow">
        <p className="text-secondary-foreground/75 text-sm">
          #{post.number} • @{post.user?.login}
        </p>
        <CardTitle className="text-lg md:text-xl h-full line-clamp-2 break-all">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-secondary-foreground/80 break-all">
        <span className="line-clamp-3">{post.body}</span>
      </CardContent>
      <CardFooter className="text-secondary-foreground/75 text-sm">
        Read more
      </CardFooter>
    </Card>
  </Link>
);
