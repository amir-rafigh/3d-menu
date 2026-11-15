import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "منوی قلی‌وند | کافه باقلوا",
  description: "منوی تعاملی باقلوا و دسرهای کافه قلی‌وند؛ طعم‌ها اینجا آشنا نیستند.",
};

export default function BaklavaLayout({ children }: { children: ReactNode }) {
  return <div lang="fa" dir="rtl">{children}</div>;
}
