"use client";

import { useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";

// AGGANCIO DOLCE ALLE SEZIONI (mobile e desktop) per gli elementi con classe .snap-section.
// Lo scroll-snap CSS spezzava l'inerzia del dito, quindi qui non tocchiamo
// mai il gesto in corso: aspettiamo che lo scroll si fermi da solo e, se ci
// si e' fermati vicino all'inizio di una sezione, scivoliamo fino al bordo.
// Su desktop lo scroll con la rotella e' gestito da Lenis (smoothWheel): lo
// mettiamo in pausa durante il nostro aggancio per evitare che le due
// animazioni si contendano lo scroll nello stesso momento.
export default function useSectionSnap() {
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SETTLE_DELAY = 160; // ms di quiete prima di considerare finito lo scroll
    const THRESHOLD = 0.3; // aggancia solo entro il 30% dell'altezza schermo

    // Ease-in-out: la pagina e' ferma quando parte l'aggancio, quindi si avvia
    // in punta di piedi invece di scattare come lo smooth nativo del browser.
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let frame: number | null = null;
    let isTouching = false;
    let ignoreUntil = 0; // finestra in cui lo scroll e' nostro, non dell'utente
    let lenisStopped = false;

    const clearTimer = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };

    const cancelAnimation = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      ignoreUntil = 0;
      if (lenisStopped) {
        lenis?.start();
        lenisStopped = false;
      }
    };

    // Animiamo noi i frame invece di usare scrollTo({ behavior: "smooth" }):
    // il nativo parte di scatto e non lascia scegliere durata ed easing.
    const glideTo = (to: number, duration: number) => {
      cancelAnimation(); // ferma un aggancio precedente e riavvia Lenis, se serve

      const from = window.scrollY;
      const start = performance.now();

      lenis?.stop();
      lenisStopped = true;
      ignoreUntil = Date.now() + duration * 1000 + 250;

      const step = (now: number) => {
        const t = Math.min((now - start) / (duration * 1000), 1);
        window.scrollTo(0, from + (to - from) * easeInOutCubic(t));
        if (t < 1) {
          frame = requestAnimationFrame(step);
        } else {
          frame = null;
          ignoreUntil = Date.now() + 120;
          lenis?.start();
          lenisStopped = false;
        }
      };

      frame = requestAnimationFrame(step);
    };

    const settle = () => {
      const viewport = window.innerHeight;
      const current = window.scrollY;
      let nearest: number | null = null;

      document.querySelectorAll<HTMLElement>(".snap-section").forEach((el) => {
        const top = el.getBoundingClientRect().top + current;
        const distance = Math.abs(top - current);
        if (distance < 4 || distance > viewport * THRESHOLD) return;
        if (nearest === null || distance < Math.abs(nearest - current)) {
          nearest = top;
        }
      });

      if (nearest === null) return;

      // Piu' e' lontano il bordo, piu' lunga l'animazione: gli aggiustamenti
      // piccoli restano rapidi, quelli lunghi non sembrano uno strappo.
      const distance = Math.abs(nearest - current);
      const duration = 0.6 + (distance / (viewport * THRESHOLD)) * 0.7;

      glideTo(nearest, duration);
    };

    const onScroll = () => {
      if (isTouching || Date.now() < ignoreUntil) return;
      clearTimer();
      timer = setTimeout(settle, SETTLE_DELAY);
    };

    // Un nuovo tocco ha sempre la precedenza: annulla l'aggancio in sospeso.
    const onTouchStart = () => {
      isTouching = true;
      ignoreUntil = 0;
      clearTimer();
      cancelAnimation(); // il gesto dell'utente ha sempre la precedenza
    };
    const onTouchEnd = () => {
      isTouching = false;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      clearTimer();
      cancelAnimation();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [lenis]);
}
