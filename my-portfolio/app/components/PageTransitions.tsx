"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Transizione "sipario" tra home e Forge Games: un pannello sale, mostra il logo della
// pagina di destinazione, la pagina cambia dietro e il pannello esce verso l'alto.
type Phase = "idle" | "cover" | "reveal";

const COVER_MS = 600; // salita del sipario
const HOLD_MS = 250; // pausa a sipario chiuso, con la pagina nuova gia' montata
const REVEAL_MS = 650; // uscita verso l'alto

const TransitionContext = createContext<(href: string) => void>(() => {});

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [target, setTarget] = useState<"games" | "home">("games");
  const pending = useRef(false);

  const navigate = useCallback(
    (href: string) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      setTarget(href.startsWith("/forge-games") ? "games" : "home");
      setPhase("cover");
      pending.current = true;
      setTimeout(() => router.push(href), COVER_MS);
    },
    [router],
  );

  // nuova pagina montata: dopo una breve pausa il sipario si alza
  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    const open = setTimeout(() => setPhase("reveal"), HOLD_MS);
    const done = setTimeout(() => setPhase("idle"), HOLD_MS + REVEAL_MS);
    return () => {
      clearTimeout(open);
      clearTimeout(done);
    };
  }, [pathname]);

  // finche' il sipario copre la pagina, le animazioni d'ingresso (classe .intro) restano in pausa
  useEffect(() => {
    document.documentElement.toggleAttribute("data-curtain", phase === "cover");
  }, [phase]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}

      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[700] flex items-center justify-center bg-neutral-950 ${
          phase === "idle"
            ? "invisible translate-y-full transition-none pointer-events-none"
            : phase === "cover"
              ? "translate-y-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              : "-translate-y-full transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,64,0,0.2),transparent_60%)]" />
        <img
          src={target === "games" ? "/forge-games-logo.webp" : "/forge-logo.webp"}
          alt=""
          className={`relative transition-all duration-500 delay-150 ${
            target === "games" ? "w-[min(60vw,22rem)]" : "w-[min(70vw,26rem)]"
          } ${phase === "cover" ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        />
      </div>
    </TransitionContext.Provider>
  );
}

// Come <Link>, ma passa dal sipario. Ctrl/Cmd+clic e nuova scheda funzionano come sempre.
export function TransitionLink({
  href,
  onClick,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  const navigate = useContext(TransitionContext);
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
