"use client";

import React from "react";
import { FaArrowRight, FaExternalLinkAlt, FaInstagram, FaMapMarkerAlt, FaRegEnvelope } from "react-icons/fa";
import RevealOnScroll from "./RevealOnScroll";

const INSTAGRAM_URL = "https://www.instagram.com/__.forge.__";
const MAPS_URL = "https://maps.app.goo.gl/Mt5fadnJ5ZYBtykM8";
const EMAIL = "info@forgebuildyourstrength.com";
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1370.2145543812785!2d9.81374152700306!3d45.77402235125394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47815956ef84704d%3A0x963cea9bf8c1e1cb!2sFORGE!5e1!3m2!1sit!2sit!4v1781173110256!5m2!1sit!2sit";

const label = "text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em]";

// angoli arancioni "a mirino" attorno alla mappa
const corners = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
];

// Sezione Contatti: titolo grande in alto, a sinistra i contatti separati da linee sottili,
// a destra la mappa a colori inquadrata dagli angoli arancioni. Sta sempre in una schermata.
export default function ContactSection({
  onOpenForm,
  mapCookiesAccepted,
  onAcceptMapCookies,
}: {
  onOpenForm: () => void;
  mapCookiesAccepted: boolean;
  onAcceptMapCookies: () => void;
}) {
  const items = [
    { icon: FaMapMarkerAlt, label: "Dove", main: "Via Isla, 16", sub: "24021 Albino (BG)", href: MAPS_URL, external: true },
    { icon: FaRegEnvelope, label: "Scrivici", main: "Una mail", sub: EMAIL, href: `mailto:${EMAIL}`, external: false },
    { icon: FaInstagram, label: "Seguici", main: "Instagram", sub: "@__.forge.__", href: INSTAGRAM_URL, external: true },
  ];

  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20 md:pt-24 pb-[min(3rem,5dvh)]">
      <img src="/FORGE-6.jpeg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/75 to-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,64,0,0.18),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <RevealOnScroll className="text-center">
          <h2 className="font-black uppercase tracking-tight leading-[0.85] text-white text-[min(3rem,6.5dvh)] sm:text-[min(4.5rem,8.5dvh)] lg:text-[min(6rem,9.5dvh)] drop-shadow-2xl">
            Passa a <span className="text-[#FF4000]">trovarci</span>
          </h2>
          <p className={`mt-[min(1rem,2dvh)] ${label} text-white/50 [@media(max-height:700px)]:hidden`}>
            Ti aspettiamo in palestra ad Albino
          </p>
        </RevealOnScroll>

        <div className="mt-[min(2rem,3dvh)] md:mt-[min(3.5rem,6dvh)] grid grid-cols-1 md:grid-cols-12 items-center gap-y-[min(1.75rem,2.5dvh)] md:gap-x-10 lg:gap-x-16">
          {/* CONTATTI */}
          <RevealOnScroll className="md:col-span-5 flex flex-col items-center md:items-start">
            <div className="w-full divide-y divide-white/15 border-y border-white/15">
              {items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 py-[min(1rem,1.2dvh)] md:py-[min(1.25rem,2.2dvh)]"
                >
                  <span className="w-10 shrink-0 flex justify-center">
                    <it.icon className="text-2xl md:text-[min(2rem,4dvh)] text-[#FF4000] drop-shadow-[0_0_20px_rgba(255,64,0,0.5)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                  </span>
                  <span className="flex-1 min-w-0 flex flex-col">
                    <span className={`${label} text-white/50`}>{it.label}</span>
                    <span className="mt-0.5 font-black uppercase tracking-tight leading-tight text-white text-base sm:text-lg lg:text-[min(1.5rem,3.2dvh)] transition-colors group-hover:text-[#FF4000]">
                      {it.main}
                    </span>
                    <span className="truncate text-xs sm:text-sm text-neutral-400">{it.sub}</span>
                  </span>
                  <FaArrowRight className="shrink-0 text-xs text-white/25 transition-all duration-300 group-hover:text-[#FF4000] group-hover:translate-x-1" />
                </a>
              ))}
            </div>

            <button
              onClick={onOpenForm}
              className="group mt-[min(1.75rem,2.5dvh)] md:mt-[min(2.5rem,4.5dvh)] inline-flex items-center gap-3 will-change-transform bg-[#FF4000] text-white font-black uppercase tracking-widest rounded-xl py-[min(1rem,2dvh)] px-8 text-sm sm:text-base shadow-[0_0_30px_rgba(255,64,0,0.4),0_8px_20px_rgba(0,0,0,0.5)] transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(255,64,0,0.6),0_8px_20px_rgba(0,0,0,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Inviaci una richiesta
              <FaArrowRight className="text-xs sm:text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </RevealOnScroll>

          {/* MAPPA a colori, inquadrata dagli angoli arancioni */}
          <RevealOnScroll delay={200} className="md:col-span-7">
            <div className="relative p-2 sm:p-3">
              {corners.map((c) => (
                <span key={c} aria-hidden="true" className={`absolute ${c} w-6 h-6 sm:w-8 sm:h-8 border-[#FF4000] drop-shadow-[0_0_8px_rgba(255,64,0,0.7)]`} />
              ))}
              <div className="relative h-[min(15rem,21dvh)] md:h-[min(28rem,46dvh)] overflow-hidden bg-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(255,64,0,0.12)]">
                {mapCookiesAccepted ? (
                  <>
                    {/* fondo di riserva: resta visibile se il banner cookie (iubenda) blocca ancora la mappa */}
                    <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                      <img src="/FORGE-4.jpeg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-25" />
                      <p className="relative max-w-xs text-xs sm:text-sm text-neutral-300">
                        La mappa compare dopo aver accettato i cookie dal banner del sito.
                      </p>
                    </div>
                    <iframe
                      src={MAP_EMBED}
                      title="Mappa FORGE - Via Isla 16, Albino"
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-[min(1rem,2dvh)] px-6 text-center">
                    <img src="/FORGE-4.jpeg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-25" />
                    <FaMapMarkerAlt className="relative text-3xl text-[#FF4000] drop-shadow-[0_0_24px_rgba(255,64,0,0.6)]" />
                    <p className="relative max-w-xs text-xs sm:text-sm text-neutral-300">
                      Per vedere la mappa serve il consenso ai cookie di Google.
                    </p>
                    <div className="relative flex gap-3">
                      <button
                        onClick={onAcceptMapCookies}
                        className="rounded-xl bg-white px-4 sm:px-5 py-2.5 text-[11px] sm:text-sm font-black uppercase tracking-widest text-neutral-950 transition-colors hover:bg-[#FF4000] hover:text-white"
                      >
                        Mostra la mappa
                      </button>
                      <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 sm:px-5 py-2.5 text-[11px] sm:text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-[#FF4000] hover:text-[#FF4000]"
                      >
                        Apri in Maps
                        <FaExternalLinkAlt className="text-[9px] opacity-60" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
