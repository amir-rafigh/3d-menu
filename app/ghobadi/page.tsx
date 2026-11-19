import type { Metadata } from "next";
import ClinicApp from "./clinic-app";
import "./ghobadi.css";

export const metadata: Metadata = {
  title: "قبادی | سامانه هوشمند مطب دندان‌پزشکی",
  description: "دموی فارسی مدیریت مطب و رزرو آنلاین نوبت دندان‌پزشکی قبادی",
  robots: { index: false, follow: false },
  icons: { icon: "/ghobadi/logo.svg" },
};

export default function Page() {
  return <ClinicApp />;
}
