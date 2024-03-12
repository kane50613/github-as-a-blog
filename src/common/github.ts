import { getSession, type IronSessionData } from "@/session";
import { Octokit } from "@octokit/rest";
import { type IronSession } from "iron-session";

export async function listPosts(page = 0) {
  const session = await getSession();

  return client(session).issues.listForRepo({
    owner: "kane50613",
    repo: "github-as-a-blog",
    creator: "kane50613",
    page,
    per_page: 10,
  });
}

export function client(session: IronSession<IronSessionData>) {
  return new Octokit({
    auth: session.token,
  });
}
