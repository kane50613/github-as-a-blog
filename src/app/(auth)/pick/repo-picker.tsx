"use client";

import { type Repo } from "@/common/github";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export const RepoPicker = ({ repos }: { repos: Repo[] }) => {
  const router = useRouter();

  return (
    <Select onValueChange={(value) => router.push(value)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Pick a repo!" />
      </SelectTrigger>
      <SelectContent>
        {repos.map((repo) => (
          <SelectItem value={`/${repo.owner.login}/${repo.name}`} key={repo.id}>
            {repo.owner.login}/{repo.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
