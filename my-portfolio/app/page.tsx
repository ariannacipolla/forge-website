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
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // Stato per il popup del form
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const [communitySlide, setCommunitySlide] = useState(0);
  const [facilitySlide, setFacilitySlide] = useState(0);

  const communitySlides = [
    { src: "/FORGE-1.jpg", position: "object-[50%_40%]" },
    { src: "/FORGE-2.jpeg", position: "object-[50%_25%]" },
    { src: "/FORGE-3.jpeg", position: "object-[50%_15%]" },
  ];

  const facilitySlides = [
    { src: "/FORGE-4.jpeg", position: "object-center" },
    { src: "/FORGE-5.jpeg", position: "object-[50%_58%]" },
    { src: "/FORGE-6.jpeg" },
  ];

  const lenis = useLenis();

  useEffect(() => {
    const commTimer = setInterval(() => {
      setCommunitySlide((prev) =>
        prev === communitySlides.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    const facTimer = setInterval(() => {
      setFacilitySlide((prev) =>
        prev === facilitySlides.length - 1 ? 0 : prev + 1,
      );
    }, 5500);
    return () => {
      clearInterval(commTimer);
      clearInterval(facTimer);
    };
  }, [communitySlides.length, facilitySlides.length]);

  useEffect(() => {
    const handleScrollBg = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScrollBg);
    return () => window.removeEventListener("scroll", handleScrollBg);
  }, []);

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

  const INSTAGRAM_URL = "https://www.instagram.com/__.forge.__";
  const MAPS_URL = "https://maps.app.goo.gl/24nCLzWAkCVnYkeA8";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    let targetId = href.substring(1);
    if (targetId === "promo-estate" && window.innerWidth >= 768) {
      targetId = "pacchetti";
    }

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
              {["home", "pacchetti", "about-section", "footer-contatti"].map(
                (id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={handleScroll}
                      className={`transition-colors ${activeSection === id ? "text-[#FF4000]" : "hover:text-[#FF4000]"}`}
                    >
                      {id === "about-section"
                        ? "Chi siamo"
                        : id === "footer-contatti"
                          ? "Contatti"
                          : id}
                    </a>
                  </li>
                ),
              )}
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
          <nav className="h-full w-full flex flex-col items-center justify-center px-10">
            <ul className="flex flex-col gap-8 w-full">
              {["home", "pacchetti", "about-section", "footer-contatti"].map(
                (id) => (
                  <li key={id} className="w-full text-center">
                    <a
                      href={`#${id}`}
                      onClick={handleScroll}
                      className={`block text-3xl uppercase font-black tracking-tighter transition-colors ${
                        activeSection === id ? "text-[#FF4000]" : "text-white"
                      }`}
                    >
                      {id === "about-section"
                        ? "Chi siamo"
                        : id === "footer-contatti"
                          ? "Contatti"
                          : id}
                    </a>
                  </li>
                ),
              )}
            </ul>

            <div className="w-12 h-[2px] bg-[#FF4000] my-10 shrink-0"></div>

            <div className="flex justify-center gap-10 shrink-0">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                className="text-white text-4xl hover:text-[#FF4000]"
              >
                <FaInstagram />
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                className="text-white text-4xl hover:text-[#FF4000]"
              >
                <FaMapMarkerAlt />
              </a>
            </div>
          </nav>
        </div>

        {/* === SEZIONE 1: HERO === */}
        <section
          id="home"
          className="relative h-[100dvh] w-full flex flex-col items-center justify-center px-4 overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-full overflow-hidden flex flex-col items-center pb-8 md:pb-12 z-20">
            {/* BADGE PROMO ESTATE CON BORDO SFUMATO */}
            <div className="mb-4 md:mb-8 pointer-events-auto">
              <a
                href="#promo-estate"
                onClick={handleScroll}
                className="relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-black/50 backdrop-blur-sm text-white font-bold text-sm md:text-base uppercase tracking-widest border border-white/5 hover:border-[#FF4000] transition-all duration-300 hover:bg-[#FF4000]/10 hover:shadow-[0_0_25px_rgba(255,64,0,0.4)] group"
              >
                <span className="group-hover:text-[#FF4000] transition-colors duration-300">
                  Scopri la Promo Estate
                </span>
              </a>
            </div>

            {/* TITOLO PRINCIPALE */}
            <h1 className="font-black w-full text-center text-[6vw] md:text-[7.6vw] leading-[0.8] tracking-tight text-white uppercase whitespace-nowrap drop-shadow-2xl opacity-0 animate-slide-in-right pointer-events-none select-none">
              BUILD <span className="text-[#FF4000]">YOUR</span> STRENGTH
            </h1>
          </div>
        </section>

        {/* === SEZIONE 2: pacchetti === */}
        <section
          id="pacchetti"
          className="w-full h-auto min-h-[100dvh] md:h-[100dvh] md:max-h-[100dvh] flex flex-col bg-neutral-950 relative overflow-hidden"
        >
          <div className="absolute inset-0 from-gray-900/40 via-neutral-950 to-neutral-950 z-0 pointer-events-none"></div>
          <div
            className="absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* CONTENITORE PRINCIPALE */}
          <div className="w-full flex-1 flex flex-col md:flex-row relative z-10 pt-14 md:pt-18 h-full">
            {/* COLONNA SINISTRA */}
            <div className="relative flex-1 flex flex-col justify-center px-6 py-10 md:px-12 pt-8 lg:px-16 overflow-hidden min-h-[calc(100dvh-3.5rem)] md:min-h-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/offerta_bg.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/60 z-[5] pointer-events-none"></div>

              {/* ANIMAZIONE A SINISTRA: Testi (Cambiati per Desktop: lg:text-7xl, lg:text-4xl, ecc.) */}
              <RevealOnScroll className="relative z-10 space-y-5 lg:space-y-8 pb-16 md:pb-0">
                <div className="space-y-1">
                  <h2 className="font-black text-3xl lg:text-7xl text-[#FF4000] tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-none">
                    PACCHETTI
                  </h2>
                  <p className="font-medium text-base lg:text-2xl uppercase tracking-widest text-white drop-shadow-md">
                    offriamo molto di più di una semplice palestra
                  </p>
                </div>

                <ul className="space-y-5 lg:space-y-6">
                  <li className="flex items-start gap-4 group">
                    <div className="mt-2 w-3 h-3 rounded-full bg-[#FF4000] shadow-[0_0_12px_#FF4000] shrink-0" />
                    <div className="w-full">
                      <h3 className="text-xl lg:text-4xl font-black text-white uppercase tracking-tight">
                        pacchetti base
                      </h3>
                      <ul className="mt-2 space-y-1.5 lg:space-y-2 text-neutral-300 text-sm lg:text-lg font-light">
                        <li className="flex items-start gap-2 group/item">
                          <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-base" />
                          <span className="leading-snug group-hover/item:text-white transition-colors">
                            Ingresso in palestra
                          </span>
                        </li>
                        <li className="flex items-start gap-2 group/item">
                          <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-base" />
                          <span className="leading-snug group-hover/item:text-white transition-colors">
                            Anamnesi iniziale per capire lo storico allenante
                          </span>
                        </li>
                        <li className="flex items-start gap-2 group/item">
                          <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-base" />
                          <span className="leading-snug group-hover/item:text-white transition-colors">
                            Programmazione bilanciata in base al livello
                          </span>
                        </li>
                        <li className="flex items-start gap-2 group/item">
                          <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-base" />
                          <span className="leading-snug group-hover/item:text-white transition-colors">
                            Masterclass formative
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 group">
                    <div className="mt-2 w-3 h-3 rounded-full bg-[#FF4000] shadow-[0_0_12px_#FF4000] shrink-0" />
                    <div className="w-full">
                      <h3 className="text-xl lg:text-4xl font-black text-white uppercase tracking-tight">
                        pacchetti forge
                      </h3>
                      <ul className="mt-2 space-y-1.5 lg:space-y-2 text-neutral-300 text-sm lg:text-lg font-light">
                        <li className="flex items-start gap-2 group/item">
                          <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-base" />
                          <span className="leading-snug group-hover/item:text-white transition-colors">
                            Ingresso in palestra
                          </span>
                        </li>
                        <li className="flex items-start gap-2 group/item">
                          <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-base" />
                          <span className="leading-snug group-hover/item:text-white transition-colors">
                            Anamnesi approfondita + piano di allenamento +
                            un’ora di coaching a settimana
                          </span>
                        </li>
                        <li className="flex items-start gap-2 group/item">
                          <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-base" />
                          <span className="leading-snug group-hover/item:text-white transition-colors">
                            Nutrizionista con check bimestrale
                          </span>
                        </li>
                        <li className="flex items-start gap-2 group/item">
                          <FaCheck className="text-[#FF4000] mt-1 shrink-0 transition-transform group-hover/item:scale-110 text-xs lg:text-base" />
                          <span className="leading-snug group-hover/item:text-white transition-colors">
                            Accesso a sauna e bagno turco
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </RevealOnScroll>

              {/* INDICATORE SCROLL MOBILE CON FADE-IN (Freccia grigio/bianca come hai messo tu) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden z-20 pointer-events-none animate-fade-in-arrow">
                <div className="flex flex-col items-center gap-1 animate-bounce">
                  <span className="text-[10px] text-white/80 uppercase tracking-[0.3em] font-bold drop-shadow-md">
                    Richiedi Info
                  </span>
                  <FaChevronDown className="text-white/80 drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* COLONNA DESTRA: PROMO ESTATE E BOTTONE INFO */}
            <div
              id="promo-estate"
              className="relative flex-1 flex flex-col items-center justify-center bg-neutral-900 md:bg-transparent px-4 py-4 md:px-16 md:py-12 min-h-[100dvh] md:min-h-0 md:h-full shrink-0 pt-16 md:pt-0"
            >
              <RevealOnScroll
                delay={200}
                className="w-full max-w-xl mx-auto flex flex-col gap-4 md:gap-6"
              >
                {/* BOX PROMO ESTATE (Standalone) */}
                {/* Su mobile padding ridotto a p-5, border-radius ridotto */}
                <div className="relative p-5 sm:p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-[#FF4000]/40 bg-gradient-to-br from-black/80 to-[#FF4000]/10 backdrop-blur-md overflow-hidden shadow-2xl">
                  {/* Effetto Glow di sfondo */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF4000]/20 blur-3xl rounded-full pointer-events-none" />

                  <div className="w-full relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-3 mb-3 md:mb-4">
                      <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white uppercase tracking-tight drop-shadow-md">
                        Promo <span className="text-[#FF4000]">Estate</span>
                      </h3>
                      <span className="text-[9px] md:text-[10px] lg:text-xs font-bold bg-[#FF4000] text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-widest self-start sm:self-center shadow-[0_0_15px_rgba(255,64,0,0.5)] animate-pulse">
                        Tempo Limitato!
                      </span>
                    </div>

                    <p className="text-neutral-300 font-medium text-xs md:text-sm lg:text-base mb-4 md:mb-6 uppercase tracking-wider">
                      Allenati per tutta l'estate senza pensieri.
                    </p>

                    {/* Box Prezzi Sbarrati */}
                    {/* Su mobile gap ridotto e padding interno ridotto */}
                    <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                      <div className="bg-black/60 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-neutral-400 text-[10px] md:text-xs lg:text-sm uppercase tracking-widest mb-1 font-medium">
                          Iscrizione
                        </span>
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-lg md:text-xl lg:text-2xl text-red-500 font-bold line-through decoration-2 opacity-80">
                            40€
                          </span>
                          <span className="text-3xl md:text-4xl lg:text-5xl text-white font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            15€
                          </span>
                        </div>
                        <span className="text-[8px] md:text-[10px] text-[#FF4000] mt-1 uppercase font-bold tracking-wider">
                          (Niente Tessera)
                        </span>
                      </div>

                      <div className="bg-black/60 border border-white/10 rounded-xl md:rounded-2xl p-2 md:p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-neutral-400 text-[10px] md:text-xs lg:text-sm uppercase tracking-widest mb-1 font-medium">
                          Mensile
                        </span>
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-lg md:text-xl lg:text-2xl text-red-500 font-bold line-through decoration-2 opacity-80">
                            54,90€
                          </span>
                          <span className="text-3xl md:text-4xl lg:text-5xl text-white font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            35€
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Vantaggi */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-3 text-neutral-300 text-[10px] md:text-xs lg:text-sm font-medium uppercase tracking-wider bg-black/30 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5">
                      <li className="flex items-center gap-2 md:gap-3">
                        <FaCheck className="text-[#FF4000] shrink-0 text-sm md:text-base" />
                        <span>Energia ogni giorno</span>
                      </li>
                      <li className="flex items-center gap-2 md:gap-3">
                        <FaCheck className="text-[#FF4000] shrink-0 text-sm md:text-base" />
                        <span>Corpo in forma</span>
                      </li>
                      <li className="flex items-center gap-2 md:gap-3">
                        <FaCheck className="text-[#FF4000] shrink-0 text-sm md:text-base" />
                        <span>Mente focalizzata</span>
                      </li>
                      <li className="flex items-center gap-2 md:gap-3">
                        <FaCheck className="text-[#FF4000] shrink-0 text-sm md:text-base" />
                        <span>Risultati reali</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* BOTTONE PER APRIRE IL POPUP */}
                {/* Su mobile padding Y ridotto (py-3 invece di py-4) e testo text-base */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-white hover:bg-[#FF4000] text-neutral-950 hover:text-white border-2 border-transparent hover:border-[#FF4000] font-black py-3 md:py-4 rounded-full text-base md:text-xl uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,64,0,0.4)]"
                >
                  Richiedi Info
                </button>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* === SEZIONE 3: CHI SIAMO === */}
        <section
          id="about-section"
          className="w-full min-h-screen md:min-h-[100dvh] bg-neutral-950 relative pb-10 md:pb-32 border-t border-white/5 pt-15 md:pt-18 flex flex-col"
        >
          {/* SLIDER IMMAGINI (In alto) */}
          {/* === DOPPIO SLIDER IMMAGINI (Community / Struttura) === */}
          <div className="w-full h-[50vh] md:h-[40vh] flex flex-col md:flex-row shrink-0 border-b border-white/5">
            {/* SINISTRA: COMMUNITY */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group">
              {communitySlides.map((slide, index) => (
                <div
                  key={`c-${index}`}
                  className={`absolute inset-0 transition-opacity duration-1000 ${communitySlide === index ? "opacity-100" : "opacity-0"}`}
                >
                  <img
                    src={slide.src}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ${slide.position}`}
                  />
                </div>
              ))}

              {/* NUOVO: Pallini navigazione Community */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {communitySlides.map((_, index) => (
                  <button
                    key={`dot-c-${index}`}
                    onClick={() => setCommunitySlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      communitySlide === index
                        ? "bg-white scale-125" // Pallino attivo (bianco pieno e leggermente più grande)
                        : "bg-white/40 hover:bg-white/70" // Pallino inattivo (semi-trasparente)
                    }`}
                    aria-label={`Vai alla slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* DESTRA: STRUTTURA */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden group border-t md:border-t-0 md:border-l border-black/30">
              {facilitySlides.map((slide, index) => (
                <div
                  key={`f-${index}`}
                  className={`absolute inset-0 transition-opacity duration-1000 ${facilitySlide === index ? "opacity-100" : "opacity-0"}`}
                >
                  <img
                    src={slide.src}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ${slide.position}`}
                  />
                </div>
              ))}

              {/* NUOVO: Pallini navigazione Struttura */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {facilitySlides.map((_, index) => (
                  <button
                    key={`dot-f-${index}`}
                    onClick={() => setFacilitySlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      facilitySlide === index
                        ? "bg-[#FF4000] scale-125" // Pallino attivo (uso l'arancione che avevi prima per coerenza)
                        : "bg-white/40 hover:bg-white/70" // Pallino inattivo
                    }`}
                    aria-label={`Vai alla slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* TESTO DESCRIZIONE: STORIA E FONDATORI */}
          <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-12 lg:px-12 flex-1 flex flex-col md:flex-row gap-2 md:gap-16 lg:gap-20 items-start w-full">
            {/* ANIMAZIONE TITOLO STORIA */}
            <RevealOnScroll className="w-full md:w-1/4 shrink-0 space-y-5">
              <h2 className="font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none">
                La Nostra <br className="hidden md:block" />{" "}
                <span className="text-[#FF4000]">Storia</span>
              </h2>

              {/* Nascosto su mobile, visibile su desktop */}
              <div className="hidden md:block w-16 h-1.5 bg-[#FF4000] shadow-[0_0_10px_#FF4000]"></div>

              {/* Nascosto su mobile, visibile su desktop */}
              <p className="hidden md:block text-base md:text-lg text-neutral-300 font-medium uppercase tracking-widest pt-2">
                Come nasce Forge.
              </p>
            </RevealOnScroll>

            <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* ANIMAZIONE CARD 1: L'idea (Appare prima) */}
              <RevealOnScroll delay={150}>
                <div className="relative h-full bg-neutral-900/40 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="absolute top-0 left-8 w-12 h-1 bg-[#FF4000] rounded-b-md shadow-[0_0_8px_#FF4000] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-white font-black text-2xl uppercase tracking-wider mb-4 mt-2">
                    L'idea
                  </h4>
                  <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
                    FORGE porta l’allenamento oltre la semplice attività fisica.
                    Fondata su disciplina, costanza e rispetto, è uno spazio
                    senza differenze in cui l'obiettivo comune è diventare la
                    versione migliore di sé stessi. Chi entra da noi non è un
                    semplice cliente, ma parte di una vera community dove il
                    lavoro individuale diventa forza collettiva.
                  </p>
                </div>
              </RevealOnScroll>

              {/* ANIMAZIONE CARD 2: I Fondatori (Appare un attimo dopo) */}
              <RevealOnScroll delay={300}>
                <div className="relative h-full bg-neutral-900/40 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="absolute top-0 left-8 w-12 h-1 bg-[#FF4000] rounded-b-md shadow-[0_0_8px_#FF4000] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-white font-black text-2xl uppercase tracking-wider mb-4 mt-2">
                    I Fondatori
                  </h4>
                  <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
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

        {/* === SEZIONE 4: CONTATTI E FOOTER === */}
        <section
          id="footer-contatti"
          className="w-full min-h-screen flex flex-col bg-neutral-950 relative pt-10 md:pt-20 border-t border-white/5"
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
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d596.5875744894458!2d9.8142509!3d45.7739697!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781588e5cd4d803%3A0xfb3526c971441a56!2sVia%20Isla%2C%2016%2C%2024021%20Albino%20BG!5e1!3m2!1sit!2sit!4v1774613232406!5m2!1sit!2sit"
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
                  // logica ...
                  setTimeout(() => setFormStatus("success"), 1000);
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
