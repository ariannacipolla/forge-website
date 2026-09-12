"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaInstagram,
  FaChevronDown,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaCheck,
  FaPhoneAlt,
  FaDumbbell,
  FaSpa,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarCheck,
  FaArrowRight,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaHome,
  FaImages,
  FaInfoCircle,
  FaTags,
} from "react-icons/fa";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Script from "next/script";

import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

// --- NUOVO COMPONENTE DI ANIMAZIONE: REVEAL ON SCROLL ---
// Avvolgi qualsiasi elemento in <RevealOnScroll> per farlo apparire dolcemente
function RevealOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Si anima solo la prima volta che lo vedi
        }
      },
      { threshold: 0.15 }, // Parte quando il 15% dell'elemento è visibile
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
// --------------------------------------------------------

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Accordion "Pacchetti" nel menu mobile: le sotto-voci si aprono solo al tap
  const [isPacchettiOpen, setIsPacchettiOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // Stato per il popup del form
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Richiudi l'accordion "Pacchetti" ogni volta che il menu mobile si chiude
  useEffect(() => {
    if (!isMenuOpen) setIsPacchettiOpen(false);
  }, [isMenuOpen]);

  // Blocca lo scorrimento della pagina quando il popup è aperto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const [activeSection, setActiveSection] = useState("home");

  const [mapCookiesAccepted, setMapCookiesAccepted] = useState(false);

  const [gymSlide, setGymSlide] = useState(0);
  const [spaSlide, setSpaSlide] = useState(0);

  // "position" regola l'inquadratura di ogni singola foto dentro lo slider:
  // e' la classe object-position di Tailwind (object-[X%_Y%]). X = sinistra/
  // destra (0%=bordo sx, 100%=bordo dx), Y = alto/basso (0%=in alto, 100%=in
  // basso). Cambia i numeri foto per foto per sistemare l'inquadratura.
  const gymSlides = [
    { src: "/foto_palestra/IMG_5535.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5536.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5537.JPG", position: "object-[50%_20%]" },
    { src: "/foto_palestra/IMG_5538.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5539.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5540.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5541.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5542.JPG", position: "object-[50%_40%]" },
    { src: "/foto_palestra/IMG_5543.JPG", position: "object-[50%_40%]" },
    { src: "/foto_palestra/IMG_5544.JPG", position: "object-[50%_40%]" },
    { src: "/foto_palestra/IMG_5545.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5546.JPG", position: "object-[50%_60%]" },
    { src: "/foto_palestra/IMG_5547.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5548.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5549.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5550.JPG", position: "object-[50%_50%]" },
    { src: "/foto_palestra/IMG_5551.JPG", position: "object-[50%_30%]" },
    { src: "/foto_palestra/IMG_5552.JPG", position: "object-[50%_50%]" },
  ];

  const spaSlides = [
    { src: "/foto_spa/IMG_5415.jpg", position: "object-[50%_50%]" },
    { src: "/foto_spa/IMG_5416.PNG", position: "object-[50%_50%]" },
    { src: "/foto_spa/IMG_5417.PNG", position: "object-[50%_50%]" },
    { src: "/foto_spa/IMG_5426.jpg", position: "object-[50%_100%]" },
    { src: "/foto_spa/IMG_5433.jpg", position: "object-[50%_50%]" },
    { src: "/foto_spa/IMG_5434.jpg", position: "object-[100%_40%]" },
    { src: "/foto_spa/IMG_5437.jpg", position: "object-[50%_50%]" },
  ];

  const nextGymSlide = () =>
    setGymSlide((prev) => (prev === gymSlides.length - 1 ? 0 : prev + 1));
  const prevGymSlide = () =>
    setGymSlide((prev) => (prev === 0 ? gymSlides.length - 1 : prev - 1));
  const nextSpaSlide = () =>
    setSpaSlide((prev) => (prev === spaSlides.length - 1 ? 0 : prev + 1));
  const prevSpaSlide = () =>
    setSpaSlide((prev) => (prev === 0 ? spaSlides.length - 1 : prev - 1));

  const lenis = useLenis();

  useEffect(() => {
    const handleScrollBg = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScrollBg);
    return () => window.removeEventListener("scroll", handleScrollBg);
  }, []);

  // AGGANCIO DOLCE ALLE SEZIONI (mobile e desktop).
  // Lo scroll-snap CSS spezzava l'inerzia del dito, quindi qui non tocchiamo
  // mai il gesto in corso: aspettiamo che lo scroll si fermi da solo e, se ci
  // si e' fermati vicino all'inizio di una sezione, scivoliamo fino al bordo.
  // Su desktop lo scroll con la rotella e' gestito da Lenis (smoothWheel): lo
  // mettiamo in pausa durante il nostro aggancio per evitare che le due
  // animazioni si contendano lo scroll nello stesso momento.
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

  useEffect(() => {
    // Usiamo un Set per tracciare ogni sezione una sola volta per visita
    const trackedSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);

            // Se la sezione non è ancora stata tracciata, invia l'evento a Vercel
            if (!trackedSections.has(sectionId)) {
              track("Section_Viewed", { section: sectionId });
              trackedSections.add(sectionId); // Segnala come già vista
            }
          }
        });
      },
      { threshold: 0.3 },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const accepted = localStorage.getItem("mapCookiesAccepted");
    if (accepted === "true") {
      setMapCookiesAccepted(true);
    }
  }, []);

  // Autoplay crossfade per lo slider Palestra / Area Benessere
  useEffect(() => {
    if (gymSlides.length < 2) return;
    const timer = setInterval(() => {
      setGymSlide((prev) => (prev === gymSlides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [gymSlides.length]);

  useEffect(() => {
    if (spaSlides.length < 2) return;
    const timer = setInterval(() => {
      setSpaSlide((prev) => (prev === spaSlides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [spaSlides.length]);

  const INSTAGRAM_URL = "https://www.instagram.com/__.forge.__";
  const MAPS_URL = "https://maps.app.goo.gl/Mt5fadnJ5ZYBtykM8";

  // Sotto-sezioni di "Pacchetti": voci del menu a cascata, riutilizzate anche
  // nel menu mobile. Ognuna corrisponde a una <section id="..."> piu' sotto.
  const pacchettiSubItems = [
    { id: "abbonamenti", label: "Abbonamenti" },
    { id: "prova-gratuita", label: "Prova Gratuita" },
    { id: "promo-settembre", label: "Promo Settembre" },
  ];
  const pacchettiSubIds = pacchettiSubItems.map((item) => item.id);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    setIsMenuOpen(false);

    if (lenis) {
      lenis.scrollTo(targetElement, {
        duration: 1.5,
        // Se in futuro vorrai "staccare" un po' la sezione dal menu in alto,
        // puoi aggiungere qui: offset: -80,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAcceptMapCookies = () => {
    localStorage.setItem("mapCookiesAccepted", "true");
    setMapCookiesAccepted(true);
  };

  return (
    <ReactLenis
      root
      options={{ smoothWheel: true, lerp: 0.12, wheelMultiplier: 1.2 }}
    >
      <main className="relative text-white selection:bg-gray-500 selection:text-white">
        {/* VIDEO BACKGROUND HERO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-20 transform-gpu"
        >
          <source src="/background_video.mp4" type="video/mp4" />
        </video>
        <div className="fixed inset-0 bg-black/40 md:bg-black/20 -z-10"></div>

        {/* HEADER NAVBAR */}
        <header
          className={`fixed top-0 left-0 w-full z-[300] flex items-center justify-between px-5 py-3 md:px-12 transition-all duration-300 ${
            isScrolled || isMenuOpen
              ? "bg-black/95 backdrop-blur-xl border-b border-white/10"
              : "bg-transparent"
          }`}
        >
          <div className="z-[310]">
            <span className="font-sports text-2xl md:text-5xl tracking-[0.10em] text-white">
              FORGE
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <ul className="flex gap-8 text-sm uppercase tracking-[0.2em] font-medium text-gray-200">
              {[
                { id: "home", label: "Home" },
                { id: "galleria-section", label: "Galleria" },
                { id: "about-section", label: "Chi siamo" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={handleScroll}
                    className={`transition-colors ${activeSection === item.id ? "text-[#FF4000]" : "hover:text-[#FF4000]"}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              {/* PACCHETTI: menu a cascata (hover su desktop) */}
              <li className="relative group">
                <a
                  href="#abbonamenti"
                  onClick={handleScroll}
                  className={`flex items-center gap-1 transition-colors ${
                    pacchettiSubIds.includes(activeSection)
                      ? "text-[#FF4000]"
                      : "hover:text-[#FF4000]"
                  }`}
                >
                  Pacchetti
                  <FaChevronDown className="text-[9px] transition-transform duration-200 group-hover:rotate-180" />
                </a>

                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200 z-20">
                  <div className="min-w-[190px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1">
                    {pacchettiSubItems.map((sub) => (
                      <a
                        key={sub.id}
                        href={`#${sub.id}`}
                        onClick={handleScroll}
                        className={`block px-4 py-2.5 rounded-xl text-xs tracking-widest normal-case font-medium transition-colors ${
                          activeSection === sub.id
                            ? "text-[#FF4000] bg-white/5"
                            : "text-gray-200 hover:text-[#FF4000] hover:bg-white/5"
                        }`}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              </li>

              <li>
                <a
                  href="#footer-contatti"
                  onClick={handleScroll}
                  className={`transition-colors ${activeSection === "footer-contatti" ? "text-[#FF4000]" : "hover:text-[#FF4000]"}`}
                >
                  Contatti
                </a>
              </li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              className="text-gray-200 hover:text-[#FF4000] transition-all hover:scale-110"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              className="text-gray-200 hover:text-[#FF4000] transition-all hover:scale-110"
            >
              <FaMapMarkerAlt className="text-xl" />
            </a>
          </div>

          {/* Bottone Menu Hamburger */}
          <button
            className="md:hidden z-[310] p-2 text-xl text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>

        {/* Overlay Menu Mobile */}
        <div
          className={`fixed inset-0 bg-neutral-950 transition-all duration-500 ease-in-out z-[250] md:hidden ${
            isMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <nav className="h-full w-full flex flex-col px-6 pt-24 pb-10 overflow-y-auto">
            <ul className="flex flex-col gap-4 w-full">
              {[
                { id: "home", label: "Home", icon: FaHome },
                { id: "galleria-section", label: "Galleria", icon: FaImages },
                { id: "about-section", label: "Chi siamo", icon: FaInfoCircle },
              ].map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li
                    key={item.id}
                    className="transition-all duration-500 ease-out"
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 60 + 100}ms` : "0ms",
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
                    }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={handleScroll}
                      className={`flex items-center gap-4 w-full p-4 rounded-[1.5rem] border transition-colors ${
                        isActive
                          ? "bg-[#FF4000]/10 border-[#FF4000]"
                          : "bg-neutral-900/40 border-white/5 active:border-white/20"
                      }`}
                    >
                      <span
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-lg transition-colors ${
                          isActive
                            ? "bg-[#FF4000] text-white"
                            : "bg-white/5 text-[#FF4000]"
                        }`}
                      >
                        <item.icon />
                      </span>
                      <span
                        className={`text-xl font-black uppercase tracking-tight transition-colors ${
                          isActive ? "text-[#FF4000]" : "text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}

              {/* PACCHETTI: card-accordion, le sotto-voci si aprono solo al tap */}
              <li
                className="transition-all duration-500 ease-out"
                style={{
                  transitionDelay: isMenuOpen ? "280ms" : "0ms",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <div
                  className={`w-full rounded-[1.5rem] border overflow-hidden transition-colors ${
                    pacchettiSubIds.includes(activeSection)
                      ? "bg-[#FF4000]/10 border-[#FF4000]"
                      : "bg-neutral-900/40 border-white/5"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setIsPacchettiOpen((prev) => !prev)}
                    aria-expanded={isPacchettiOpen}
                    className="flex items-center gap-4 w-full p-4"
                  >
                    <span
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-lg transition-colors ${
                        pacchettiSubIds.includes(activeSection)
                          ? "bg-[#FF4000] text-white"
                          : "bg-white/5 text-[#FF4000]"
                      }`}
                    >
                      <FaTags />
                    </span>
                    <span
                      className={`flex-1 text-left text-xl font-black uppercase tracking-tight transition-colors ${
                        pacchettiSubIds.includes(activeSection)
                          ? "text-[#FF4000]"
                          : "text-white"
                      }`}
                    >
                      Pacchetti
                    </span>
                    <FaChevronDown
                      className={`text-base text-neutral-400 shrink-0 transition-transform duration-300 ${isPacchettiOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <ul
                    className={`flex flex-col overflow-hidden transition-all duration-300 ${
                      isPacchettiOpen ? "max-h-52 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {pacchettiSubItems.map((sub) => (
                      <li key={sub.id} className="border-t border-white/5">
                        <a
                          href={`#${sub.id}`}
                          onClick={handleScroll}
                          className={`block py-3 pl-20 pr-4 text-sm uppercase font-bold tracking-widest transition-colors ${
                            activeSection === sub.id
                              ? "text-[#FF4000]"
                              : "text-neutral-400"
                          }`}
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li
                className="transition-all duration-500 ease-out"
                style={{
                  transitionDelay: isMenuOpen ? "340ms" : "0ms",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <a
                  href="#footer-contatti"
                  onClick={handleScroll}
                  className={`flex items-center gap-4 w-full p-4 rounded-[1.5rem] border transition-colors ${
                    activeSection === "footer-contatti"
                      ? "bg-[#FF4000]/10 border-[#FF4000]"
                      : "bg-neutral-900/40 border-white/5 active:border-white/20"
                  }`}
                >
                  <span
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-lg transition-colors ${
                      activeSection === "footer-contatti"
                        ? "bg-[#FF4000] text-white"
                        : "bg-white/5 text-[#FF4000]"
                    }`}
                  >
                    <FaEnvelope />
                  </span>
                  <span
                    className={`text-xl font-black uppercase tracking-tight transition-colors ${
                      activeSection === "footer-contatti"
                        ? "text-[#FF4000]"
                        : "text-white"
                    }`}
                  >
                    Contatti
                  </span>
                </a>
              </li>
            </ul>

            <div
              className="mt-auto pt-10 flex justify-center gap-10 shrink-0 transition-all duration-500 ease-out"
              style={{
                transitionDelay: isMenuOpen ? "400ms" : "0ms",
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                className="text-white text-3xl hover:text-[#FF4000]"
              >
                <FaInstagram />
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                className="text-white text-3xl hover:text-[#FF4000]"
              >
                <FaMapMarkerAlt />
              </a>
            </div>
          </nav>
        </div>

        {/* === SEZIONE 1: HERO === */}
        <section
          id="home"
          className="snap-section relative h-[100dvh] w-full flex flex-col items-center justify-center px-4 overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-full overflow-hidden flex flex-col items-center pb-8 md:pb-12 z-20">
            {/* BADGE PROMO SETTEMBRE CON BORDO SFUMATO */}
            <div className="mb-4 md:mb-8 pointer-events-auto">
              <a
                href="#promo-settembre"
                onClick={handleScroll}
                className="relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-black/50 backdrop-blur-sm text-white font-bold text-sm md:text-base uppercase tracking-widest border border-white/5 hover:border-[#FF4000] transition-all duration-300 hover:bg-[#FF4000]/10 hover:shadow-[0_0_25px_rgba(255,64,0,0.4)] group"
              >
                <span className="group-hover:text-[#FF4000] transition-colors duration-300">
                  Scopri la Promo Settembre
                </span>
              </a>
            </div>

            {/* TITOLO PRINCIPALE */}
            <h1 className="font-black w-full text-center text-[6vw] md:text-[7.6vw] leading-[0.8] tracking-tight text-white uppercase whitespace-nowrap drop-shadow-2xl opacity-0 animate-slide-in-right pointer-events-none select-none">
              BUILD <span className="text-[#FF4000]">YOUR</span> STRENGTH
            </h1>
          </div>
        </section>

        {/* === SEZIONE 2: GALLERIA (Palestra / Area Benessere) === */}
        <section
          id="galleria-section"
          className="snap-section w-full h-[100dvh] max-h-[100dvh] bg-neutral-950 relative flex flex-col md:flex-row overflow-hidden"
        >
          {/* PANNELLO SINISTRO: PALESTRA (slider foto reali) */}
          <div className="relative w-full h-1/2 md:h-full md:w-1/2 overflow-hidden group border-b md:border-b-0 md:border-r border-white/5">
            {gymSlides.map((slide, index) => (
              <div
                key={`gym-${index}`}
                className={`absolute inset-0 transition-opacity duration-1000 ${gymSlide === index ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={slide.src}
                  alt={`Palestra FORGE - foto ${index + 1}`}
                  className={`w-full h-full object-cover ${slide.position} group-hover:scale-105 transition-transform duration-[3000ms]`}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />

            {/* FRECCE: navigazione manuale a piacere, oltre allo scorrimento automatico */}
            <button
              onClick={prevGymSlide}
              aria-label="Foto precedente"
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:text-[#FF4000] transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextGymSlide}
              aria-label="Foto successiva"
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:text-[#FF4000] transition-colors"
            >
              <FaChevronRight />
            </button>

            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-12 lg:p-16 z-10">
              <FaDumbbell className="text-[#FF4000] text-2xl md:text-3xl lg:text-4xl mb-3 drop-shadow-lg" />
              <h3 className="font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-none drop-shadow-2xl">
                Forge
              </h3>
            </div>
          </div>

          {/* PANNELLO DESTRO: AREA BENESSERE (foto in arrivo) */}
          <div className="relative w-full h-1/2 md:h-full md:w-1/2 overflow-hidden group">
            {spaSlides.length > 0 ? (
              spaSlides.map((slide, index) => (
                <div
                  key={`spa-${index}`}
                  className={`absolute inset-0 transition-opacity duration-1000 ${spaSlide === index ? "opacity-100" : "opacity-0"}`}
                >
                  <img
                    src={slide.src}
                    alt={`Area Benessere FORGE - foto ${index + 1}`}
                    className={`w-full h-full object-cover ${slide.position} group-hover:scale-105 transition-transform duration-[3000ms]`}
                  />
                </div>
              ))
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />

            {spaSlides.length === 0 && (
              <span className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-12 md:right-12 z-10 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-300">
                Presto disponibile
              </span>
            )}

            {/* FRECCE: navigazione manuale a piacere, oltre allo scorrimento automatico */}
            {spaSlides.length > 1 && (
              <>
                <button
                  onClick={prevSpaSlide}
                  aria-label="Foto precedente"
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:text-[#FF4000] transition-colors"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextSpaSlide}
                  aria-label="Foto successiva"
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:text-[#FF4000] transition-colors"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-12 lg:p-16 z-10">
              <FaSpa className="text-[#FF4000] text-2xl md:text-3xl lg:text-4xl mb-3 drop-shadow-lg" />
              <h3 className="font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-none drop-shadow-2xl">
                Area Benessere
              </h3>
            </div>
          </div>
        </section>

        {/* === SEZIONE 3: CHI SIAMO === */}
        <section
          id="about-section"
          className="snap-section w-full min-h-[100dvh] md:h-[100dvh] md:max-h-[100dvh] bg-neutral-950 relative border-t border-white/5 pt-16 md:pt-20 pb-4 md:pb-8 flex flex-col md:overflow-hidden"
        >
          {/* FOTO COMMUNITY (singola, banda edge-to-edge per massimizzare lo spazio verticale) */}
          <div className="w-full h-[26vh] sm:h-[34vh] md:h-[52vh] shrink-0 relative overflow-hidden group border-b border-white/5">
            <img
              src="/FORGE-1.jpg"
              alt="Community FORGE durante un allenamento di gruppo"
              className="w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition-transform duration-[2000ms]"
            />
          </div>

          {/* TESTO: STORIA E FONDATORI */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-5 md:pt-8 flex-1 min-h-0 flex flex-col md:flex-row gap-4 md:gap-10 lg:gap-14 items-center w-full">
            {/* ANIMAZIONE TITOLO STORIA */}
            <RevealOnScroll className="w-full md:w-1/4 shrink-0 space-y-3">
              <h2 className="font-black text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-none">
                La Nostra <br className="hidden md:block" />{" "}
                <span className="text-[#FF4000]">Storia</span>
              </h2>

              {/* Nascosto su mobile, visibile su desktop */}
              <div className="hidden md:block w-14 h-1.5 bg-[#FF4000] shadow-[0_0_10px_#FF4000]"></div>

              {/* Nascosto su mobile, visibile su desktop */}
              <p className="hidden md:block text-sm md:text-base text-neutral-300 font-medium uppercase tracking-widest pt-1">
                Come nasce Forge.
              </p>
            </RevealOnScroll>

            {/* CARD DI TESTO: L'idea + I Fondatori, affiancate (non impilate) per restare in un'unica schermata */}
            <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <RevealOnScroll delay={150}>
                <div className="relative h-full bg-neutral-900/40 backdrop-blur-sm p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="absolute top-0 left-6 md:left-8 w-10 md:w-12 h-1 bg-[#FF4000] rounded-b-md shadow-[0_0_8px_#FF4000] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-white font-black text-lg md:text-xl uppercase tracking-wider mb-2 md:mb-3 mt-2">
                    L'idea
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
                    FORGE porta l’allenamento oltre la semplice attività fisica.
                    Fondata su disciplina, costanza e rispetto, è uno spazio
                    senza differenze in cui l'obiettivo comune è diventare la
                    versione migliore di sé stessi. Chi entra da noi non è un
                    semplice cliente, ma parte di una vera community dove il
                    lavoro individuale diventa forza collettiva.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={300}>
                <div className="relative h-full bg-neutral-900/40 backdrop-blur-sm p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="absolute top-0 left-6 md:left-8 w-10 md:w-12 h-1 bg-[#FF4000] rounded-b-md shadow-[0_0_8px_#FF4000] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-white font-black text-lg md:text-xl uppercase tracking-wider mb-2 md:mb-3 mt-2">
                    I Fondatori
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
                    Siamo Antonino, Gabriel ed Emanuele, tre ragazzi uniti dalla
                    passione per l’allenamento e il miglioramento continuo.
                    Unendo le forze abbiamo creato FORGE per trasformare il
                    nostro sogno in realtà. Vogliamo condividere con voi una
                    nuova mentalità basata su disciplina, costanza e rispetto:
                    la vera fucina dove l'impegno prende forma ogni giorno
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* === SEZIONE 4: PACCHETTI > ABBONAMENTI === */}
        <section
          id="abbonamenti"
          className="snap-section w-full h-auto min-h-[100dvh] flex flex-col bg-neutral-950 relative overflow-hidden"
        >
          <img
            src="/FORGE-2.jpeg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
          <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none"></div>

          <div className="relative z-10 w-full flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 py-10 md:px-12 lg:px-0 pt-20 md:pt-18">
            <RevealOnScroll className="space-y-8 lg:space-y-10 pb-16 md:pb-0">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="font-black text-3xl lg:text-7xl text-[#FF4000] tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-none">
                  ABBONAMENTI
                </h2>
                <p className="font-medium text-base lg:text-2xl uppercase tracking-widest text-white drop-shadow-md">
                  scegli la durata più adatta al tuo percorso
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {/* CARD 1: MENSILE */}
                <div className="relative h-full bg-neutral-900/60 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] border-2 border-[#FF4000]/50 hover:border-[#FF4000] transition-colors group flex flex-col shadow-[0_0_30px_rgba(255,64,0,0.15)]">
                  <div className="absolute top-0 left-8 w-12 h-1 bg-[#FF4000] rounded-b-md shadow-[0_0_8px_#FF4000]"></div>

                  <span className="self-start px-3 py-1 rounded-full bg-[#FF4000]/10 border border-[#FF4000]/30 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#FF4000] mb-4">
                    1 mese
                  </span>
                  <FaCalendarDay className="text-[#FF4000] text-2xl lg:text-3xl mb-3" />
                  <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
                    Mensile
                  </h3>
                  <p className="mt-1 text-sm lg:text-base text-neutral-400 font-light">
                    Nessun vincolo, massima libertà
                  </p>

                  <ul className="mt-5 space-y-2 text-neutral-300 text-sm lg:text-base font-light flex-1">
                    <li className="flex items-start gap-2 group/item">
                      <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-sm" />
                      <span className="leading-snug group-hover/item:text-white transition-colors">
                        Accesso completo alla palestra
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-sm" />
                      <span className="leading-snug group-hover/item:text-white transition-colors">
                        Ideale per iniziare senza impegni lunghi
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-sm" />
                      <span className="leading-snug group-hover/item:text-white transition-colors">
                        Rinnovo semplice mese per mese
                      </span>
                    </li>
                  </ul>
                </div>

                {/* CARD 2: TRIMESTRALE */}
                <div className="relative h-full bg-neutral-900/60 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] border-2 border-[#FF4000]/50 hover:border-[#FF4000] transition-colors group flex flex-col shadow-[0_0_30px_rgba(255,64,0,0.15)]">
                  <div className="absolute top-0 left-8 w-12 h-1 bg-[#FF4000] rounded-b-md shadow-[0_0_8px_#FF4000]"></div>

                  <span className="self-start px-3 py-1 rounded-full bg-[#FF4000]/10 border border-[#FF4000]/30 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#FF4000] mb-4">
                    3 mesi
                  </span>
                  <FaCalendarWeek className="text-[#FF4000] text-2xl lg:text-3xl mb-3" />
                  <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
                    Trimestrale
                  </h3>
                  <p className="mt-1 text-sm lg:text-base text-neutral-400 font-light">
                    Il giusto equilibrio per risultati concreti
                  </p>

                  <ul className="mt-5 space-y-2 text-neutral-300 text-sm lg:text-base font-light flex-1">
                    <li className="flex items-start gap-2 group/item">
                      <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-sm" />
                      <span className="leading-snug group-hover/item:text-white transition-colors">
                        Accesso completo alla palestra
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-sm" />
                      <span className="leading-snug group-hover/item:text-white transition-colors">
                        Continuità nella programmazione
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-sm" />
                      <span className="leading-snug group-hover/item:text-white transition-colors">
                        Supporto costante dello staff
                      </span>
                    </li>
                  </ul>
                </div>

                {/* CARD 3: SEMESTRALE */}
                <div className="relative h-full bg-neutral-900/60 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] border-2 border-[#FF4000]/50 hover:border-[#FF4000] transition-colors group flex flex-col shadow-[0_0_30px_rgba(255,64,0,0.15)]">
                  <div className="absolute top-0 left-8 w-12 h-1 bg-[#FF4000] rounded-b-md shadow-[0_0_8px_#FF4000]"></div>

                  <span className="self-start px-3 py-1 rounded-full bg-[#FF4000]/10 border border-[#FF4000]/30 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#FF4000] mb-4">
                    6 mesi
                  </span>
                  <FaCalendarAlt className="text-[#FF4000] text-2xl lg:text-3xl mb-3" />
                  <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
                    Semestrale
                  </h3>
                  <p className="mt-1 text-sm lg:text-base text-neutral-300 font-light">
                    Per chi punta a una trasformazione vera
                  </p>

                  <ul className="mt-5 space-y-2 text-neutral-300 text-sm lg:text-base font-light flex-1">
                    <li className="flex items-start gap-2 group/item">
                      <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-sm" />
                      <span className="leading-snug group-hover/item:text-white transition-colors">
                        Accesso completo alla palestra
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-sm" />
                      <span className="leading-snug group-hover/item:text-white transition-colors">
                        Percorso completo per la trasformazione
                      </span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-sm" />
                      <span className="leading-snug group-hover/item:text-white transition-colors">
                        Accesso prioritario alle masterclass
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center md:justify-start pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-[#FF4000] text-neutral-950 hover:text-white border-2 border-transparent hover:border-[#FF4000] font-black py-3 px-8 md:py-4 md:px-10 rounded-full text-base md:text-xl uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,64,0,0.4)]"
                >
                  Richiedi Info
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* === SEZIONE 5: PACCHETTI > PROVA GRATUITA === */}
        <section
          id="prova-gratuita"
          className="snap-section w-full min-h-[100dvh] flex flex-col md:flex-row justify-center bg-neutral-950 relative border-t border-white/5"
        >
          {/* COLONNA SINISTRA: VIDEO (nascosto su mobile) */}
          <div className="hidden md:block relative w-full md:w-1/2 h-[45vh] md:h-auto overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/offerta_bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 md:bg-black/20 pointer-events-none"></div>
          </div>

          {/* COLONNA DESTRA: DESCRIZIONE + CTA */}
          <div className="relative w-full md:w-1/2 flex flex-col justify-center px-6 pt-20 pb-14 md:px-16 lg:px-20 md:py-12">
            <RevealOnScroll className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#FF4000] shadow-[0_0_8px_#FF4000]"></span>
                <span className="text-[#FF4000] font-bold uppercase tracking-[0.25em] text-xs md:text-sm">
                  Inizia il tuo percorso
                </span>
              </div>

              <h2 className="font-black text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-none mb-6 md:mb-8">
                Prova <span className="text-[#FF4000]">Gratuita</span>
              </h2>

              <p className="text-neutral-300 text-base md:text-lg lg:text-xl font-light leading-relaxed mb-8 md:mb-10">
                Vieni in palestra e lasciati guidare da un coach. Durante la
                tua prima sessione ti mostreremo la struttura, gli attrezzi e
                ti seguiremo nell'allenamento, per farti conoscere al meglio
                il nostro metodo.
              </p>

              <ul className="space-y-4 mb-10 md:mb-12">
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#FF4000]/10 border border-[#FF4000]/30 flex items-center justify-center shrink-0">
                    <FaCheck className="text-[#FF4000] text-xs" />
                  </div>
                  <span className="text-neutral-300 text-sm md:text-base lg:text-lg font-light leading-snug pt-1">
                    Un allenamento guidato da un coach dedicato
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#FF4000]/10 border border-[#FF4000]/30 flex items-center justify-center shrink-0">
                    <FaCheck className="text-[#FF4000] text-xs" />
                  </div>
                  <span className="text-neutral-300 text-sm md:text-base lg:text-lg font-light leading-snug pt-1">
                    Tour della struttura e degli attrezzi
                  </span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#FF4000]/10 border border-[#FF4000]/30 flex items-center justify-center shrink-0">
                    <FaCheck className="text-[#FF4000] text-xs" />
                  </div>
                  <span className="text-neutral-300 text-sm md:text-base lg:text-lg font-light leading-snug pt-1">
                    Nessun impegno: solo per conoscerci
                  </span>
                </li>
              </ul>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 bg-[#FF4000] hover:bg-white text-white hover:text-neutral-950 border-2 border-transparent hover:border-[#FF4000] font-black py-4 px-7 md:py-5 md:px-10 rounded-full text-sm md:text-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(255,64,0,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
              >
                <FaCalendarCheck className="text-base md:text-xl shrink-0" />
                Prenota la Prova Gratuita
                <FaArrowRight className="text-sm md:text-base shrink-0 transition-transform group-hover:translate-x-1" />
              </button>
            </RevealOnScroll>
          </div>
        </section>

        {/* === SEZIONE 6: PACCHETTI > PROMO SETTEMBRE (tipografia gigante + card, diversa dalle altre) === */}
        <section
          id="promo-settembre"
          className="snap-section w-full min-h-[100dvh] flex items-center bg-neutral-950 relative overflow-hidden border-t border-white/5 px-6 py-20"
        >
          {/* Bagliori decorativi di sfondo */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#FF4000]/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF4000]/5 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
            {/* SINISTRA: TITOLO GIGANTE */}
            <RevealOnScroll className="md:col-span-7 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF4000] text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-lg">
                Offerta a tempo limitato
              </span>
              <h2
                className="font-black text-white uppercase leading-[0.85] tracking-tight"
                style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
              >
                Inizia a
                <br />
                <span className="text-[#FF4000]">Settembre</span>
              </h2>
              <p className="mt-6 text-neutral-300 text-sm md:text-base font-medium uppercase tracking-wider max-w-md mx-auto md:mx-0">
                Offerta riservata ai nuovi iscritti, valida solo nel mese di
                settembre.
              </p>
            </RevealOnScroll>

            {/* DESTRA: CARD PREZZI */}
            <RevealOnScroll delay={200} className="md:col-span-5">
              <div className="relative p-8 md:p-10 rounded-[2rem] border border-[#FF4000]/40 bg-neutral-900/60 backdrop-blur-md overflow-hidden shadow-2xl">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 100% 0%, rgba(255,64,0,0.25), transparent 55%)",
                  }}
                ></div>

                <div className="relative z-10">
                  {/* Box Prezzi Promo Settembre */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/60 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center text-center">
                      <span className="text-neutral-400 text-xs md:text-sm uppercase tracking-widest mb-1 font-medium">
                        Tesseramento
                      </span>
                      <span className="text-4xl md:text-5xl text-white font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        20€
                      </span>
                    </div>

                    <div className="bg-black/60 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center text-center">
                      <span className="text-neutral-400 text-xs md:text-sm uppercase tracking-widest mb-1 font-medium">
                        Abbonamento Mensile
                      </span>
                      <span className="text-4xl md:text-5xl text-white font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        35€
                      </span>
                    </div>
                  </div>

                  {/* Vantaggi */}
                  <ul className="grid grid-cols-2 gap-3 text-neutral-300 text-xs md:text-sm font-medium uppercase tracking-wider bg-black/30 p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/5 mb-8">
                    <li className="flex items-center gap-2">
                      <FaCheck className="text-[#FF4000] shrink-0 text-base" />
                      <span>Energia ogni giorno</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheck className="text-[#FF4000] shrink-0 text-base" />
                      <span>Corpo in forma</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheck className="text-[#FF4000] shrink-0 text-base" />
                      <span>Mente focalizzata</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheck className="text-[#FF4000] shrink-0 text-base" />
                      <span>Risultati reali</span>
                    </li>
                  </ul>

                  {/* BOTTONE PER APRIRE IL POPUP */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-white hover:bg-[#FF4000] text-neutral-950 hover:text-white border-2 border-transparent hover:border-[#FF4000] font-black py-4 rounded-full text-base md:text-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,64,0,0.4)]"
                  >
                    Richiedi Info
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* === SEZIONE 7: CONTATTI E FOOTER === */}
        <section
          id="footer-contatti"
          className="snap-section w-full min-h-screen flex flex-col bg-neutral-950 relative pt-10 md:pt-20 border-t border-white/5"
        >
          {/* === CONTATTI === */}
          <div className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-24 flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-stretch">
            {/* ANIMAZIONE CONTATTI (Appare prima la lista a sinistra) */}
            <RevealOnScroll className="w-full md:w-1/2 flex flex-col justify-center space-y-10 lg:space-y-14">
              <div className="space-y-4">
                <h2 className="font-black text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-none">
                  Contattaci
                </h2>
                <div className="w-20 h-1.5 bg-[#FF4000] shadow-[0_0_10px_#FF4000]"></div>
              </div>

              <div className="flex flex-col text-neutral-300 text-lg font-light">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 group cursor-pointer p-4 -ml-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center border border-white/10 group-hover:border-[#FF4000] group-hover:bg-[#FF4000]/10 transition-colors shrink-0">
                    <FaMapMarkerAlt className="text-[#FF4000] text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-[#FF4000] transition-colors">
                      Via Isla, 16
                    </p>
                    <p className="text-sm md:text-base text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      24021 Albino BG
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@forgebuildyourstrength.com"
                  className="flex items-center gap-5 group cursor-pointer p-4 -ml-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center border border-white/10 group-hover:border-[#FF4000] group-hover:bg-[#FF4000]/10 transition-colors shrink-0">
                    <FaEnvelope className="text-[#FF4000] text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium text-white group-hover:text-[#FF4000] transition-colors truncate">
                      Scrivici un'email
                    </p>
                    <p className="text-sm md:text-base text-neutral-400 group-hover:text-neutral-300 transition-colors truncate">
                      info@forgebuildyourstrength.com
                    </p>
                  </div>
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 group cursor-pointer p-4 -ml-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center border border-white/10 group-hover:border-[#FF4000] group-hover:bg-[#FF4000]/10 transition-colors shrink-0">
                    <FaInstagram className="text-[#FF4000] text-2xl group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-[#FF4000] transition-colors">
                      Seguici su Instagram
                    </p>
                    <p className="text-sm md:text-base text-neutral-400 group-hover:text-neutral-300 transition-colors tracking-widest">
                      __.forge.__
                    </p>
                  </div>
                </a>
              </div>
            </RevealOnScroll>

            {/* ANIMAZIONE MAPPA (Appare con 200ms di ritardo) */}
            <RevealOnScroll
              delay={200}
              className="w-full md:w-1/2 min-h-[400px] md:min-h-0 relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group"
            >
              {/* Overlay messaggio cookie - solo se non ancora accettati */}
              {!mapCookiesAccepted && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-900/90 backdrop-blur-md p-6 text-center">
                  <FaMapMarkerAlt className="text-4xl text-[#FF4000] mb-4" />
                  <p className="text-white font-medium mb-4 max-w-xs">
                    Per visualizzare la mappa, accetta i cookie di Google
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAcceptMapCookies}
                      className="bg-[#FF4000] hover:bg-[#a30000] text-white font-bold py-3 px-6 rounded-full transition-colors"
                    >
                      Accetta cookie
                    </button>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white/30 hover:border-white/60 text-white font-bold py-3 px-6 rounded-full transition-colors"
                    >
                      Apri in Maps
                    </a>
                  </div>
                </div>
              )}

              {/* Overlay nero: trasparente su mobile, scuro su desktop (e trasparente all'hover) */}
              <div className="absolute inset-0 bg-transparent md:bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>

              {/* Mappa: colori originali su mobile, desaturata su desktop (e originale all'hover) */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1370.2145543812785!2d9.81374152700306!3d45.77402235125394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47815956ef84704d%3A0x963cea9bf8c1e1cb!2sFORGE!5e1!3m2!1sit!2sit!4v1781173110256!5m2!1sit!2sit"
                className="absolute inset-0 w-full h-full grayscale-0 opacity-100 md:grayscale-[60%] md:opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </RevealOnScroll>
          </div>

          {/* === FOOTER AZIENDALE === */}
          <footer className="w-full bg-neutral-900/50 border-t border-white/5 relative z-20 backdrop-blur-md mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <span className="font-sports text-3xl tracking-[0.10em] text-white">
                    FORGE
                  </span>
                  <div className="space-y-1 text-xs md:text-sm text-neutral-500">
                    <p>
                      <strong className="text-neutral-300 font-medium">
                        Ragione sociale:
                      </strong>{" "}
                      FRG srl
                    </p>
                    <p>
                      <strong className="text-neutral-300 font-medium">
                        Sede legale:
                      </strong>{" "}
                      Via Isla 16, 24021 Albino (BG)
                    </p>
                    <p>
                      <strong className="text-neutral-300 font-medium">
                        P.IVA / C.F.:
                      </strong>{" "}
                      04879900167
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end justify-between h-full space-y-6">
                  <div className="flex items-center gap-6">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      className="text-neutral-400 hover:text-[#FF4000] transition-colors p-2 -m-2"
                    >
                      <FaInstagram className="text-2xl hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href="mailto:info@forgebuildyourstrength.com"
                      className="text-neutral-400 hover:text-[#FF4000] transition-colors p-2 -m-2"
                    >
                      <FaEnvelope className="text-xl hover:scale-110 transition-transform" />
                    </a>
                  </div>

                  {/* Link Legali Iubenda */}
                  <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm font-medium text-neutral-500">
                    <a
                      href="https://www.iubenda.com/privacy-policy/73809111"
                      className="iubenda-nostyle iubenda-noiframe iubenda-embed hover:text-white transition-colors"
                      title="Privacy Policy"
                    >
                      Privacy Policy
                    </a>

                    <a
                      href="https://www.iubenda.com/privacy-policy/73809111/cookie-policy"
                      className="iubenda-nostyle iubenda-noiframe iubenda-embed hover:text-white transition-colors"
                      title="Cookie Policy"
                    >
                      Cookie Policy
                    </a>
                  </div>
                </div>
              </div>

              {/* DISCLAIMER INFORMATIVO (Sostituisce Termini e Condizioni) */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-[10px] md:text-xs leading-relaxed text-neutral-500 font-light max-w-4xl">
                  Le informazioni e le promozioni indicate sul sito hanno scopo
                  puramente illustrativo e non costituiscono proposta
                  contrattuale. L'offerta è soggetta a disponibilità limitata e
                  la sottoscrizione del servizio avviene esclusivamente presso
                  la sede fisica previa verifica dei requisiti.
                </p>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] md:text-xs font-medium tracking-wider text-neutral-600 uppercase">
                <p>
                  © {new Date().getFullYear()} FRG Srl. Tutti i diritti
                  riservati.
                </p>
                <p>
                  Build <span className="text-[#FF4000]">Your</span> Strength
                </p>
              </div>
            </div>
          </footer>
        </section>
        <Script
          src="https://embeds.iubenda.com/widgets/058c2eba-1f08-4980-8ef7-e8f6e2b32379.js"
          strategy="afterInteractive"
        />
        {/* MOTORE POPUP POLICY IUBENDA */}
        <Script
          src="https://cdn.iubenda.com/iubenda.js"
          strategy="lazyOnload"
        />

        {/* === POPUP FORM CONTATTI (MODAL) === */}
        <div
          className={`fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${
            isModalOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          {/* Overlay scuro cliccabile per chiudere */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Contenitore Form */}
          <div
            className={`relative w-full max-w-xl bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/20 transition-transform duration-500 ${
              isModalOpen
                ? "scale-100 translate-y-0"
                : "scale-95 translate-y-10"
            }`}
          >
            {/* Tasto Chiudi (X) */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-[#FF4000] text-2xl transition-colors p-2"
            >
              <FaTimes />
            </button>

            {/* IL TUO FORM ORIGINALE (Leggermente adattato ai colori su sfondo bianco) */}
            <h3 className="text-2xl md:text-3xl font-black text-center text-neutral-900 uppercase tracking-tight mb-6">
              Inviaci una <br className="block md:hidden" />
              <span className="text-[#FF4000]">richiesta</span>
            </h3>

            {formStatus === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                  <FaCheck />
                </div>
                <h4 className="text-2xl font-bold text-neutral-900">
                  Richiesta inviata!
                </h4>
                <p className="text-neutral-600">
                  Ti abbiamo inviato i dettagli via email. A presto!
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-6 text-[#FF4000] font-bold underline"
                >
                  Invia un'altra richiesta
                </button>
              </div>
            ) : (
              <form
                className="space-y-4 md:space-y-5 text-neutral-900"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus("submitting");

                  // 1. Estraiamo i dati dai campi di input del form
                  const formData = new FormData(e.currentTarget);
                  const data = {
                    nome: formData.get("nome"),
                    cognome: formData.get("cognome"),
                    email: formData.get("email"),
                    prefisso: formData.get("prefisso"),
                    telefono: formData.get("telefono"),
                    informazioni: formData.get("informazioni"),
                  };

                  try {
                    // 2. Inviamo i dati alla nostra API Route in JSON
                    const response = await fetch("/api/send", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    });

                    // 3. Gestiamo la risposta
                    if (response.ok) {
                      setFormStatus("success");
                    } else {
                      console.error("Errore dal server");
                      setFormStatus("error");
                    }
                  } catch (error) {
                    console.error("Errore di rete:", error);
                    setFormStatus("error");
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="nome"
                    required
                    placeholder="Nome"
                    className="bg-neutral-100 border border-neutral-300 rounded-full px-6 py-3.5 outline-none focus:border-[#FF4000] transition-colors"
                  />
                  <input
                    type="text"
                    name="cognome"
                    required
                    placeholder="Cognome"
                    className="bg-neutral-100 border border-neutral-300 rounded-full px-6 py-3.5 outline-none focus:border-[#FF4000] transition-colors"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full bg-neutral-100 border border-neutral-300 rounded-full px-6 py-3.5 outline-none focus:border-[#FF4000] transition-colors"
                />

                <div className="flex flex-row gap-2 sm:gap-3">
                  <div className="relative flex items-center shrink-0">
                    <select
                      name="prefisso"
                      className="w-auto bg-neutral-100 border border-neutral-300 rounded-full pl-4 sm:pl-5 pr-8 sm:pr-10 py-3.5 text-sm sm:text-base text-neutral-600 outline-none focus:border-[#FF4000] transition-colors cursor-pointer appearance-none min-w-[100px]"
                      defaultValue="+39"
                    >
                      <option value="+39">+39 (IT)</option>
                      <option value="+41">+41 (CH)</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[10px]">
                      ▼
                    </div>
                  </div>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    placeholder="Telefono"
                    className="flex-1 min-w-0 w-full bg-neutral-100 border border-neutral-300 rounded-full px-4 sm:px-6 py-3.5 text-sm sm:text-base outline-none focus:border-[#FF4000] transition-colors"
                  />
                </div>

                <textarea
                  name="informazioni"
                  required
                  placeholder="Di cosa hai bisogno?"
                  rows={3}
                  className="w-full bg-neutral-100 border border-neutral-300 rounded-[1.5rem] px-6 py-4 outline-none resize-none focus:border-[#FF4000] transition-colors"
                />

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full bg-[#FF4000] hover:bg-[#a30000] disabled:bg-neutral-400 text-white font-black py-[1.125rem] rounded-full text-lg md:text-xl uppercase tracking-widest transition-all mt-2"
                >
                  {formStatus === "submitting"
                    ? "Invio in corso..."
                    : "Invia Richiesta"}
                </button>
              </form>
            )}
          </div>
        </div>

        <Analytics debug={true} mode={"development"} />
        <SpeedInsights />
      </main>
    </ReactLenis>
  );
}
