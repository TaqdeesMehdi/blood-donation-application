import type { Metadata } from "next";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/components/convex-client-provider";

export const metadata: Metadata = {
  title: "Blood donation Application",
  description: "A blood donation application made in nextjs and convex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <head>
          <link
            href="https://cdn.jsdelivr.net/npm/@fontsource/cascadia-code@5.1.0/index.css"
            rel="stylesheet"
          />
        </head>
        <body
          className="antialiased"
          style={{ fontFamily: "'Cascadia Code', monospace" }}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
