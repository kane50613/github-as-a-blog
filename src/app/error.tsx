"use client";

import { themeScript } from "@/lib/script";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: unknown }) {
  useEffect(() => console.error(error), [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>
      <body>
        <Error statusCode={500} />
      </body>
    </html>
  );
}
