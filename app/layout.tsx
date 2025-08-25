import React from "react";
import type { Metadata } from "next";
import "@/styles/global.scss";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Job Portal",
  description:
    "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <Head>
            <meta name="viewport" content="initial-scale=1 maximum-scale=1.0 user-scalable=no" />
          </Head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
