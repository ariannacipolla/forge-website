'use client';

import React, { useState, useEffect } from 'react';

export default function ConstructionLoader() {
  // Stato per il numero testuale (0 -> 85)
  const [displayNumber, setDisplayNumber] = useState(0);
  // Stato per la larghezza della barra (trigger per CSS)
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const target = 85;
    
    // 1. ANIMAZIONE BARRA (Gestita via CSS per massima fluidità)
    // Ritardo minimo per permettere al browser di renderizzare lo stato iniziale a 0
    const startTimeout = setTimeout(() => {
      setWidth(target);
    }, 100);

    // 2. ANIMAZIONE NUMERO (Contatore leggero)
    // Non serve requestAnimationFrame complesso, basta un intervallo
    // che simula la durata dell'animazione CSS
    let start = 0;
    const duration = 2500; // 2.5 secondi (deve coincidere con duration-2500 nel CSS sotto)
    const startTime = performance.now();

    const updateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutQuart (rallenta alla fine come il tuo codice originale)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      const currentVal = Math.floor(start + (target - start) * easeOut);
      setDisplayNumber(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);

    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <div className="text-white w-[65%] md:w-full max-w-md flex flex-col gap-3 animate-pulse-slow mx-auto">
        
        {/* Testo sopra la barra e Percentuale */}
        <div className="flex justify-between items-end px-1">
            <span className="font-regular text-[10px] md:text-sm uppercase tracking-[0.15em] font-medium opacity-90">
              Stiamo Arrivando...
            </span>
            <span className="font-regular text-xs md:text-base font-mono opacity-90 min-w-[3ch] text-right">
                {displayNumber}%
            </span>
        </div>

        {/* Contenitore Barra */}
        <div className="w-full h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden border border-white/20 backdrop-blur-sm">
            {/* Barra di riempimento 
               - width è controllata da una variabile, ma il movimento è gestito da 'transition-all'
               - duration-1000 è stato aumentato per renderlo fluido
               - ease-out crea l'effetto rallentamento alla fine
            */}
            <div 
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-[2500ms] ease-out"
                style={{ width: `${width}%` }}
            ></div>
        </div>
    </div>
  );
}