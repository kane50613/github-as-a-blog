import { Header } from "@/components/header";
import { env } from "@/env";
import { themeScript } from "@/lib/script";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "GaaB: Github as a Blog",
  description:
    "Convert GitHub issues into blog posts for effortless content sharing and SEO enhancement",
  alternates: {
    canonical: new URL(env.NEXT_PUBLIC_BASE_URL),
  },
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    siteName: "GaaB: Github as a Blog",
    images: {
      width: 1200,
      height: 630,
      url: `${env.NEXT_PUBLIC_BASE_URL}/cover.jpg`,
    },
  },
};

export const runtime = "edge";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // need to suppressHydrationWarning because of the script tag in the head sets the theme class
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for GaaB: Github as a Blog"
          href="/api/rss.xml"
        />
      </head>
      <body>
        <Header />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
