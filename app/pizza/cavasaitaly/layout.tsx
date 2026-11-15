import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Cavasa Italy Demo",
  description: "Reserved for the Cavasa Italy pizza menu demo.",
};

export default function CavasaItalyLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
