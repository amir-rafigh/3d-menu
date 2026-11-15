"use client";

import { useState } from "react";
import type { Category, Product } from "@/types/product";
import { BaklavaCategories } from "./BaklavaCategories";
import { BaklavaCarousel } from "./BaklavaCarousel";
import styles from "./BaklavaMenu.module.css";

export function BaklavaMenu({ products, categories }: { products: readonly Product[]; categories: readonly Category[] }) {
  const [category, setCategory] = useState("all");
  const filtered = products.filter((product) => category === "all" || product.category === category);
  return <>
    <BaklavaCategories categories={categories} products={products} active={category} onChange={setCategory} />
    <div className={styles.collectionLabel}><span />منوی قلی‌وند<span /></div>
    <BaklavaCarousel key={category} products={filtered} />
    <p className={styles.gestureHint} aria-hidden="true"><span>↔</span> برای کشف طعم‌ها، ورق بزنید</p>
  </>;
}
