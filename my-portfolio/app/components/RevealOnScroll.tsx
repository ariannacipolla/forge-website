"use client";

import React, { useState, useEffect, useRef } from "react";

// Avvolgi qualsiasi elemento in <RevealOnScroll> per farlo apparire dolcemente
export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Si anima solo la prima volta che lo vedi
        }
      },
      { threshold: 0.15 }, // Parte quando il 15% dell'elemento è visibile
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
