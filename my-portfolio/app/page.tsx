export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. VIDEO DI BACKGROUND */}
      {/* 'absolute inset-0' lo posiziona su tutto lo schermo.
          'object-cover' assicura che il video copra l'area senza deformarsi, sia su mobile che desktop.
          '-z-20' lo mette in fondo. */}
      <video
        autoPlay
        loop
        muted
        playsInline // Fondamentale per l'autoplay su iOS/Mobile
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        {/* Assicurati che il nome del file corrisponda a quello nella cartella public */}
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. OVERLAY SCURO (Il filtro) */}
      {/* 'bg-black/60' significa sfondo nero al 60% di opacità. 
          Puoi cambiare 60 in 50, 70, ecc. per renderlo più o meno scuro. */}
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      {/* 3. CONTENUTO DEL SITO */}
      {/* 'z-10' assicura che il testo stia sopra il video e il filtro */}
      <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl">
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-lg">
          FORGE
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-200 tracking-widest">
          Build Your Strength
        </p>

      </div>

    </main>
  );
}