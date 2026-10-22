import type { Metadata } from "next";
import ForgeGamesPage from "./ForgeGamesPage";

export const metadata: Metadata = {
  title: "FORGE GAMES 1ª Edizione | 15 Novembre ad Albino (BG)",
  description:
    "Il 15 novembre la palestra FORGE di Albino si trasforma nell'arena dei Forge Games: una gara di forza, resistenza ed endurance con divisione maschile e femminile. Iscriviti online.",
  alternates: {
    canonical: "https://forgebuildyourstrength.com/forge-games",
  },
  openGraph: {
    title: "FORGE GAMES - 1ª Edizione",
    description:
      "15 novembre: una giornata dedicata alla forza, alla resistenza e alla grinta. Iscriviti alla prima edizione dei Forge Games.",
    url: "https://forgebuildyourstrength.com/forge-games",
    siteName: "FORGE",
    images: [
      {
        url: "/forge-games-logo.png",
        width: 1069,
        height: 817,
        alt: "Logo Forge Games - 1ª Edizione",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
};

export default function Page() {
  return <ForgeGamesPage />;
}
