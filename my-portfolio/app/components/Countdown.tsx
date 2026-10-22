"use client";

import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string; // Formato ISO, es: "2026-04-04T08:00:00"
}

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

// Cifra a 7 segmenti come i timer da parete delle palestre (viewBox 32x56, spessore 6)
const hSeg = (y: number) => `4,${y} 7,${y - 3} 25,${y - 3} 28,${y} 25,${y + 3} 7,${y + 3}`;
const vSeg = (x: number, y1: number, y2: number) =>
  `${x},${y1} ${x + 3},${y1 + 3} ${x + 3},${y2 - 3} ${x},${y2} ${x - 3},${y2 - 3} ${x - 3},${y1 + 3}`;

const SEGMENTS = {
  a: hSeg(3),
  b: vSeg(29, 4, 27),
  c: vSeg(29, 29, 52),
  d: hSeg(53),
  e: vSeg(3, 29, 52),
  f: vSeg(3, 4, 27),
  g: hSeg(28),
} as const;

const DIGITS = ["abcdef", "bc", "abged", "abgcd", "fgbc", "afgcd", "afgedc", "abc", "abcdefg", "abcdfg"];

function Digit({ value }: { value: number | null }) {
  const lit = value === null ? "" : DIGITS[value];
  return (
    <svg viewBox="0 0 32 56" className="h-full w-auto -skew-x-6" aria-hidden="true">
      {(Object.keys(SEGMENTS) as (keyof typeof SEGMENTS)[]).map((key) => (
        <polygon
          key={key}
          points={SEGMENTS[key]}
          className={lit.includes(key) ? "fill-[#FF4000]" : "fill-white/[0.06]"}
        />
      ))}
    </svg>
  );
}

export default function Countdown({ targetDate }: CountdownProps) {
  // null finche' non siamo nel browser: il display parte "spento" e si accende al primo calcolo
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
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

  const groups = [
    { label: "Giorni", value: timeLeft?.days },
    { label: "Ore", value: timeLeft?.hours },
    { label: "Min", value: timeLeft?.minutes },
    { label: "Sec", value: timeLeft?.seconds },
  ];
  const colonOn = (timeLeft?.seconds ?? 0) % 2 === 0;
  const digitHeight = "h-[min(2.75rem,7dvh)] sm:h-14 md:h-[min(4rem,8dvh)] xl:h-[min(5rem,10dvh)]";

  return (
    <div
      role="timer"
      aria-label={
        timeLeft
          ? `Mancano ${timeLeft.days} giorni, ${timeLeft.hours} ore e ${timeLeft.minutes} minuti`
          : "Countdown"
      }
      className="relative rounded-xl bg-[#0a0a0a] px-5 py-5 sm:px-9 sm:py-8 shadow-[inset_0_2px_14px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06),0_24px_50px_rgba(0,0,0,0.7),0_0_60px_rgba(255,64,0,0.12)]"
    >
      {/* bulloni agli angoli, come le lamiere del logo */}
      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos} w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#a3a3a3,#3a3a3a)]`}
        />
      ))}

      <div className="flex items-start gap-2 sm:gap-4 drop-shadow-[0_0_8px_rgba(255,64,0,0.6)]">
        {groups.map((group, index) => {
          const v = group.value;
          return (
            <React.Fragment key={group.label}>
              <div className="flex flex-col items-center">
                <div className={`flex gap-1 sm:gap-1.5 ${digitHeight}`}>
                  <Digit value={v === undefined ? null : Math.floor(v / 10) % 10} />
                  <Digit value={v === undefined ? null : v % 10} />
                </div>
                <span className="mt-2 sm:mt-3 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">
                  {group.label}
                </span>
              </div>
              {index < groups.length - 1 && (
                <div
                  aria-hidden="true"
                  className={`flex flex-col justify-center gap-2.5 sm:gap-4 ${digitHeight} transition-opacity duration-200 ${
                    colonOn ? "opacity-100" : "opacity-25"
                  }`}
                >
                  <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#FF4000]" />
                  <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#FF4000]" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
