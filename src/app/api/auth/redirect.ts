import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function redirectFromCookie() {
  const store = cookies();

  const redirectCookie = store.get("rd")?.value;

  try {
    store.delete("rd");
  } catch (e) {}

  if (
    redirectCookie &&
    /^\/([^?\/]+)/gm.test(redirectCookie) &&
    !redirectCookie.includes("/api/auth")
  )
    return redirect(redirectCookie);

  redirect("/");
}
