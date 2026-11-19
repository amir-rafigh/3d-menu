import type { Metadata } from "next";
import PatientPortal from "./patient-portal";
import "../ghobadi.css";
export const metadata: Metadata = { title: "رزرو نوبت آنلاین | دندان‌پزشکی قبادی", robots: { index: false, follow: false }, icons: { icon: "/ghobadi/logo.svg" } };
export default function Page() { return <PatientPortal/>; }
