"use client";

import { CircularCarousel } from "@/components/shared/carousel/CircularCarousel";
import { BaklavaProductDetails } from "./BaklavaProductDetails";
import type { Product } from "@/types/product";
import styles from "./BaklavaMenu.module.css";

const labels = {
  region: "منوی محصولات قلی‌وند",
  previous: "محصول قبلی",
  next: "محصول بعدی",
  item: (name: string) => `نمایش ${name}`,
};
const classes = { stage: styles.stage, item: styles.carouselItem, controls: styles.controls, dots: styles.dots, counter: styles.counter };

export function BaklavaCarousel({ products }: { products: readonly Product[] }) {
  return <CircularCarousel items={products} direction="rtl" classes={classes} labels={labels}
    renderDetails={(product) => <BaklavaProductDetails product={product} />} />;
}
