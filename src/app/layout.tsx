import "@/styles/globals.css";

import { Header } from "@/components/header";
import { type Metadata } from "next";
import { type ReactNode } from "react";

const themeScript = `!function e(){let t=localStorage.getItem("theme");!t&&window.matchMedia&&(t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),"dark"===t&&document.querySelector("html").classList.add("dark"),localStorage.setItem("theme",t)}();`;

export const metadata: Metadata = {
  title: "GaaB: Github as a Blog",
  description:
    "Convert GitHub issues into blog posts for effortless content sharing and SEO enhancement",
  alternates: {
    canonical: new URL("https://github-as-a-blog.vercel.app"),
  },
  metadataBase: new URL("https://github-as-a-blog.vercel.app"),
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    siteName: "GaaB: Github as a Blog",
    images: {
      width: 1200,
      height: 630,
      url: "https://github-as-a-blog.vercel.app/og-image.jpg",
    },
  },
};

export const runtime = "edge";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>
      <body>
        <Header />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
