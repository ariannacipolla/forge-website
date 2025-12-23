'use client'; 

import React from 'react';
import ConstructionLoader from './components/ConstructionLoader';
import QuoteSlider from './components/QuoteSlider'; 
import { FaInstagram, FaChevronDown, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; 

export default function Home() {
  
  const INSTAGRAM_URL = "https://www.instagram.com/__.forge.__";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = "about-section";
    const target = document.getElementById(targetId);
    if (!target) return;

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
  };

  return (
    <main className="relative text-white selection:bg-gray-500 selection:text-white">
      
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay loop muted playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/60 -z-10"></div>


      {/* === SEZIONE 1: HERO === */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center">
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30 animate-fade-in">
          <a 
              href={INSTAGRAM_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center p-3 rounded-full border border-gray-600/30 bg-black/20 hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
              <FaInstagram className="text-2xl md:text-3xl text-gray-300 group-hover:text-white transition-colors duration-300" />
          </a>
        </div>

        <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center justify-center gap-24 md:gap-32">
          
          <div className="text-center flex flex-col items-center animate-fade-in-down">
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase drop-shadow-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              FORGE
              </h1>
              <p className="text-xl md:text-3xl text-gray-300 tracking-[0.2em] md:tracking-[0.5em] font-light uppercase border-t border-gray-500 pt-4 mt-2">
              Build Your Strength
              </p>
          </div>
          
          <ConstructionLoader />
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <a 
                href="#about-section"
                onClick={handleScroll}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-80">Scoprici</span>
                <FaChevronDown className="text-2xl" />
            </a>
        </div>
      </section>


      {/* === SEZIONE 2: VISIONE E CITAZIONE === */}
      <section 
        id="about-section"
        className="w-full bg-neutral-950 relative z-10 flex flex-col items-center justify-center px-6 py-32 border-t border-gray-800 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-neutral-950 to-neutral-950 z-0 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 max-w-4xl w-full text-center space-y-20">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-24 drop-shadow-xl">
                La Nostra Visione
            </h2>
            <QuoteSlider />
        </div>
      </section>


      {/* === FOOTER CENTRATO === */}
      <footer className="w-full bg-neutral-950 border-t border-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            
            {/* MODIFICA LAYOUT:
               Uso Flexbox per centrare i due blocchi uno accanto all'altro.
               justify-center: Li porta al centro.
               gap-12 md:gap-32: Mette un bello spazio tra i due gruppi.
            */}
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-32 text-center md:text-left">
                
                {/* 1. BRAND & INFO */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h3 className="text-2xl font-black tracking-tighter uppercase text-white">FORGE</h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs uppercase tracking-widest font-light">
                        build your strength
                    </p>
                    <div className="flex gap-4 mt-2">
                        <a href={INSTAGRAM_URL} target="_blank" className="p-2 bg-gray-900 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                            <FaInstagram />
                        </a>
                        <a href="mailto:info@forgegym.it" className="p-2 bg-gray-900 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>

                {/* 2. CONTATTI & DOVE SIAMO */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 border-b border-gray-800 pb-2 w-full md:w-auto">
                        Dove Siamo
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-center gap-3 justify-center md:justify-start">
                            <FaMapMarkerAlt className="text-gray-600" />
                            <span>Albino (BG) <br/> 24021</span>
                        </li>
                        <li className="flex items-center gap-3 justify-center md:justify-start">
                            <FaPhone className="text-gray-600" />
                            <span>+39 02 123 456 78</span>
                        </li>
                        <li className="flex items-center gap-3 justify-center md:justify-start">
                            <FaEnvelope className="text-gray-600" />
                            <span>info@forgegym.it</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* COPYRIGHT & LEGAL */}
            <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
                <p>&copy; {new Date().getFullYear()} FORGE GYM. Tutti i diritti riservati.</p>
                <div className="flex gap-6">
                    <span className="cursor-pointer hover:text-gray-400 transition-colors">Privacy Policy</span>
                    <span className="cursor-pointer hover:text-gray-400 transition-colors">Cookie Policy</span>
                    <span>P.IVA 12345678901</span>
                </div>
            </div>

        </div>
      </footer>

    </main>
  );
}