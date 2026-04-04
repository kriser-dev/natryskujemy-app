import React from 'react';
import { Home, SearchX } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-slate-50 min-h-[70vh] pt-24 pb-24 flex flex-col items-center justify-center animate-in fade-in duration-500 px-4">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-400 mb-8 shadow-sm">
        <SearchX size={48} />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 tracking-tight mb-4">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 text-center">
        Strona nie została znaleziona
      </h2>
      
      <p className="text-slate-500 text-center max-w-md mb-10 text-lg">
        Przepraszamy, ale adres, którego szukasz, nie istnieje, został przeniesiony lub wpisano go z błędem.
      </p>
      
      <a 
        href="/" 
        className="inline-flex items-center justify-center px-8 py-4 bg-[#3f8ace] text-white rounded-xl font-bold hover:bg-[#3271a9] transition-all hover:shadow-lg hover:-translate-y-1"
      >
        <Home size={20} className="mr-2" />
        Wróć na stronę główną
      </a>
    </div>
  );
}