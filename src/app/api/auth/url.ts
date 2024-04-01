export function buildFullUrl(req: Request, path: string) {
  const { protocol, host } = new URL(req.url);

  return `${protocol}//${host}${path}`;
}
