"use client";

import React from "react";
import ConstructionLoader from "./components/ConstructionLoader";
import QuoteSlider from "./components/QuoteSlider";
import {
  FaInstagram,
  FaChevronDown,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Home() {
  const INSTAGRAM_URL = "https://www.instagram.com/__.forge.__";
  const MAPS_URL = "https://maps.app.goo.gl/pMVcdHeBSJVjp6jJ8";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = "about-section";
    const target = document.getElementById(targetId);
    if (!target) return;

    if (window.innerWidth < 768) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    } else {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 2000;
      let startTime: number | null = null;

      const ease = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = ease(progress);

        window.scrollTo(0, startPosition + distance * easeProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };
      requestAnimationFrame(animation);
    }
  };

  return (
    <main className="relative text-white selection:bg-gray-500 selection:text-white">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="#"
        className="fixed inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/background_video.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/30 md:bg-black/20 -z-10"></div>

      {/* === SEZIONE 1: HERO === */}
      <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center px-4">
        
        {/* ICONE SOCIAL/MAPS */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-30 animate-fade-in">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center p-2 md:p-3 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            <FaInstagram className="text-xl md:text-3xl text-gray-300 group-hover:text-white transition-colors duration-300" />
          </a>
        </div>

        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 animate-fade-in">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center p-2 md:p-3 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            <FaMapMarkerAlt className="text-xl md:text-3xl text-gray-300 group-hover:text-white transition-colors duration-300" />
          </a>
        </div>

        {/* CONTENUTO CENTRALE */}
        <div className="text-white relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-16 md:gap-32">
          <div className="text-center flex flex-col items-center animate-fade-in-down w-full">
            <h1 className="font-semibold text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.10em] md:tracking-[0.13em] uppercase truncate px-2">
              FORGE
            </h1>
            <p className="font-medium text-lg sm:text-2xl md:text-3xl text-gray-300 tracking-[0.3em] md:tracking-[0.5em] uppercase border-t border-gray-200 pt-4 mt-2">
              Build Your Strength
            </p>
          </div>
          
          <ConstructionLoader />
        </div>

        {/* SCROLL DOWN INDICATOR */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <a
            href="#about-section"
            onClick={handleScroll}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer p-4"
          >
            <span className="font-regular text-[10px] uppercase tracking-[0.2em] opacity-80">
              Scoprici
            </span>
            <FaChevronDown className="text-2xl" />
          </a>
        </div>
      </section>

      {/* === CONTAINER CONTENUTO === */}
      <div className="w-full min-h-screen flex flex-col bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-neutral-950 to-neutral-950 z-0 pointer-events-none"></div>
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* MODIFICA 1: ALTEZZA SEZIONE
            - min-h-screen: Su mobile forza l'altezza dello schermo intero.
            - md:min-h-0: Su desktop resetta l'altezza per comportarsi come prima (flex-1).
        */}
        <section
          id="about-section"
          className="w-full min-h-screen md:min-h-0 flex-1 relative z-10 flex flex-col items-center justify-center px-4 py-20 md:py-0"
        >
          <div className="max-w-4xl w-full text-center space-y-12 md:space-y-20">
            <h2 className="font-medium text-3xl md:text-6xl font-bold uppercase tracking-tighter text-white drop-shadow-xl px-2">
              La Nostra Visione
            </h2>
            <QuoteSlider />
          </div>
        </section>

        {/* === FOOTER COMPATTO SU MOBILE === */}
        {/* MODIFICA 2: RIDUZIONE SPAZI
            - py-4: Padding verticale ridotto su mobile (era py-8).
            - md:py-6: Padding normale su desktop.
        */}
        <footer className="w-full bg-neutral-900 border-t border-white/5 relative z-20 backdrop-blur-sm pb-safe"> 
          <div className="max-w-7xl mx-auto px-6 py-4 md:py-6">
            
            {/* MODIFICA 3: RIDUZIONE GAP
                - gap-5: Gap ridotto tra i blocchi su mobile (era gap-8).
            */}
            <div className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-0 items-center text-[10px] md:text-xs text-neutral-400 tracking-widest font-medium">
                
                {/* BLOCCO COPYRIGHT (invariato l'ordine visivo) */}
                <div className="flex items-center gap-3 order-3 md:order-1 md:justify-self-start opacity-70 md:opacity-100">
                    <span>© {new Date().getFullYear()} FORGE</span>
                    <span className="text-neutral-700">|</span>
                    <span>P.IVA 12345678901</span>
                </div>

                {/* BLOCCO CENTRALE (Contatti) */}
                {/* gap-1 su mobile per avvicinare le righe */}
                <div className="flex flex-col items-center justify-center gap-1 md:gap-2 order-1 md:order-2 md:justify-self-center w-full">
                    <div className="flex items-center justify-center gap-2 text-neutral-300">
                        <FaMapMarkerAlt className="text-white text-sm mb-[1px]" />
                        <span>Albino (BG), 24021</span>
                    </div>
                    <a href="mailto:info@forgegym.it" className="flex items-center justify-center gap-2 hover:text-white transition-colors p-1 md:p-0">
                        <FaEnvelope className="text-white text-sm mb-[1px]" />
                        <span>info@forgegym.it</span>
                    </a>
                </div>

                {/* BLOCCO SOCIAL */}
                <div className="flex flex-row items-center gap-6 order-2 md:order-3 md:justify-self-end">
                    {/* Ho rimosso il testo "Seguici su Instagram" su mobile per risparmiare spazio verticale */}
                    <a href={INSTAGRAM_URL} target="_blank" className="hover:text-white transition-colors flex items-center gap-2 group p-1">
                        <FaInstagram className="text-lg text-white group-hover:scale-110 transition-transform" />
                    </a>
                    
                    <div className="flex gap-4">
                        <span className="cursor-pointer hover:text-white transition-colors p-1">Privacy</span>
                        <span className="cursor-pointer hover:text-white transition-colors p-1">Cookie</span>
                    </div>
                </div>

            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}