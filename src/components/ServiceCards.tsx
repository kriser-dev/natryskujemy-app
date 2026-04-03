import React, { useState } from 'react';
import { ShieldCheck, PaintRoller, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

import imgUsluga1 from '../assets/usluga-dach.webp';
import imgUsluga2 from '../assets/usluga-malowanie.webp';
import imgUsluga3 from '../assets/usluga-gladzie.webp';

export const ServiceCard1 = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className="group h-[420px] w-full [perspective:1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] will-change-transform ${isFlipped ? '[transform:rotateY(180deg)]' : 'lg:group-hover:[transform:rotateY(180deg)]'} shadow-lg hover:shadow-2xl`}>
        <div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden] border-2 border-[#3f8ace] shadow-lg">
<picture className="absolute inset-0 w-full h-full">
            <img 
              src={imgUsluga1} 
              alt="Hydroizolacja Dachów i tarasów" 
              className={`w-full h-full object-cover transition-transform duration-1000 will-change-transform ${isFlipped ? '' : 'lg:group-hover:scale-110'}`} 
              loading="lazy" 
              width="800" 
              height="600" 
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-[#3f8ace]/50"></div>
          <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#3f8ace] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">Główna Specjalizacja</div>
            <div className={`w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20 transition-colors duration-500 shadow-xl ${isFlipped ? '' : 'lg:group-hover:bg-[#3f8ace]/50'}`}><ShieldCheck size={40} /></div>
            <h4 className="text-2xl font-extrabold text-white mb-4 drop-shadow-md">Hydroizolacje Dachów i Tarasów</h4>
            <div className="mt-auto flex items-center text-cyan-300 font-semibold text-sm animate-pulse drop-shadow-md">Dotknij, aby poznać szczegóły <ArrowRight size={16} className="ml-2" /></div>
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#3f8ace] p-8 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
          <h4 className="text-xl font-bold mb-4 border-b border-white/20 pb-4">Szczelność, za którą bierzemy odpowiedzialność.</h4>
          <p className="text-white/90 mb-6 leading-relaxed text-sm">Tworzymy w 100% szczelne, bezspoinowe powłoki chroniące przed wodą. Idealne do naprawy przeciekających dachów płaskich, balkonów i tarasów bez konieczności uciążliwego zrywania starych warstw.</p>
          <ul className="space-y-3 mb-2">
            <li className="flex items-start text-sm"><CheckCircle2 size={18} className="text-cyan-300 mr-2 mt-0.5 flex-shrink-0"/> Brak szwów i łączeń (najczęstszych miejsc przecieków)</li>
            <li className="flex items-start text-sm"><CheckCircle2 size={18} className="text-cyan-300 mr-2 mt-0.5 flex-shrink-0"/> Odporność na ekstremalne mrozy i promieniowanie UV</li>
            <li className="flex items-start text-sm"><CheckCircle2 size={18} className="text-cyan-300 mr-2 mt-0.5 flex-shrink-0"/> Błyskawiczny czas realizacji względem papy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const ServiceCard2 = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className="group h-[420px] w-full [perspective:1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] will-change-transform ${isFlipped ? '[transform:rotateY(180deg)]' : 'lg:group-hover:[transform:rotateY(180deg)]'} shadow-md hover:shadow-xl`}>
        <div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden] shadow-md border border-slate-700">
<picture className="absolute inset-0 w-full h-full">
            <img 
              src={imgUsluga2} 
              alt="Malowanie Hydrodynamiczne" 
              className={`w-full h-full object-cover transition-transform duration-1000 will-change-transform ${isFlipped ? '' : 'lg:group-hover:scale-110'}`} 
              loading="lazy" 
              width="800" 
              height="600" 
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-800/40"></div>
          <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10">
            <div className={`w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20 transition-colors duration-500 shadow-xl ${isFlipped ? '' : 'lg:group-hover:bg-[#3f8ace]/50'}`}><PaintRoller size={40} /></div>
            <h4 className="text-2xl font-extrabold text-white mb-4 drop-shadow-md">Malowanie Hydrodynamiczne</h4>
            <div className="mt-auto flex items-center text-slate-300 font-semibold text-sm drop-shadow-md">Dotknij, aby poznać szczegóły <ArrowRight size={16} className="ml-2" /></div>
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-slate-800 p-8 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center border-b-4 border-[#3f8ace]">
          <h4 className="text-xl font-bold mb-4 border-b border-slate-600 pb-4 text-[#3f8ace]">Prace wykończeniowe w obiektach technicznych i przemysłowych.</h4>
          <p className="text-slate-300 mb-6 leading-relaxed text-sm">Idealne gładkie powierzchnie bez smug. Malujemy hale, magazyny, elewacje i wnętrza w rekordowym czasie, oszczędzając materiał i Twoje pieniądze.</p>
          <ul className="space-y-3 mb-2">
            <li className="flex items-start text-sm text-slate-200"><CheckCircle2 size={18} className="text-[#3f8ace] mr-2 mt-0.5 flex-shrink-0"/> Ogromna wydajność (setki m2 dziennie)</li>
            <li className="flex items-start text-sm text-slate-200"><CheckCircle2 size={18} className="text-[#3f8ace] mr-2 mt-0.5 flex-shrink-0"/> Doskonałe krycie struktury i trudno dostępnych miejsc</li>
            <li className="flex items-start text-sm text-slate-200"><CheckCircle2 size={18} className="text-[#3f8ace] mr-2 mt-0.5 flex-shrink-0"/> Oszczędność farby względem tradycyjnego wałka</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const ServiceCard3 = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className="group h-[420px] w-full [perspective:1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] will-change-transform ${isFlipped ? '[transform:rotateY(180deg)]' : 'lg:group-hover:[transform:rotateY(180deg)]'} shadow-md hover:shadow-xl`}>
        <div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden] shadow-md border border-slate-700">
<picture className="absolute inset-0 w-full h-full">
            <img 
              src={imgUsluga3} 
              alt="Gładzie Polimerowe" 
              className={`w-full h-full object-cover transition-transform duration-1000 will-change-transform ${isFlipped ? '' : 'lg:group-hover:scale-110'}`} 
              loading="lazy" 
              width="800" 
              height="600" 
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-800/40"></div>
          <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10">
            <div className={`w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20 transition-colors duration-500 shadow-xl ${isFlipped ? '' : 'lg:group-hover:bg-[#3f8ace]/50'}`}><Layers size={40} /></div>
            <h4 className="text-2xl font-extrabold text-white mb-4 drop-shadow-md">Gładzie Polimerowe</h4>
            <div className="mt-auto flex items-center text-slate-300 font-semibold text-sm drop-shadow-md">Dotknij, aby poznać szczegóły <ArrowRight size={16} className="ml-2" /></div>
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-slate-800 p-8 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center border-b-4 border-[#3f8ace]">
          <h4 className="text-xl font-bold mb-4 border-b border-slate-600 pb-4 text-[#3f8ace]">Szybkość, powtarzalność i jakość możliwa do skontrolowania.</h4>
          <p className="text-slate-300 mb-6 leading-relaxed text-sm">Idealnie równe ściany i sufity w ułamku czasu. Aplikacja gładzi polimerowych metodą natryskową to gwarancja perfekcyjnego przygotowania powierzchni przed malowaniem.</p>
          <ul className="space-y-3 mb-2">
            <li className="flex items-start text-sm text-slate-200"><CheckCircle2 size={18} className="text-[#3f8ace] mr-2 mt-0.5 flex-shrink-0"/> Perfekcyjna gładkość pod nowoczesne oświetlenie</li>
            <li className="flex items-start text-sm text-slate-200"><CheckCircle2 size={18} className="text-[#3f8ace] mr-2 mt-0.5 flex-shrink-0"/> Błyskawiczna aplikacja na dużych metrażach</li>
            <li className="flex items-start text-sm text-slate-200"><CheckCircle2 size={18} className="text-[#3f8ace] mr-2 mt-0.5 flex-shrink-0"/> Mniejsze pylenie i czystsza praca na inwestycji</li>
          </ul>
        </div>
      </div>
    </div>
  );
};