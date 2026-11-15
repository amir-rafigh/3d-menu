import { BaklavaHeader } from "@/components/baklava/BaklavaHeader";
import { BaklavaMenu } from "@/components/baklava/BaklavaMenu";
import { baklavaProducts } from "@/data/baklava/products";
import { baklavaCategories } from "@/data/baklava/categories";
import styles from "@/components/baklava/BaklavaMenu.module.css";

export default function BaklavaPage() {
  return (
    <div className={styles.page}>
      <BaklavaHeader />
      <main>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>یک مکث شیرین، به سبک قلی‌وند</p>
          <h1>طعم‌ها اینجا <em>آشنا نیستند!</em></h1>
          <p>باید تجربه کنید.</p>
        </div>
        <BaklavaMenu products={baklavaProducts} categories={baklavaCategories} />
      </main>
      <footer className={styles.footer}><span>قلی‌وند، کافه باقلوا</span><span lang="en">A LITTLE SWEET ESCAPE</span></footer>
    </div>
  );
}
