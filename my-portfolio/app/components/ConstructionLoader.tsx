'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function ConstructionLoader() {
  const [progress, setProgress] = useState(0);
  
  // Usiamo un ref per tenere traccia del valore preciso (coi decimali)
  // Questo serve per i calcoli fluidi, mentre lo 'state' aggiorna solo l'interfaccia
  const progressRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const target = 85; 
    const speedFactor = 0.02; // Più è basso (es. 0.02), più è lento. Più è alto (0.1), più è scattante.

    const animate = () => {
      // 1. Calcoliamo la distanza rimanente
      const current = progressRef.current;
      const distance = target - current;

      // 2. Se siamo molto vicini al target, ci fermiamo e arrotondiamo
      if (distance < 0.5) {
        progressRef.current = target;
        setProgress(target);
        return; // Stop animazione
      }

      // 3. Calcolo del passo: ci muoviamo del 5% della distanza rimanente
      // All'inizio la distanza è grande -> passo grande (veloce)
      // Alla fine la distanza è piccola -> passo piccolo (lento)
      const step = distance * speedFactor;
      
      // Aggiorniamo il ref (valore decimale preciso)
      progressRef.current += step;
      
      // Aggiorniamo lo stato (valore intero per l'utente)
      setProgress(Math.floor(progressRef.current));

      // 4. Richiediamo il prossimo frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Ritardo iniziale di 1 secondo
    const startDelay = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 1000);

    // Pulizia quando il componente viene smontato
    return () => {
      clearTimeout(startDelay);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-md flex flex-col gap-3 animate-pulse-slow">
        {/* Testo sopra la barra e Percentuale */}
        <div className="flex justify-between items-end px-1">
            <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-gray-300 font-medium">
              Stiamo Arrivando...
            </span>
            <span className="text-sm md:text-base font-mono text-white">
                {progress}%
            </span>
        </div>

        {/* Contenitore Barra */}
        <div className="w-full h-2 bg-gray-800/80 rounded-full overflow-hidden border border-gray-700/50 backdrop-blur-sm">
            {/* Barra di riempimento */}
            <div 
                className="h-full bg-gradient-to-r from-gray-400 to-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                // Nota: ho rimosso 'transition-all' qui perché l'animazione è gestita via JS frame-by-frame
                // Se lasciassi transition, entrerebbe in conflitto con l'aggiornamento rapido dei frame
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    </div>
  );
}