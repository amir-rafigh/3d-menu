import type { Metadata } from "next";
import QeytranLanding from "./QeytranLanding";

export const metadata: Metadata = {
  title: "رستوران قیطران | به سفرهٔ ما خوش آمدید",
  description: "آشپزخانهٔ ایرانی قیطران؛ طعم زغال و زعفران، معرفی غذاها، قصهٔ رستوران و منوی دیجیتال.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <QeytranLanding />;
}
