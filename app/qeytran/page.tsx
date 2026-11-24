import type { Metadata } from "next";
import QeytranMenu from "./QeytranMenu";

export const metadata: Metadata = {
  title: "قیطران | طعم اصیل، روایت تازه",
  description: "دموی منوی دیجیتال رستوران قیطران؛ چلوکباب ایرانی و طعم زعفران.",
};

export default function Page() {
  return <QeytranMenu />;
}
