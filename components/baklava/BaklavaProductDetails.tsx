import type { Product } from "@/types/product";
import styles from "./BaklavaMenu.module.css";
import { baklavaCategories } from "@/data/baklava/categories";

export function BaklavaProductDetails({ product }: { product: Product }) {
  return <div className={styles.details}>
    <span className={styles.productCategory}>{baklavaCategories.find((category) => category.id === product.category)?.name}</span>
    <h2>{product.name}</h2>
    {product.description && <p>{product.description}</p>}
    <div className={styles.price}>
      {product.price !== undefined
        ? <><strong>{product.price.toLocaleString("fa-IR")}</strong><span>تومان</span></>
        : <span className={styles.unconfirmed}>قیمت اعلام نشده</span>}
    </div>
    {product.temporaryLabel && <p className={styles.dataNote}>نام نمایشی موقت؛ نام منو تأیید نشده</p>}
  </div>;
}
