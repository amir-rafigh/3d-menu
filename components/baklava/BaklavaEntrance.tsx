"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./BaklavaEntrance.module.css";

const DISPLAY_DURATION = 1100;
const FADE_DURATION = 180;

export function BaklavaEntrance({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "leaving" | "ready">("loading");
  const busy = phase !== "ready";

  useEffect(() => {
    const fade = window.setTimeout(() => setPhase("leaving"), DISPLAY_DURATION - FADE_DURATION);
    const finish = window.setTimeout(() => {
      setPhase("ready");
    }, DISPLAY_DURATION);

    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(finish);
    };
  }, []);

  return (
    <>
      <div inert={busy} aria-busy={busy}>{children}</div>
      {busy && (
        <div className={styles.overlay} data-leaving={phase === "leaving"}>
          <div className={styles.brand} aria-hidden="true">
            <Image className={styles.mark} src="/brands/baklava/logo/logo-mark.svg" alt="" width={94} height={104} preload />
            <div className={styles.wordmark}>
              <Image src="/brands/baklava/logo/logo-wordmark.svg" alt="" width={180} height={105} preload />
            </div>
          </div>
          <div className={styles.status} role="status" aria-live="polite" aria-atomic="true">
            <span className={styles.spinner} aria-hidden="true" />
            <p>منو دیجیتال</p>
            <span className={styles.srOnly}>قلی‌وند، کافه باقلوا؛ در حال آماده‌سازی منو، لطفاً منتظر بمانید.</span>
          </div>
        </div>
      )}
    </>
  );
}
