'use client';

import React, { useState, useEffect, useCallback } from 'react';
// 1. Importiamo le icone delle frecce
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const QUOTE_PARTS = [
  "FORGE non nasce per seguire la strada tracciata dagli altri, nasce per chi vuole costruirsi la propria, con il ferro e con la volontà...",
  "...qui dentro siamo tutti allo stesso livello, non ci sono élite, non ci sono favoritismi, c'è solo lavoro e rispetto...",
  "...crediamo nella disciplina che non cede, nell'impegno che non si spezza, nella fratellanza che ti spinge anche quando vuoi mollare...",
  "...ogni persona è benvenuta. NON importa da dove inizi, importa che non smetti...", "...qui non alleni solo il corpo, qui alleni carattere, tenacia, volontà. Ogni goccia di sudore racconta chi sei quando nessuno guarda...", "...FORGE è una fucina, chi entra grezzo esce temperato, chi entra incerto esce consapevole, chi entra da solo trova una squadra...", "...se vuoi il combattimento prendilo, se vuoi la forza costruiscila, se vuoi far parte della leggenda allenati per meritarla."
];

export default function QuoteSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === QUOTE_PARTS.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? QUOTE_PARTS.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, nextSlide]);

  return (
    <div 
      className="w-full max-w-6xl mx-auto mt-12 relative px-12 md:px-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* === FRECCIA SINISTRA (PREV) === */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-neutral-600 hover:text-white transition-colors duration-300 cursor-pointer"
        aria-label="Slide precedente"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* === FRECCIA DESTRA (NEXT) === */}
      <button 
        onClick={nextSlide}
        className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-neutral-600 hover:text-white transition-colors duration-300 cursor-pointer"
        aria-label="Slide successiva"
      >
        <FaChevronRight size={24} />
      </button>

      {/* === SLIDER CONTENT === */}
      <div className="overflow-hidden py-4 cursor-grab active:cursor-grabbing relative z-10">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {QUOTE_PARTS.map((text, index) => (
            <div key={index} className="min-w-full flex flex-col items-center justify-center px-4">
              <p className="text-xl md:text-2xl text-gray-300 font-light text-center leading-relaxed tracking-wide font-regular select-none">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* === DOTS === */}
      <div className="flex justify-center gap-3 mt-8">
        {QUOTE_PARTS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all duration-300 rounded-full ${
              currentIndex === index 
                ? 'w-8 bg-white'     
                : 'w-2 bg-neutral-800 hover:bg-gray-500'
            }`}
            aria-label={`Vai alla parte ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}