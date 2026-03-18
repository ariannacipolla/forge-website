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

export const metadata: Metadata = {
  title: "FORGE - Build Your Strength",
  description: "La palestra per forgiare il tuo corpo.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth overscroll-none">
      <body className={`${saira.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
