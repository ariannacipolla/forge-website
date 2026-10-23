"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { TransitionLink } from "./PageTransitions";
import Countdown from "./Countdown";

const EVENTO_ISO = "2026-11-15T09:00:00";

// Annuncio al centro della prima sezione: il countdown stesso e' il link alla pagina dei Forge Games
export default function PromoProtagonista() {
  return (
    <div className="relative z-10 -mt-[min(6rem,10dvh)] flex flex-col items-center text-center animate-fade-in-delayed">
      <div aria-hidden="true" className="absolute -inset-x-24 -inset-y-16 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75),transparent_70%)]" />
      <img
        src="/forge-games-logo.webp"
        alt="Forge Games - 1ª Edizione"
        className="w-[min(70vw,17rem)] sm:w-[min(20rem,28dvh)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
      />

      <TransitionLink
        href="/forge-games"
        aria-label="Countdown ai Forge Games: vai alla pagina e iscriviti"
        className="group mt-[min(1.25rem,2.5dvh)] flex flex-col items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4000]/70"
      >
        <span className="block scale-90 sm:scale-100 will-change-transform transition-[transform,filter] duration-300 group-hover:scale-95 sm:group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(255,64,0,0.55)] group-active:scale-[0.85] sm:group-active:scale-[0.98]">
          <Countdown targetDate={EVENTO_ISO} digitHeight="h-8 sm:h-[min(3rem,6dvh)]" />
        </span>
        <span className="mt-[min(1rem,2dvh)] inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/70 transition-colors group-hover:text-[#FF4000]">
          <span className="[@media(pointer:coarse)]:hidden">Clicca</span>
          <span className="hidden [@media(pointer:coarse)]:inline">Tocca</span>
          il countdown per iscriverti
          <FaArrowRight className="text-[10px] text-[#FF4000] transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </TransitionLink>
    </div>
  );
}
