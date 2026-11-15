import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "قلی‌وند | Gholivand Demo",
  description: "Reserved for the Gholivand baklava cafe menu demo.",
};

export default function BaklavaLayout({ children }: { children: ReactNode }) {
  return <div lang="fa" dir="rtl">{children}</div>;
}
