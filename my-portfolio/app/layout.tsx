import type { Metadata } from "next";
// 1. Importa localFont invece di Google Fonts
import localFont from "next/font/local";
import "./globals.css";

// 2. Configura il font Agrandir
// Assicurati che il percorso 'src' corrisponda al nome esatto del tuo file nella cartella app/fonts
const agrandir = localFont({
  src: "./fonts/Agrandir-wide-bold.ttf", // Cambia l'estensione se usi .otf o .ttf
  variable: "--font-agrandir",
  weight: "900", // Imposta il peso normale (o usa un array se hai più pesi)
});

export const metadata: Metadata = {
  title: "FORGE - Build Your Strength",
  description: "La palestra per forgiare il tuo corpo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      {/* 3. Applica la variabile del font al body */}
      <body className={`${agrandir.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}