import { getUnsafeSession } from "@/session";

export async function GET(req: Request) {
  const session = await getUnsafeSession();

  session.destroy();

  const url = new URL(req.url);

  return Response.redirect(`${url.protocol}//${url.host}`);
}
