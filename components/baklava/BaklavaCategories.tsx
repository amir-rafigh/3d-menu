import type { Category, Product } from "@/types/product";
import styles from "./BaklavaMenu.module.css";

interface Props {
  categories: readonly Category[];
  products: readonly Product[];
  active: string;
  onChange: (id: string) => void;
}

export function BaklavaCategories({ categories, products, active, onChange }: Props) {
  return <nav className={styles.categories} aria-label="دسته‌بندی محصولات">
    {categories.map((category) => {
      const count = products.filter((product) => category.id === "all" || product.category === category.id).length;
      return <button type="button" key={category.id} aria-pressed={active === category.id} onClick={() => onChange(category.id)}>
        {category.name}<span>{count.toLocaleString("fa-IR")}</span>
      </button>;
    })}
  </nav>;
}
