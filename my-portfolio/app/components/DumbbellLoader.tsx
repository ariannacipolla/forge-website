import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface DumbbellLoaderProps {
  progress: number; 
}

// Funzione di Easing: rende l'animazione più naturale (veloce all'inizio, frena alla fine)
// Simula l'inerzia di un oggetto pesante.
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

const DumbbellLoader: React.FC<DumbbellLoaderProps> = ({ progress }) => {
  const MAX_VISUAL_PERCENTAGE = 85; // Ci fermiamo all'85%
  
  // Stato unico che guida SIA il numero SIA la barra
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Avviamo l'animazione solo se il progresso richiesto è > 0
    if (progress > 0) {
      let startTime: number | null = null;
      const duration = 5000; // 5 secondi totali
      const startValue = 0;
      // Il target reale è il minimo tra quanto passato (es. 100) e il nostro limite visivo (85)
      const targetValue = Math.min(progress, MAX_VISUAL_PERCENTAGE);

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        
        // Calcoliamo quanto tempo è passato (da 0 a 1)
        const runtime = timestamp - startTime;
        const relativeProgress = Math.min(runtime / duration, 1);

        // Applichiamo l'easing al tempo
        const easedProgress = easeOutCubic(relativeProgress);

        // Calcoliamo il valore attuale basato sull'easing
        const currentValue = startValue + (targetValue - startValue) * easedProgress;

        setAnimatedValue(currentValue);

        // Se non è finito il tempo, richiediamo il frame successivo
        if (runtime < duration) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [progress]);

  // Calcolo per il clip-path basato sul valore animato attuale
  const percentageToHide = 100 - animatedValue;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      
      <div className="w-full max-w-[300px] md:max-w-[400px]">
        
        {/* Intestazione: Scritta e Percentuale */}
        <div className="flex justify-between items-end mb-2 px-1 font-mono text-sm md:text-base font-bold tracking-widest">
            <span className="text-stone-400 animate-pulse uppercase">
                Stiamo arrivando...
            </span>
            
            {/* Il numero è formattato senza decimali */}
            <span className="text-white-500 text-lg md:text-xl drop-shadow-md">
                {animatedValue.toFixed(0)}%
            </span>
        </div>

        {/* Container Manubrio */}
        <div className="relative inline-block w-full">
            
            {/* LIVELLO 1: SFONDO (BASE - Grigio scuro/Invertito) */}
            <div 
                className="opacity-30"
                style={{ filter: 'invert(1)' }}
            >
                <Image
                    src="/dumbbell1.svg"
                    alt="Dumbbell base"
                    width={500}
                    height={200}
                    className="w-full h-auto object-contain block"
                    priority
                />
            </div>

            {/* LIVELLO 2: RIEMPIMENTO (Arancione/Luminoso) */}
            {/* NOTA: Ho rimosso 'transition-all' e 'duration' perché ora gestiamo tutto via style inline */}
            <div 
                className="absolute inset-0 will-change-[clip-path]"
                style={{ 
                    clipPath: `inset(0 ${percentageToHide}% 0 0)`,
                    filter: 'invert(1)'
                }}
            >
                <Image
                    src="/dumbbell1.svg"
                    alt="Dumbbell fill"
                    width={500}
                    height={200}
                    className="w-full h-auto object-contain block drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DumbbellLoader;