"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaDumbbell,
  FaInstagram,
  FaTimes,
  FaTrophy,
  FaVenusMars,
} from "react-icons/fa";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import RevealOnScroll from "../components/RevealOnScroll";
import Countdown from "../components/Countdown";
import SiteFooter from "../components/SiteFooter";
import Hero from "./Hero";
import useSectionSnap from "../components/useSectionSnap";

const INSTAGRAM_URL = "https://www.instagram.com/__.forge.__";
const EVENTO_ISO = "2026-11-15T09:00:00";

export default function ForgeGamesPage() {
  useSectionSnap();
  const lenis = useLenis();

  // Scorrimento animato verso la sezione del link: parte piano e rallenta in arrivo
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = e.currentTarget.getAttribute("href")?.slice(1);
    const el = id ? document.getElementById(id) : null;
    if (!el || !lenis) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lenis.scrollTo(el, {
      duration: 1.6,
      easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      immediate: reduceMotion,
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const dettagli = [
    { icon: FaVenusMars, label: "Categorie", lines: ["Maschile", "& Femminile"] },
    { icon: FaDumbbell, label: "Le prove", lines: ["Forza", "Resistenza", "Endurance"] },
    { icon: FaTrophy, label: "Il premio", lines: ["Solo per", "il migliore"] },
  ];

  return (
    <ReactLenis
      root
      options={{ smoothWheel: true, lerp: 0.12, wheelMultiplier: 1.2 }}
    >
      <main className="relative bg-neutral-950 text-white selection:bg-gray-500 selection:text-white">
        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-[300] flex items-center justify-between px-5 py-4 md:px-12 md:py-5">
          <Link
            href="/"
            aria-label="Torna alla home"
            className="group relative block h-8 w-[92px] md:w-[96px] rounded-md overflow-hidden bg-[#FF4000] shadow-[0_0_18px_rgba(255,64,0,0.3),0_6px_16px_rgba(0,0,0,0.5)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_0_26px_rgba(255,64,0,0.5),0_6px_16px_rgba(0,0,0,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {/* in hover la scritta esce a destra e la freccia si allarga a tutto il bottone */}
            <span className="absolute inset-y-0 left-0 w-[30%] flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.31,-0.105,0.43,1.4)] group-hover:w-full">
              <FaArrowLeft className="text-[11px] text-white transition-transform duration-300 ease-[cubic-bezier(0.31,-0.105,0.43,1.4)] group-hover:scale-150" />
            </span>
            <span className="absolute inset-y-0 right-0 w-[70%] flex items-center justify-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 ease-[cubic-bezier(0.31,-0.105,0.43,1.4)] group-hover:translate-x-full group-hover:opacity-0">
              <span className="absolute left-0 top-1/4 h-1/2 w-px bg-white" />
              Home
            </span>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block text-gray-200 hover:text-[#FF4000] transition-all hover:scale-110"
              aria-label="Instagram FORGE"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </header>

        {/* === HERO === */}
        <Hero onNavigate={scrollToSection} />

        {/* === DETTAGLI DELLA COMPETIZIONE === */}
        <section
          id="dettagli"
          className="snap-section relative w-full min-h-[100dvh] flex flex-col bg-neutral-950 pt-[min(5rem,11dvh)] pb-[min(2rem,4dvh)] overflow-hidden"
        >
          <img
            src="/FORGE-2.jpeg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-neutral-950 via-neutral-950/75 to-neutral-950" />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,rgba(255,64,0,0.18),transparent_60%)]" />

          <div className="relative z-10 flex-1 flex flex-col justify-center sm:justify-start">
            <RevealOnScroll className="px-6 text-center">
              <h2 className="font-black uppercase tracking-tight leading-[0.85] text-white text-4xl sm:text-[min(3.75rem,8dvh)] lg:text-[min(4.5rem,9dvh)] 2xl:text-[min(6rem,10.5dvh)] drop-shadow-2xl">
                Come <span className="text-[#FF4000]">funziona</span>
              </h2>
            </RevealOnScroll>

            {/* da sm: titolo in alto e spazio rimanente distribuito in modo uniforme;
                su mobile distanze fisse e blocco centrato, per non lasciare buchi tra gli elementi */}
            <div className="sm:flex-1 flex flex-col justify-evenly gap-y-[min(2.25rem,4.5dvh)] sm:gap-y-[min(2rem,3.5dvh)] pt-[min(2rem,4dvh)] sm:pt-[min(1.5rem,2.5dvh)]">
              {/* niente riquadri: colonne libere separate solo da linee sottili */}
              {/* mobile: voci impilate e sviluppate in orizzontale (icona | testo); da sm: tre colonne */}
              <div className="w-full max-w-6xl mx-auto px-6 sm:px-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
                {dettagli.map((item, index) => (
                  <RevealOnScroll key={item.label} delay={index * 150}>
                    <div className="group flex flex-row sm:flex-col items-center gap-5 sm:gap-0 text-left sm:text-center py-[min(1rem,2.2dvh)] sm:py-0 px-1 sm:px-4 lg:px-8">
                      <span className="w-12 sm:w-auto shrink-0 flex justify-center">
                        <item.icon className="text-[2rem] sm:text-[min(2.25rem,5.5dvh)] xl:text-[min(3rem,6dvh)] text-[#FF4000] drop-shadow-[0_0_24px_rgba(255,64,0,0.55)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                      </span>
                      <div className="flex flex-col sm:items-center">
                        <span className="sm:mt-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-white/60">
                          {item.label}
                        </span>
                        <h3 className="mt-1 sm:mt-2 font-black uppercase tracking-tight leading-[1.05] sm:leading-[0.95] text-white text-lg sm:text-[min(1.5rem,3.6dvh)] lg:text-[min(1.875rem,4.2dvh)] xl:text-[min(2.25rem,4.6dvh)]">
                          {item.lines.map((line) => (
                            <span key={line} className="sm:block">
                              {line}{" "}
                            </span>
                          ))}
                        </h3>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              {/* fascia scorrevole inclinata: il contenuto e' duplicato per un loop senza stacchi */}
              <div className="my-4 sm:my-[min(1.5rem,2.5dvh)] -mx-[5%] w-[110%] -rotate-2 bg-[#FF4000] py-2 sm:py-3 shadow-[0_0_40px_rgba(255,64,0,0.35)] overflow-hidden">
                <div className="flex w-max animate-marquee" aria-hidden="true">
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10 font-black uppercase tracking-tight text-neutral-950 text-xl sm:text-2xl xl:text-[min(1.875rem,4.4dvh)] whitespace-nowrap"
                        >
                          Forza <span className="text-white">•</span> Resistenza{" "}
                          <span className="text-white">•</span> Endurance{" "}
                          <span className="text-white">•</span> Forge Games{" "}
                          <span className="text-white">•</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <RevealOnScroll className="w-full max-w-5xl mx-auto px-4 sm:px-6">
                <div className="flex flex-row items-center justify-center gap-5 sm:gap-10 md:gap-14 text-left">
                  <a
                    href="https://nonsoloburger.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 will-change-transform transition-transform duration-500 hover:scale-105 hover:-rotate-3"
                  >
                    <img
                      src="/non-solo-burger-logo.png"
                      alt="Non Solo Burger"
                      className="h-20 sm:h-[min(6rem,14dvh)] xl:h-[min(7rem,15dvh)] w-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                    />
                  </a>
                  <div className="w-px self-stretch bg-gradient-to-b from-transparent via-[#FF4000] to-transparent" />
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[#FF4000]">
                      Non solo sport
                    </span>
                    <h3 className="mt-1.5 sm:mt-2 font-black uppercase tracking-tight leading-[0.95] text-white text-2xl sm:text-[min(1.875rem,4.6dvh)] lg:text-[min(2.25rem,5.2dvh)] xl:text-[min(3rem,6dvh)]">
                      Si gareggia,
                      <span className="block text-[#FF4000]">poi si mangia</span>
                    </h3>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-300 font-light">
                      I burger di Non Solo Burger di Clusone per atleti e pubblico.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* === MANIFESTO + COUNTDOWN + ISCRIZIONE === */}
        <section
          id="iscrizione"
          className="snap-section relative w-full min-h-[100dvh] flex items-center bg-neutral-950 px-5 sm:px-8 pt-[min(5rem,11dvh)] pb-[min(3rem,5dvh)] overflow-hidden"
        >
          <img
            src="/FORGE-3.jpeg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-30"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-neutral-950 via-neutral-950/70 to-neutral-950" />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,64,0,0.18),transparent_60%)]" />

          {/* da 1280px: testo e pulsante a sinistra, timer a destra; sotto, tutto in colonna */}
          <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[auto_auto] xl:justify-between items-center gap-y-[min(2.5rem,4dvh)] xl:gap-y-8 xl:gap-x-16">
            <RevealOnScroll className="xl:self-end flex justify-center xl:justify-start">
              {/* il titolo decide la larghezza del blocco; il paragrafo (w-0 min-w-full) la segue */}
              <div className="w-fit flex flex-col items-center xl:items-start text-center xl:text-left">
                <h2 className="whitespace-nowrap font-black uppercase tracking-tight leading-[0.95] text-white text-[clamp(2rem,min(10.5vw,6.5dvh),2.6rem)] sm:text-[min(3rem,7dvh)] xl:text-[min(3.75rem,8.5dvh)] drop-shadow-2xl">
                  <span className="block">
                    Mesi di <span className="text-[#FF4000]">sudore</span>,
                  </span>
                  <span className="block">un solo giorno</span>
                </h2>
                <p className="mt-[min(1.25rem,2.5dvh)] w-0 min-w-full text-sm sm:text-base text-neutral-300 font-light leading-snug sm:leading-normal">
                  È il momento di dimostrare a te stesso, e a tutti gli altri, chi sei
                  veramente. Qualunque sia il tuo livello: supera i tuoi limiti, tifa
                  per gli altri, vivi l&apos;adrenalina.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll
              delay={150}
              className="xl:row-span-2 flex flex-col items-center xl:items-end"
            >
              <Countdown targetDate={EVENTO_ISO} />
              <p className="mt-[min(1rem,2dvh)] text-center xl:text-right text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50">
                Domenica 15 novembre · Albino (BG)
              </p>
            </RevealOnScroll>

            <RevealOnScroll
              delay={250}
              className="xl:self-start flex flex-col items-center xl:items-start"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center gap-4 will-change-transform bg-[#FF4000] text-white font-black uppercase tracking-widest rounded-xl py-4 px-8 sm:py-[min(1.25rem,2.6dvh)] sm:px-12 text-base sm:text-xl shadow-[0_0_30px_rgba(255,64,0,0.45),0_8px_20px_rgba(0,0,0,0.5)] transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(255,64,0,0.65),0_8px_20px_rgba(0,0,0,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Iscriviti alla gara
                <FaArrowRight className="text-sm sm:text-base shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="mt-[min(1rem,2dvh)] text-center xl:text-left text-xs sm:text-sm text-white/60">
                Lasciaci i tuoi contatti: ti ricontattiamo noi con tutti i dettagli.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <SiteFooter />

        {/* === MODAL ISCRIZIONE === */}
        <div
          className={`fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${
            isModalOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div
            className={`relative w-full max-w-xl max-h-[90dvh] overflow-y-auto bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/20 transition-transform duration-500 ${
              isModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"
            }`}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-[#FF4000] text-2xl transition-colors p-2"
              aria-label="Chiudi"
            >
              <FaTimes />
            </button>

            <h3 className="text-2xl md:text-3xl font-black text-center text-neutral-900 uppercase tracking-tight mb-2">
              Iscriviti ai <br className="block md:hidden" />
              <span className="text-[#FF4000]">Forge Games</span>
            </h3>
            <p className="text-center text-sm text-neutral-500 mb-6">
              Lasciaci i tuoi recapiti: ti contattiamo noi con tutti i dettagli.
            </p>

            {formStatus === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                  <FaCheck />
                </div>
                <h4 className="text-2xl font-bold text-neutral-900">
                  Iscrizione inviata!
                </h4>
                <p className="text-neutral-600">
                  Ti ricontattiamo al più presto con tutti i dettagli della gara.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 text-[#FF4000] font-bold underline"
                >
                  Chiudi
                </button>
              </div>
            ) : (
              <form
                className="space-y-4 md:space-y-5 text-neutral-900"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus("submitting");

                  const formData = new FormData(e.currentTarget);
                  const data = {
                    nome: formData.get("nome"),
                    cognome: formData.get("cognome"),
                    email: formData.get("email"),
                    prefisso: formData.get("prefisso"),
                    telefono: formData.get("telefono"),
                    categoria: formData.get("categoria"),
                    note: formData.get("note"),
                  };

                  try {
                    const response = await fetch("/api/iscrizione-games", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    });

                    if (response.ok) {
                      setFormStatus("success");
                    } else {
                      setFormStatus("error");
                    }
                  } catch {
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

                <div className="relative flex items-center">
                  <select
                    name="categoria"
                    required
                    defaultValue=""
                    className="w-full bg-neutral-100 border border-neutral-300 rounded-full px-6 pr-10 py-3.5 text-neutral-600 outline-none focus:border-[#FF4000] transition-colors cursor-pointer appearance-none"
                  >
                    <option value="" disabled>
                      Categoria
                    </option>
                    <option value="Maschile">Divisione Maschile</option>
                    <option value="Femminile">Divisione Femminile</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[10px]">
                    ▼
                  </div>
                </div>

                <textarea
                  name="note"
                  placeholder="Note (facoltativo)"
                  rows={2}
                  className="w-full bg-neutral-100 border border-neutral-300 rounded-[1.5rem] px-6 py-4 outline-none resize-none focus:border-[#FF4000] transition-colors"
                />

                {formStatus === "error" && (
                  <p className="text-sm text-center text-red-600 font-medium">
                    Qualcosa è andato storto. Riprova o scrivici a
                    info@forgebuildyourstrength.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full bg-[#FF4000] hover:bg-[#a30000] disabled:bg-neutral-400 text-white font-black py-[1.125rem] rounded-full text-lg md:text-xl uppercase tracking-widest transition-all mt-2"
                >
                  {formStatus === "submitting"
                    ? "Invio in corso..."
                    : "Invia iscrizione"}
                </button>
              </form>
            )}
          </div>
        </div>

        <Analytics />
        <SpeedInsights />
      </main>
    </ReactLenis>
  );
}
