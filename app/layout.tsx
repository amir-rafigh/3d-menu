import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

const vazirmatn = localFont({
  src: "../public/fonts/Vazirmatn-variable.woff2",
  variable: "--font-vazirmatn",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Menu Demo Platform",
  description: "Independent restaurant and cafe menu demos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={vazirmatn.variable}>
      <body>{children}</body>
    </html>
  );
}
