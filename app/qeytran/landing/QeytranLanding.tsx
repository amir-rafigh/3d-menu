"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import styles from "./QeytranLanding.module.css";

const plates = [
  { category: "چلوکباب", title: "سلطانی؛ یک قرار باشکوه.", image: "soltani", number: "۰۱", english: "CHARCOAL & TRADITION", text: "برگ لطیف و کوبیدهٔ زغالی، کنار برنجی که عطر زعفرانش زودتر از خودش به میز می‌رسد.", ingredients: ["راستهٔ گوساله", "کوبیدهٔ زغالی", "چلو ایرانی"], price: "۶۸۵٬۰۰۰" },
  { category: "جوجه‌کباب", title: "طلایی، درست مثل خاطره.", image: "joojeh", number: "۰۲", english: "SAFFRON & SUNSHINE", text: "جوجهٔ آبدار با زعفران دم‌کرده و لیموی تازه؛ آرام روی آتش، برای یک ناهار خوش‌طعم.", ingredients: ["مرغ زعفرانی", "گوجهٔ کبابی", "برنج ایرانی"], price: "۳۸۵٬۰۰۰" },
  { category: "سینی‌های مخصوص", title: "بعضی طعم‌ها را باید قسمت کرد.", image: "royal", number: "۰۳", english: "MADE FOR SHARING", text: "یک سینی از کباب‌های دوست‌داشتنی، برنج زعفرانی و سبزیجات زغالی. سهم خوشمزهٔ دورهمی‌های شما.", ingredients: ["ترکیب کباب‌ها", "چلو زعفرانی", "مناسب دو نفر"], price: "۱٬۴۹۰٬۰۰۰" },
];
const questions = [
  { question: "غذاها با چه برنجی سرو می‌شوند؟", answer: "در منوی نمونهٔ قیطران، همهٔ چلوکباب‌ها با برنج ایرانی، زعفران دم‌کرده و دورچین گوجه و فلفل کبابی معرفی شده‌اند." },
  { question: "برای یک دورهمی دونفره چه پیشنهادی دارید؟", answer: "سینی شاهانه را امتحان کنید؛ ترکیبی از کباب‌ها با چلو زعفرانی که برای دو نفر در نظر گرفته شده است. جزئیات و قیمت نمونه را در منوی دیجیتال ببینید." },
  { question: "منوی دیجیتال چطور کار می‌کند؟", answer: "وارد منو شوید، دستهٔ دلخواه را انتخاب کنید و با کشیدن تصویر به چپ یا راست، غذاها را ورق بزنید. تصویر، توضیحات و قیمت هر غذا با هم تغییر می‌کنند." },
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? "M18 18 6 6m0 10V6h10" : "M20 12H4m6-6-6 6 6 6"} /></svg>;
}

export default function QeytranLanding() {
  const [active, setActive] = useState(0);
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const plate = plates[active];
  function sendFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return <div className={styles.page} dir="rtl" lang="fa" id="qeytran-top">
    <a className={styles.skip} href="#main">رفتن به محتوای اصلی</a>
    <header className={styles.header}>
      <a className={styles.brand} href="#qeytran-top" aria-label="قیطران، ابتدای صفحه">قیطران<span lang="en">QE Y TRAN</span></a>
      <nav aria-label="بخش‌های قیطران"><a href="#flavors">طعم‌ها</a><a href="#story">پشت این سفره</a><a href="#find-us">نشانی ما</a></nav>
      <Link className={styles.headerMenu} href="/qeytran">منوی دیجیتال <Arrow diagonal /></Link>
    </header>

    <main id="main">
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroTopline}><span>آشپزخانهٔ ایرانی قیطران</span><span lang="en" dir="ltr">TEHRAN / SOHREVARDI</span></div>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}><span className={styles.heroSmall}>از آن طعم‌هایی که می‌مانند.</span><h1 id="hero-title">اینجا، طعم<br /><em>خاطره</em> دارد<span>.</span></h1><p>کباب روی آتش، برنج تازه‌دم و یک سفرهٔ بی‌تکلف.<br />قیطران، برای تمام لحظه‌هایی که کنار هم خوشمزه‌ترند.</p><Link className={styles.heroCta} href="/qeytran">منو را ورق بزن <Arrow /></Link><span className={styles.heroFootnote}>غذای ایرانی، با حال‌وهوای امروز.</span></div>
          <div className={styles.heroVisual}><span className={styles.heroRing} aria-hidden="true" /><span className={styles.heroBackdrop} aria-hidden="true">نوش<br />جان</span><Image src="/brands/qeytran/soltani.webp" alt="چلوکباب سلطانی قیطران با برنج زعفرانی و کباب زغالی" width={900} height={600} loading="eager" fetchPriority="high" sizes="(max-width: 700px) 110vw, 750px" /><span className={styles.visualCaption}><b>زغال. زعفران. خاطره.</b><span lang="en">THE QEYTRAN WAY</span></span><span className={styles.visualStar} aria-hidden="true">✳</span></div>
        </div>
        <div className={styles.heroBottom}><a href="#flavors">اول، یک انتخاب خوشمزه <span>↓</span></a><span>تهران، خیابان سهروردی <i /> از ۱۲ ظهر تا آخر شب</span></div>
      </section>

      <section className={styles.flavors} id="flavors" aria-labelledby="flavors-title">
        <div className={styles.flavorsHeading}><span className={styles.kicker}>THE FLAVOR INDEX / 01</span><h2 id="flavors-title">امروز، هوسِ <em>چی کردی؟</em></h2><p>از طعم آشنا تا یک سینی برای همه.</p></div>
        <div className={styles.categoryNav} role="tablist" aria-label="دسته‌های غذای منتخب">{plates.map((item, i) => <button key={item.category} type="button" role="tab" aria-selected={active === i} aria-controls="featured-plate" id={`plate-tab-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => { const next = event.key === "ArrowLeft" ? (i + 1) % plates.length : event.key === "ArrowRight" ? (i + plates.length - 1) % plates.length : event.key === "Home" ? 0 : event.key === "End" ? plates.length - 1 : null; if (next !== null) { event.preventDefault(); setActive(next); document.getElementById(`plate-tab-${next}`)?.focus(); } }}><span>{item.number}</span>{item.category}<Arrow /></button>)}</div>
        <div className={styles.featuredPlate} id="featured-plate" role="tabpanel" aria-labelledby={`plate-tab-${active}`}>
          <div className={styles.featuredImage}><span className={styles.plateOutline} aria-hidden="true" />{plates.map((item, i) => <Image key={item.image} src={`/brands/qeytran/${item.image}.webp`} alt={i === active ? item.title : ""} aria-hidden={i !== active} className={i === active ? styles.activePlate : styles.otherPlate} width={900} height={900} sizes="(max-width: 700px) 95vw, 600px" />)}</div>
          <div className={styles.plateCopy} key={plate.image}><span className={styles.plateEnglish} lang="en">{plate.english}</span><h3>{plate.title}</h3><p>{plate.text}</p><div className={styles.ingredients}>{plate.ingredients.map(item => <span key={item}>{item}</span>)}</div><div className={styles.platePrice}><span>{plate.price} <small>تومان</small></span><Link href="/qeytran" aria-label={`مشاهدهٔ ${plate.category} در منو`}><Arrow /></Link></div></div>
        </div><span className={styles.flavorsNote}>انتخاب‌ها و قیمت‌ها برای نمایش دمو هستند.</span>
      </section>

      <section className={styles.story} id="story" aria-labelledby="story-title">
        <div className={styles.storyPhoto}><Image src="/brands/qeytran/landing-hero.webp" alt="جوجه‌کباب، برنج زعفرانی و نان تازه روی میز چوبی" fill sizes="(max-width: 700px) 100vw, 550px" /><span>یک سفره،<br /><b>هزار حرف.</b></span><small lang="en">GOOD FOOD. GOOD COMPANY.</small></div>
        <div className={styles.storyCopy}><span className={styles.kicker}>BEHIND THE TABLE / 02</span><h2 id="story-title">پشت این سفره،<br />یک دلِ <em>خوش‌میزبان</em> است.</h2><p>قصهٔ قیطران از یک سفره شروع شد؛ همان سفره‌هایی که همیشه برای یک نفر بیشتر جا دارند. خواستیم این حس را نگه داریم، با طعم‌هایی که بلدیم و جزئیاتی که دوستشان داریم.</p><p>برای ما، برنج باید عطر داشته باشد، کباب باید تازه از روی زغال برسد و مهمان باید با دلِ خوش از سر میز بلند شود. همین‌قدر ساده، همین‌قدر مهم.</p><div className={styles.storyPrinciples}><span><b>۰۱</b> مواد اولیهٔ خوب</span><span><b>۰۲</b> پخت با حوصله</span><span><b>۰۳</b> میزبانی از دل</span></div><span className={styles.storySignature}>با مهر، قیطران.</span></div>
      </section>

      <section className={styles.questions} aria-labelledby="questions-title"><div><span className={styles.kicker}>A LITTLE MORE / 03</span><h2 id="questions-title">شاید بپرسید<span>…</span></h2><p>چند جواب کوتاه، پیش از اولین لقمه.</p></div><div className={styles.accordion}>{questions.map((item, i) => <details key={item.question} name="qeytran-faq" open={i === 0}><summary><span>{item.question}</span><span className={styles.plus} aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

      <section className={styles.visit} id="find-us" aria-labelledby="visit-title"><div className={styles.visitHeading}><span className={styles.kicker}>COME SAY SALAM / 04</span><h2 id="visit-title">قرارمان،<br /><em>سهروردی.</em></h2><p>برای ناهار، شام یا یک «دلم کباب می‌خواهد» ساده.</p><a className={styles.bigPhone} href="tel:021144784" dir="ltr">021 144784 <Arrow diagonal /></a></div><div className={styles.visitInfo}><span className={styles.locationIndex} aria-hidden="true">⌖</span><div><h3>همین حوالی، در قلب تهران</h3><p>تهران، خیابان سهروردی<br />نبش کوچهٔ بهار، پلاک ۲۴</p><a className={styles.mapLink} href="https://www.google.com/maps/search/?api=1&query=Tehran+Sohrevardi+Street" target="_blank" rel="noreferrer">خیابان سهروردی روی نقشه <Arrow diagonal /></a></div><dl className={styles.hours}><div><dt>شنبه تا چهارشنبه</dt><dd>۱۲:۰۰ — ۲۳:۰۰</dd></div><div><dt>پنجشنبه و جمعه</dt><dd>۱۲:۰۰ — ۲۴:۰۰</dd></div></dl><small>نشانی تکمیلی، ساعت‌ها و شماره تماس نمایشی هستند.</small></div></section>

      <section className={styles.feedback} aria-labelledby="feedback-title"><div><span className={styles.kicker}>YOUR SIDE OF THE TABLE / 05</span><h2 id="feedback-title">این بار،<br /><em>شما بگویید.</em></h2><p>از طعم‌ها، از حس میز، از چیزی که می‌تواند بهتر شود.<br />جای حرف شما اینجاست.</p></div>{sent ? <div className={styles.feedbackResult} role="status"><span aria-hidden="true">✳</span><h3>حرفتان به دل نشست.</h3><p>نظر شما در این پیش‌نمایش دریافت شد؛ چیزی ذخیره یا ارسال نشده است.</p><button type="button" onClick={() => setSent(false)}>یک نظر دیگر <Arrow /></button></div> : <form onSubmit={sendFeedback} className={styles.feedbackForm}><fieldset><legend>به این تجربه چند ستاره می‌دهید؟</legend><div className={styles.stars} dir="ltr">{[1, 2, 3, 4, 5].map(value => <label key={value} data-filled={value <= rating}><input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} aria-label={`${value.toLocaleString("fa-IR")} از ۵ ستاره`} /><span aria-hidden="true">★</span></label>)}</div></fieldset><label htmlFor="qeytran-feedback">روایت شما از قیطران<textarea id="qeytran-feedback" name="message" rows={3} minLength={3} maxLength={1000} required defaultValue="عطر زعفران، طعم کباب و یک دورهمی خوش؛ دوست داریم دوباره به قیطران بیاییم." /></label><div className={styles.feedbackActions}><small>فرم نمایشی است؛ اطلاعات ارسال نمی‌شود.</small><button type="submit">ثبت نظر نمایشی <Arrow /></button></div></form>}</section>
    </main>

    <footer className={styles.footer}><div className={styles.footerTop}><a href="#qeytran-top">قیطران<span lang="en">PERSIAN SOUL. CONTEMPORARY TASTE.</span></a><Link href="/qeytran">هنوز انتخاب نکردی؟<b>بریم سراغ منو <Arrow /></b></Link></div><div className={styles.footerBottom}><span>تمام اطلاعات این صفحه نمونه و برای ارائهٔ دمو هستند.</span><a href="#qeytran-top">برگشت به بالا ↑</a></div></footer>
  </div>;
}