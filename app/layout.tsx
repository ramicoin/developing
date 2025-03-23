import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { headers } from "next/headers"; // added

import Navbar from "@/components/Navbar/navbar";
import ProgressBar from "@/components/Loader";
import ContextProvider from "@/context";
import { GlobalProvider } from "@/context/global";
import { AffiliateProvider } from "@/context/affiliate";


const satoshi = localFont({
  src: [
    { path: "/fonts/satoshi/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "/fonts/satoshi/Satoshi-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "/fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "/fonts/satoshi/Satoshi-Italic.woff2", weight: "400", style: "italic" },
    { path: "/fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "/fonts/satoshi/Satoshi-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "/fonts/satoshi/Satoshi-Bold.woff2", weight: "900", style: "normal" },
    { path: "/fonts/satoshi/Satoshi-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "/fonts/satoshi/Satoshi-Black.woff2", weight: "900", style: "normal" },
    { path: "/fonts/satoshi/Satoshi-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ramicoin.com"),
  title: "The RamiCoin",
  description: `We trade Bitcoin & Gold, earn profits, and distribute to the RamiCoin holders.`,
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f7cbf4" />
      </head>
      <body
        className={`${satoshi.variable} antialiased`}
      >
        <ContextProvider cookies={cookies}>
          <GlobalProvider>
            <AffiliateProvider>
          <ProgressBar />
          <Navbar />
          {children}
          <ToastContainer />
            </AffiliateProvider>
          </GlobalProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
