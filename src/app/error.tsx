"use client";

import { themeScript } from "@/lib/script";
import Error from "next/error";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GlobalError({ error }: { error: unknown }) {
  useEffect(() => {
    console.error(error);
    toast.error("An error occurred. Please try again later.");
  }, [error]);

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
