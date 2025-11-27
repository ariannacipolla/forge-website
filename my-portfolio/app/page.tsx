export default function Home() {
  return (
    // Questo è JSX: sembra HTML, ma è JavaScript
    // Le classi dentro "className" sono di Tailwind CSS
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-blue-500">
          Hello World
        </h1>
        
        <p className="text-xl text-gray-300">
          Il mio primo sito statico in Next.js e TypeScript.
        </p>

        <button className="mt-4 px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
          Click Me
        </button>
      </div>

    </main>
  );
}