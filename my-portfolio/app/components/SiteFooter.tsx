import { FaEnvelope, FaInstagram } from "react-icons/fa";

const INSTAGRAM_URL = "https://www.instagram.com/__.forge.__";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-neutral-900/50 border-t border-white/5 relative z-20 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <span className="font-sports text-3xl tracking-[0.10em] text-white">
              FORGE
            </span>
            <div className="space-y-1 text-xs md:text-sm text-neutral-500">
              <p>
                <strong className="text-neutral-300 font-medium">
                  Ragione sociale:
                </strong>{" "}
                FRG srl
              </p>
              <p>
                <strong className="text-neutral-300 font-medium">
                  Sede legale:
                </strong>{" "}
                Via Isla 16, 24021 Albino (BG)
              </p>
              <p>
                <strong className="text-neutral-300 font-medium">
                  P.IVA / C.F.:
                </strong>{" "}
                04879900167
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-between h-full space-y-6">
            <div className="flex items-center gap-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                className="text-neutral-400 hover:text-[#FF4000] transition-colors p-2 -m-2"
              >
                <FaInstagram className="text-2xl hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:info@forgebuildyourstrength.com"
                className="text-neutral-400 hover:text-[#FF4000] transition-colors p-2 -m-2"
              >
                <FaEnvelope className="text-xl hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Link Legali Iubenda (aperti in popup dallo script iubenda caricato nel layout) */}
            <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm font-medium text-neutral-500">
              <a
                href="https://www.iubenda.com/privacy-policy/73809111"
                className="iubenda-nostyle iubenda-noiframe iubenda-embed hover:text-white transition-colors"
                title="Privacy Policy"
              >
                Privacy Policy
              </a>

              <a
                href="https://www.iubenda.com/privacy-policy/73809111/cookie-policy"
                className="iubenda-nostyle iubenda-noiframe iubenda-embed hover:text-white transition-colors"
                title="Cookie Policy"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* DISCLAIMER INFORMATIVO (Sostituisce Termini e Condizioni) */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <p className="text-[10px] md:text-xs leading-relaxed text-neutral-500 font-light max-w-4xl">
            Le informazioni e le promozioni indicate sul sito hanno scopo
            puramente illustrativo e non costituiscono proposta contrattuale.
            L&apos;offerta è soggetta a disponibilità limitata e la sottoscrizione
            del servizio avviene esclusivamente presso la sede fisica previa
            verifica dei requisiti.
          </p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] md:text-xs font-medium tracking-wider text-neutral-600 uppercase">
          <p>© {new Date().getFullYear()} FRG Srl. Tutti i diritti riservati.</p>
          <p>
            Build <span className="text-[#FF4000]">Your</span> Strength
          </p>
        </div>
      </div>
    </footer>
  );
}
