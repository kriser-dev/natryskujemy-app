import React from 'react';
import { Award, ShieldCheck, Home, Layers, TrendingUp, Lightbulb, Target, Heart, Users, CheckCircle2 } from 'lucide-react';

import tarasImg from '../assets/hydroizolacja-tarasu.webp';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#3f8ace] blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">Zmieniamy postrzeganie <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3f8ace] to-cyan-300">branży budowlanej.</span></h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">Poznaj ludzi, inżynieryjne podejście i wartości, które od 2004 roku stoją za rzetelnością firmy HydroPAKiet.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#3f8ace]/10 text-[#3f8ace] font-bold text-sm mb-6">
                <Award size={16} className="mr-2" /> Nasza Historia
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">20+ lat doświadczenia zamknięte w procesach, <span className="text-[#3f8ace]">nie w obietnicach.</span></h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>Nasza historia zaczęła się w kwietniu 2004 roku, kiedy rozpoczęliśmy działalność. To był czas intensywnej nauki i poznawania rynku. W miarę jak rozwijaliśmy się i zdobywaliśmy doświadczenie, zaczęliśmy dostrzegać, że prawdziwa satysfakcja klienta pochodzi z jakości wykończenia, precyzji i dbałości o szczegóły.</p>
                <p>Dziś naszą specjalizacją są natryski hydrodynamiczne, które umożliwiają nam realizację zadań na najwyższym poziomie. To jednak nie tylko technologia, ale przede wszystkim podejście, które stawia na jakość, trwałość i estetykę.</p>
              </div>
            </div>
<div className="lg:w-1/2 w-full">
  <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
    {/* Główne zdjęcie */}
    <img 
      src={tarasImg} 
      alt="Hydroizolacja tarasu - realizacja HydroPAKiet" 
      className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105" 
      loading="lazy" 
      width="800" 
      height="600" 
    />
    
    {/* Nakładka gradientowa (poprawia czytelność plakietki) */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

    {/* Mała plakietka w rogu */}
    <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-xl flex items-center space-x-2 border border-white/20">
      <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
      <p className="text-brand-dark font-bold text-xs uppercase tracking-wider">
        Hydroizolacja Tarasu
      </p>
    </div>
  </div>
</div>
         </div>

         <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12 mb-24">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Co to podejście oznacza w praktyce?</h3>
              <p className="text-slate-600">Jakość i detal na przykładzie naszych realizacji zabezpieczających i renowacyjnych:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-[#3f8ace]/30 transition-colors">
                 <ShieldCheck className="text-[#3f8ace] mb-4" size={32} />
                 <h4 className="font-bold text-slate-900 mb-2">Ochrona</h4>
                 <p className="text-sm text-slate-600">Przed wilgocią i promieniowaniem UV – specjalne powłoki zabezpieczają przed nasiąkaniem i blaknięciem.</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-[#3f8ace]/30 transition-colors">
                 <Home className="text-[#3f8ace] mb-4" size={32} />
                 <h4 className="font-bold text-slate-900 mb-2">Estetyka</h4>
                 <p className="text-sm text-slate-600">Obiekt zyskuje nowy, atrakcyjny wygląd, który bezpośrednio podnosi wartość całej nieruchomości.</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-[#3f8ace]/30 transition-colors">
                 <Layers className="text-[#3f8ace] mb-4" size={32} />
                 <h4 className="font-bold text-slate-900 mb-2">Trwałość</h4>
                 <p className="text-sm text-slate-600">Poprawiamy odporność na uszkodzenia mechaniczne i trudne, zmienne warunki atmosferyczne.</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-[#3f8ace]/30 transition-colors">
                 <TrendingUp className="text-[#3f8ace] mb-4" size={32} />
                 <h4 className="font-bold text-slate-900 mb-2">Ekonomia</h4>
                 <p className="text-sm text-slate-600">Nasze rozwiązania to korzystniejsza finansowo alternatywa dla drogiej wymiany całego pokrycia.</p>
              </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col h-full">
              <div className="w-14 h-14 bg-[#3f8ace]/10 rounded-2xl flex items-center justify-center text-[#3f8ace] mb-6"><Lightbulb size={28} /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Dlaczego istniejemy?</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">Naszą misją jest zmienianie świata na lepsze – krok po kroku, usługa po usłudze, relacja po relacji. Wierzymy, że dobrze wykonana praca to nie tylko estetyczny efekt, ale także satysfakcja i poczucie bezpieczeństwa klienta.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col h-full transform md:-translate-y-4">
              <div className="w-14 h-14 bg-[#3f8ace]/10 rounded-2xl flex items-center justify-center text-[#3f8ace] mb-6"><Target size={28} /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Dla kogo pracujemy?</h3>
              <p className="text-slate-600 leading-relaxed flex-grow">Pracujemy dla tych, którzy <strong>odpowiadają za obiekty</strong>, nie tylko je zlecają. Naszymi partnerami są zarządcy, spółdzielnie, podmioty publiczne i firmy techniczne.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col h-full">
              <div className="w-14 h-14 bg-[#3f8ace]/10 rounded-2xl flex items-center justify-center text-[#3f8ace] mb-6"><Heart size={28} /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Co to oznacza w praktyce?</h3>
              <p className="text-slate-600 leading-relaxed mb-4">Nie sprzedajemy usług – oferujemy absolutną pewność, że to, co robimy, jest wykonane dobrze, dokładnie i z troską o najmniejsze szczegóły.</p>
              <p className="text-slate-600 leading-relaxed flex-grow">Każdy projekt to dla nas współpraca, a nie tylko zlecenie. Stawiamy na zdrowe relacje oparte na szczerości.</p>
            </div>
         </div>
      </div>

      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-5/12">
                 <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Jakość to nie standard. <br/><span className="text-[#3f8ace]">To system pracy.</span></h2>
                 <p className="text-xl text-slate-300 mb-8 leading-relaxed">Jesteśmy firmą, która wyznaje zasadę, że biznes to coś więcej niż tylko zysk. Nasza organizacja działa zgodnie z <strong>turkusowym modelem zarządzania</strong>.</p>
                 <div className="space-y-6">
                    <div className="flex">
                      <div className="mt-1 mr-4 bg-[#3f8ace]/20 p-2 rounded-full text-[#3f8ace]"><Users size={20} /></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Turkusowy styl pracy</h4>
                        <p className="text-slate-400">Tworzymy przestrzeń, w której każdy pracownik ma wpływ na decyzje. Każdy członek zespołu traktuje firmę jak własną.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mt-1 mr-4 bg-[#3f8ace]/20 p-2 rounded-full text-[#3f8ace]"><Heart size={20} /></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Zaufanie i szczerość</h4>
                        <p className="text-slate-400">Budujemy relacje oparte na zaufaniu i szczerości – zarówno wewnątrz zespołu, jak i z naszymi klientami.</p>
                      </div>
                    </div>
                 </div>
              </div>
              <div className="lg:w-7/12 bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl">
                 <h3 className="text-2xl font-bold mb-6 text-white border-b border-slate-700 pb-4">Nasza filozofia działania</h3>
                 <p className="text-slate-300 mb-8">Wiemy, że nie zmienimy całego świata, ale możemy pozytywnie wpłynąć na nasze najbliższe otoczenie. To dla nas naturalna droga rozwoju. Wierzymy, że:</p>
                 <ul className="space-y-4">
                    <li className="flex items-start text-slate-300"><CheckCircle2 className="text-[#3f8ace] mr-3 mt-1 flex-shrink-0" size={20} /> Poprzez określenie faktycznych potrzeb klienta i bezpośrednią komunikację budujemy zaufanie i poczucie bezpieczeństwa.</li>
                    <li className="flex items-start text-slate-300"><CheckCircle2 className="text-[#3f8ace] mr-3 mt-1 flex-shrink-0" size={20} /> Relacje z klientami mogą być długotrwałe, oparte na wspólnym zrozumieniu i wzajemnym szacunku.</li>
                    <li className="flex items-start text-slate-300"><CheckCircle2 className="text-[#3f8ace] mr-3 mt-1 flex-shrink-0" size={20} /> Każdy dobrze wykonany projekt to krok w stronę lepszego świata – takiego, w którym jakość, uczciwość i troska mają znaczenie.</li>
                 </ul>
              </div>
            </div>
         </div>
      </div>

      <div className="bg-slate-50 py-24">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Budujemy firmę, która działa przewidywalnie</h2>
            <p className="text-xl text-slate-600 mb-12">Dla klienta, zespołu i inwestora. Chcemy być organizacją, która inspiruje innych, pokazuje że branża może opierać się na wartościach i buduje wspólnotę.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center"><div className="w-2 h-2 rounded-full bg-[#3f8ace] mr-4"></div><span className="font-semibold text-slate-800">Szczerość i bezpośrednia komunikacja.</span></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center"><div className="w-2 h-2 rounded-full bg-[#3f8ace] mr-4"></div><span className="font-semibold text-slate-800">Odpowiedzialność za siebie, firmę i klienta.</span></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center"><div className="w-2 h-2 rounded-full bg-[#3f8ace] mr-4"></div><span className="font-semibold text-slate-800">Ciągły rozwój i doskonalenie procesów.</span></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center"><div className="w-2 h-2 rounded-full bg-[#3f8ace] mr-4"></div><span className="font-semibold text-slate-800">Chęć niesienia pomocy klientom i sobie nawzajem.</span></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center md:col-span-2 justify-center text-center"><div className="w-2 h-2 rounded-full bg-[#3f8ace] mr-4 hidden md:block"></div><span className="font-semibold text-slate-800">Troska o ludzi i tworzenie poczucia wspólnoty.</span></div>
            </div>
         </div>
      </div>
    </div>
  );
}