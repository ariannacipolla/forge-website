import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Configurazione "Smart": mappiamo ogni peso al suo file specifico
const saira = localFont({
  src: [
    {
      path: "./fonts/Saira/static/Saira-Thin.ttf", // Se lo hai
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Saira/static/Saira-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Saira/static/Saira-Regular.ttf", // FONDAMENTALE per il testo base
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Saira/static/Saira-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Saira/static/Saira-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Saira/static/Saira-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Saira/static/Saira-Medium.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-saira", // Unica variabile per tutto
});

// NUOVA Configurazione per Sports World
const sportsWorld = localFont({
  src: "./fonts/Sports-World-Regular.ttf", // Assicurati che il file sia esattamente in questa posizione
  variable: "--font-sports",
  display: "swap", // Migliora le performance di caricamento
});

export const metadata: Metadata = {
  title: "FORGE | Palestra ad Albino (BG) - Build Your Strength",
  description:
    "Scopri FORGE ad Albino (BG). Molto più di una semplice palestra: una community dedicata al tuo miglioramento con programmazione, coaching e area benessere.",
  
  alternates: {
    canonical: "https://forgebuildyourstrength.com",
  },
  
  openGraph: {
    title: "FORGE | Palestra ad Albino (BG)",
    description:
      "Scopri FORGE ad Albino (BG). Molto più di una semplice palestra: una community dedicata al tuo miglioramento con programmazione, coaching e area benessere.",
    
    url: "https://forgebuildyourstrength.com", 
    
    siteName: "FORGE",
    images: [
      {
        url: "/FORGE-4.jpg",
        width: 1200,
        height: 630,
        alt: "Sala pesi Palestra FORGE ad Albino",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth overscroll-none">
      {/* Abbiamo aggiunto ${sportsWorld.variable} alle classi del body */}
      <body className={`${saira.variable} ${sportsWorld.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
