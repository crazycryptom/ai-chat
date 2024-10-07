import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Me Now",
  description: "AI assistant",
  icons: ["/assets/gpt.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        {children}
        <Script src="/js/prism.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
