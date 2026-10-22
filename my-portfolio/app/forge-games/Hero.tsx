"use client";

import React from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";

type NavHandler = (e: React.MouseEvent<HTMLAnchorElement>) => void;

// Sequenza d'ingresso (animazioni .intro-* in globals.css), in secondi dall'apertura della pagina:
// buio -> "15" e "11" sbattono a schermo -> il logo cala come un colpo di martello (lampo + scossone)
// -> riga data/luogo -> pulsante -> freccia. Parte solo quando il sipario si e' alzato.
const T = {
  slam15: 0.45,
  dot: 0.8,
  slam11: 0.85,
  forge: 1.55,
  impact: 1.85,
  details: 2.4,
  button: 2.7,
  arrow: 3.3,
};
const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

// will-change-transform tiene il pulsante sempre sul suo livello grafico: senza, all'ingrandimento
// in hover Chrome ridisegna logo e numeri (che hanno un'ombra) e questi sembrano illuminarsi
function SignupLink({ onNavigate }: { onNavigate: NavHandler }) {
  return (
    <a
      href="#iscrizione"
      onClick={onNavigate}
      className="group inline-flex items-center gap-3 will-change-transform bg-[#FF4000] text-white font-black uppercase tracking-widest rounded-xl py-3 px-7 sm:py-[min(1rem,2.2dvh)] sm:px-9 text-sm sm:text-base shadow-[0_0_30px_rgba(255,64,0,0.45),0_8px_20px_rgba(0,0,0,0.5)] transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(255,64,0,0.65),0_8px_20px_rgba(0,0,0,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      Iscriviti subito
      <FaArrowRight className="text-xs sm:text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

// Data gigante bianca solo contornata e inclinata, sopra al logo che la copre in parte.
// Logo e data scalano insieme anche in base all'altezza dello schermo, cosi' stanno sempre in una schermata.
const bigDate =
  "font-black leading-none tracking-tighter whitespace-nowrap text-white/10 [-webkit-text-stroke:2px_rgba(255,255,255,0.85)] drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]";

export default function Hero({ onNavigate }: { onNavigate: NavHandler }) {
  return (
    <section className="snap-section relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-5 pt-24 md:pt-[min(6rem,12dvh)] pb-[min(9rem,20dvh)] md:pb-[min(10rem,15dvh)] overflow-hidden">
      <img
        src="/FORGE-5.jpeg"
        alt=""
        aria-hidden="true"
        className="intro intro-bg absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-black/80 z-[1]" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgba(255,64,0,0.22),transparent_65%)]" />

      {/* lampo arancione all'impatto del logo */}
      <div aria-hidden="true" className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none">
        <div
          className="intro intro-flash w-[90vmin] h-[90vmin] rounded-full bg-[radial-gradient(circle,rgba(255,140,60,0.6),rgba(255,64,0,0.28)_35%,transparent_70%)]"
          style={delay(T.impact)}
        />
      </div>

      <div
        className="intro intro-shake relative z-10 w-full max-w-6xl flex flex-col items-center text-center"
        style={delay(T.impact)}
      >
        <span
          aria-hidden="true"
          className={`-rotate-6 ${bigDate} text-[min(30vw,18dvh)] sm:text-[min(8rem,16dvh)] md:text-[min(13rem,calc(34dvh_-_100px))] -mb-[min(1.75rem,3.5dvh)] md:-mb-[0.25em]`}
        >
          <span className="intro intro-slam inline-block" style={delay(T.slam15)}>
            15
          </span>
          <span className="intro intro-dot inline-block" style={delay(T.dot)}>
            .
          </span>
          <span className="intro intro-slam inline-block" style={delay(T.slam11)}>
            11
          </span>
        </span>

        <h1 className="relative w-full flex justify-center">
          <span className="intro intro-forge relative z-10 flex w-full justify-center" style={delay(T.forge)}>
            <img
              src="/forge-games-logo.webp"
              alt="Forge Games - 1ª Edizione"
              className="w-full drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] max-w-[min(250px,32dvh)] sm:max-w-[min(20rem,40dvh)] md:max-w-[min(30rem,calc(66dvh_-_120px))]"
            />
          </span>
        </h1>

        <p
          className="intro intro-rise mt-[min(2rem,4dvh)] text-white/80 font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[11px] sm:text-sm"
          style={delay(T.details)}
        >
          Domenica 15 novembre 2026{" "}
          <span className="hidden sm:inline text-[#FF4000]">· </span>
          <span className="block sm:inline mt-1 sm:mt-0">Albino (BG)</span>
        </p>
        <div className="intro intro-pop mt-[min(1.75rem,3.5dvh)]" style={delay(T.button)}>
          <SignupLink onNavigate={onNavigate} />
        </div>
      </div>

      <a
        href="#dettagli"
        onClick={onNavigate}
        aria-label="Scorri per scoprire i dettagli"
        className="intro intro-fade absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 p-3"
        style={delay(T.arrow)}
      >
        <FaChevronDown className="text-2xl md:text-3xl text-[#FF4000] animate-scroll-hint" />
      </a>
    </section>
  );
}
