import Image from "next/image";
import styles from "./BaklavaMenu.module.css";

export function BaklavaHeader() {
  return (
    <header className={styles.header}>
      <Image src="/brands/baklava/logo/logo-inline.svg" alt="قلی‌وند، کافه باقلوا" width={199} height={70} preload className={styles.logo} />
      <div className={styles.headerNote}><span />کافه باقلوا<span className={styles.headerEnglish} lang="en">GHOLIVAND CAFÉ</span></div>
    </header>
  );
}
