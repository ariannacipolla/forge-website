"use client";

import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string; // Formato ISO, es: "2026-04-04T08:00:00"
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsMounted(true); // Previene errori di idratazione in Next.js

    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft(); // Chiamata iniziale
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div className="flex h-24 w-full items-center justify-center text-neutral-500 font-medium tracking-widest uppercase"></div>
    );
  }

  const timeBlocks = [
    { label: "Giorni", value: timeLeft.days },
    { label: "Ore", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto z-10 px-2 md:px-4">
      {/* Testo Inaugurazione */}
      <div className="mb-6 md:mb-12 text-center flex flex-col items-center">
        <span className="text-[#FF4000] text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold mb-2">
          Grande Inaugurazione
        </span>
        <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-wider">
          4 Aprile 2026
        </h2>
      </div>

      {/* Contenitore dei blocchi del Countdown - Aggiunto flex-nowrap e gap ridotto su mobile */}
      <div className="flex flex-nowrap justify-center gap-2 md:gap-8 w-full">
        {timeBlocks.map((block, index) => (
          <div
            key={index}
            // Dimensioni ridotte su mobile (w-16 h-20) per farli stare in riga
            className="flex flex-col items-center justify-center w-16 h-20 md:w-32 md:h-40 relative overflow-hidden group 
    backdrop-blur-xl bg-gradient-to-br from-white/20 via-white/5 to-transparent 
    rounded-2xl md:rounded-3xl border border-white/10 border-t-white/40 border-l-white/30 
    shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.3)]"
          >
            {/* Dimensione dei numeri adattata: text-2xl su mobile */}
            <span className="text-2xl md:text-7xl font-black text-white tracking-tighter z-10 tabular-nums">
              {block.value.toString().padStart(2, "0")}
            </span>

            {/* Dimensione etichette adattata */}
            <span className="text-[8px] md:text-sm font-semibold uppercase tracking-[0.15em] md:tracking-[0.25em] text-neutral-400 mt-1 md:mt-2 z-10">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
