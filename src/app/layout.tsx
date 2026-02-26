import type { Metadata } from "next";
import Layout from "@/layout";
import "./globals.css";
import ContextProviders from "@/contexts";

export const metadata: Metadata = {
  title: "Vibe",
  description: "awesome music player",
  authors: { name: "Mahdi FayyaziMoghaddam" },
  icons: {
    icon: "/images/note.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.clear();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* React Scan for Debugging on blow */}
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        /> */}
      </head>
      <body
        className="antialiased flex flex-col justify-start items-stretch bg-dark-900 text-dark-100 h-dvh font-medium overflow-hidden"
        cz-shortcut-listen="true"
        data-gr-ext-installed=""
        contextMenu="none"
      >
        <ContextProviders>
          <Layout>{children}</Layout>
        </ContextProviders>
      </body>
    </html>
  );
}
