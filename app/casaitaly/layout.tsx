import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "کازا ایتالی | یک برش از ایتالیا",
  description: "منوی پیتزاهای ناپولیتن کازا ایتالی؛ یک سفر کوچک به ایتالیا، در قلب اردبیل.",
};

export default function CavasaItalyLayout({ children }: { children: ReactNode }) {
  return <div lang="fa" dir="rtl">{children}</div>;
}
