"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./QeytranMenu.module.css";

const categories = [
  { id: "all", name: "همهٔ غذاها", en: "THE MENU", symbol: "✳" },
  { id: "kebab", name: "چلوکباب", en: "PERSIAN KEBAB", symbol: "♨" },
  { id: "chicken", name: "جوجه‌کباب", en: "SAFFRON CHICKEN", symbol: "✧" },
  { id: "platter", name: "سینی‌های مخصوص", en: "SHARING PLATTERS", symbol: "❋" },
];

const foods = [
  { id: "soltani", category: "kebab", title: "چلوکباب سلطانی", english: "SOLTANI KEBAB", image: "soltani", price: 685000, tag: "پیشنهاد سرآشپز", description: "یک ضیافت کوچک و اصیل؛ ترکیب کباب برگ و کوبیدهٔ زغالی، کنار برنج ایرانیِ دم‌کشیده با زعفران و گوجهٔ کبابی.", ingredients: ["راستهٔ گوساله", "کوبیدهٔ زغالی", "برنج ایرانی", "زعفران"], time: "۲۵", portion: "یک نفره", energy: "۸۵۰" },
  { id: "barg", category: "kebab", title: "چلوکباب برگ", english: "BARG KEBAB", image: "barg", price: 595000, tag: "اصیل و خاطره‌انگیز", description: "برش‌های لطیف راسته، مزه‌دارشده با پیاز و زعفران؛ آرام روی زغال، همراه با چلو کره‌ای، ته‌دیگ و لیموی تازه.", ingredients: ["راستهٔ گوساله", "برنج ایرانی", "کره", "لیموترش"], time: "۲۵", portion: "یک نفره", energy: "۷۸۰" },
  { id: "chicken", category: "chicken", title: "جوجه‌کباب زعفرانی", english: "SAFFRON JOOJEH", image: "joojeh", price: 385000, tag: "عطر زعفران ایرانی", description: "تکه‌های آبدار مرغ با زعفران دم‌کرده و آب‌لیموی تازه؛ کباب‌شده روی آتش، همراه چلو، گوجه و سبزی تازه.", ingredients: ["فیلهٔ مرغ", "زعفران", "برنج ایرانی", "گوجهٔ کبابی"], time: "۲۰", portion: "یک نفره", energy: "۶۸۰" },
  { id: "royal", category: "platter", title: "سینی شاهانهٔ قیطران", english: "QE Y TRAN SIGNATURE", image: "royal", price: 1490000, tag: "برای لحظه‌های مشترک", description: "یک سینی از طعم‌های محبوب ایرانی؛ برگ، جوجه و کباب زغالی در کنار برنج زعفرانی و سبزیجات آتش‌دیده. بهانه‌ای برای دور هم بودن.", ingredients: ["کباب برگ", "جوجهٔ زعفرانی", "برنج ایرانی", "سبزیجات کبابی"], time: "۳۵", portion: "دو نفره", energy: "۱۶۵۰" },
  { id: "bakhtiari", category: "kebab", title: "چلوکباب بختیاری", english: "BAKHTIARI KEBAB", image: "bakhtiari", price: 485000, tag: "دو طعم، یک انتخاب", description: "هم‌نشینی تکه‌های گوشت و مرغ زعفرانی روی یک سیخ؛ با برنج معطر، گوجهٔ زغالی و سبزی خوردن.", ingredients: ["گوشت گوساله", "مرغ زعفرانی", "برنج ایرانی", "سبزی تازه"], time: "۳۰", portion: "یک نفره", energy: "۷۶۰" },
  { id: "special-chicken", category: "chicken", title: "جوجهٔ مخصوص قیطران", english: "SIGNATURE JOOJEH", image: "joojeh", price: 425000, tag: "انتخاب محبوب", description: "جوجهٔ زعفرانی با مرینیت مخصوص قیطران و عطر لیمو؛ همراه با برنج ایرانی و دورچین روز سرآشپز.", ingredients: ["مرغ مزه‌دارشده", "زعفران", "لیمو", "برنج ایرانی"], time: "۲۵", portion: "یک نفره", energy: "۷۱۰" },
  { id: "family", category: "platter", title: "سینی دورهمی", english: "FAMILY FEAST", image: "soltani", price: 1280000, tag: "خوشمزه‌تر در کنار هم", description: "چند انتخاب دوست‌داشتنی در یک سینی؛ کباب‌های زغالی با دو پرس چلو زعفرانی و دورچین رنگارنگ برای یک دورهمی صمیمی.", ingredients: ["کباب ترکیبی", "چلو زعفرانی", "گوجه", "فلفل کبابی"], time: "۳۰", portion: "دو نفره", energy: "۱۵۰۰" },
];

const fa = (n: number) => n.toLocaleString("fa-IR");
const imagePath = (name: string) => `/brands/qeytran/${name}.webp`;

function Arrow({ reverse = false }: { reverse?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: reverse ? "rotate(180deg)" : undefined }}><path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function QeytranMenu() {
  const [category, setCategory] = useState("all");
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [direction, setDirection] = useState(1);
  const touch = useRef<number | null>(null);
  const menu = foods.filter(food => category === "all" || food.category === category);
  const current = menu[index % menu.length];

  function move(step: number) {
    setDirection(step);
    setIndex(value => (value + step + menu.length) % menu.length);
    setExpanded(false);
  }

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex(value => (value + 1) % menu.length);
      setExpanded(false);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [autoplay, menu.length]);

  return (
    <main className={styles.page} dir="rtl" lang="fa">
      <div className={styles.grain} aria-hidden="true" />
      <header className={styles.header}>
        <a className={styles.wordmark} href="/qeytran" aria-label="رستوران قیطران"><span className={styles.mark}>ق</span><span>قیطران<small lang="en">QE Y TRAN</small></span></a>
        <span className={styles.headerNote}>ریشه در اصالت، طعمی برای امروز</span>
        <a className={styles.phone} href="tel:021144784"><span>تماس با رستوران</span><b dir="ltr">021 144784</b><span aria-hidden="true">↗</span></a>
      </header>

      <div className={styles.intro}><span className={styles.eyebrow}><i /> از آتش تا سفرهٔ شما</span><h1>طعم اصیل، <em>روایت تازه.</em></h1><p>عطر برنج ایرانی، گرمای زغال و یک انتخاب خوشمزه.</p></div>

      <nav className={styles.categories} aria-label="دسته‌بندی غذاها">
        {categories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} className={category === item.id ? styles.activeCategory : ""} onClick={() => { setCategory(item.id); setIndex(0); setDirection(1); setExpanded(false); }}><span aria-hidden="true">{item.symbol}</span>{item.name}<small>{fa(item.id === "all" ? foods.length : foods.filter(food => food.category === item.id).length)}</small></button>)}
      </nav>

      <section className={styles.experience} aria-label="نمایش غذاها" tabIndex={0} onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); setAutoplay(false); move(event.key === "ArrowLeft" ? 1 : -1); } }}>
        <div className={styles.stage} onPointerDown={event => { touch.current = event.clientX; }} onPointerUp={event => { if (touch.current !== null && Math.abs(event.clientX - touch.current) > 40) { setAutoplay(false); move(event.clientX < touch.current ? 1 : -1); } touch.current = null; }} onPointerCancel={() => { touch.current = null; }}>
          <div className={styles.orbit} aria-hidden="true" /><span className={styles.stageLabel} lang="en">FIRE. SAFFRON. TRADITION.</span>
          <span className={styles.watermark} aria-hidden="true">نوش جان</span>
          <div className={styles.dishes}>
            {menu.map((food, foodIndex) => {
              const offset = (foodIndex - index + menu.length) % menu.length;
              const position = offset === 0 ? "current" : offset === 1 ? "next" : offset === menu.length - 1 ? "previous" : "hidden";
              return <div key={food.id} className={`${styles.dish} ${styles[position]}`} aria-hidden={food.id !== current.id}><Image src={imagePath(food.image)} alt={food.id === current.id ? food.title : ""} width={900} height={900} loading="eager" fetchPriority={foodIndex === 0 ? "high" : "auto"} sizes="(max-width: 700px) 88vw, 560px" draggable={false} /></div>;
            })}
            {menu.length === 2 && <div className={`${styles.dish} ${styles.previous}`} aria-hidden="true"><Image src={imagePath(menu[(index + 1) % menu.length].image)} alt="" width={900} height={900} loading="eager" sizes="(max-width: 700px) 88vw, 560px" draggable={false} /></div>}
          </div>
          <span className={styles.seal} aria-hidden="true">با برنج<br /><b>۱۰۰٪</b><br />ایرانی</span>
          <div className={styles.stageControls}>
            <button type="button" className={styles.arrow} aria-label="غذای قبلی" onClick={() => { setAutoplay(false); move(-1); }}><Arrow /></button>
            <div className={styles.pagination} aria-label="انتخاب غذا">{menu.map((food, i) => <button type="button" key={food.id} aria-label={`نمایش ${food.title}`} aria-pressed={i === index} className={i === index ? styles.selectedDot : ""} onClick={() => { setAutoplay(false); setDirection(i > index ? 1 : -1); setIndex(i); setExpanded(false); }} />)}</div>
            <button type="button" className={styles.arrow} aria-label="غذای بعدی" onClick={() => { setAutoplay(false); move(1); }}><Arrow reverse /></button>
          </div>
          <span className={styles.swipeHint}>برای کشف طعم بعدی، ورق بزنید <span aria-hidden="true">↔</span></span>
        </div>

        <article className={styles.card}>
          <div className={styles.cardTop}><span>انتخابی از آشپزخانهٔ قیطران</span><span><b>{fa(index + 1).padStart(2, "۰")}</b> / {fa(menu.length).padStart(2, "۰")}</span></div>
          <div className={direction > 0 ? styles.contentForward : styles.contentBackward} key={current.id} aria-live="polite" aria-atomic="true">
            <span className={styles.tag}><span aria-hidden="true">✧</span> {current.tag}</span>
            <h2>{current.title}</h2><span className={styles.english} lang="en">{current.english}</span>
            <p className={styles.description}>{current.description}</p>
            <div className={styles.facts}><span><b>{current.portion}</b><small>مناسب برای</small></span><span><b>{current.time} دقیقه</b><small>زمان آماده‌سازی</small></span><span><b>{current.energy}</b><small>کیلوکالری تقریبی</small></span></div>
            <div className={styles.priceRow}><span>قیمت این طعم<small>همراه با چلو و دورچین</small></span><span className={styles.price}>{fa(current.price)} <small>تومان</small></span></div>
          </div>
          <button type="button" className={styles.ingredientsButton} aria-expanded={expanded} aria-controls="qeytran-ingredients" onClick={() => setExpanded(value => !value)}>ترکیبات این غذا <span aria-hidden="true">{expanded ? "−" : "+"}</span></button>
          <div id="qeytran-ingredients" className={styles.ingredients} hidden={!expanded}>{current.ingredients.map(ingredient => <span key={ingredient}>{ingredient}</span>)}</div>
          <span className={styles.demoNote}>منوی نمایشی · قیمت‌ها و اطلاعات نمونه هستند</span>
        </article>
      </section>

      <footer className={styles.footer}><span><span aria-hidden="true">⌖</span> تهران، خیابان سهروردی</span><button type="button" className={styles.autoplay} aria-pressed={autoplay} onClick={() => setAutoplay(value => !value)}><span aria-hidden="true">{autoplay ? "Ⅱ" : "▷"}</span>{autoplay ? "توقف نمایش خودکار" : "پخش خودکار منو"}</button><span className={styles.footerSignature} lang="en">PERSIAN SOUL. CONTEMPORARY TASTE.</span></footer>
    </main>
  );
}
