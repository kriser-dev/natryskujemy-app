import React from 'react';
import { ShieldCheck, Camera, FileText, PenTool, ThumbsUp, Layers, Search, ClipboardCheck, PaintRoller, CheckCircle2 } from 'lucide-react';

export default function ProcessPage() {
  return (
    <div className="bg-slate-50 min-h-screen animate-in fade-in duration-500 pb-24">
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#3f8ace] blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">Zrealizowane projekty, <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3f8ace] to-cyan-300">nie „ładne zdjęcia”.</span></h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">Efekty, które można zweryfikować w czasie. Każda realizacja to konkretna decyzja techniczna i jej długofalowe konsekwencje.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* PROCES 1 */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#3f8ace]/5 rounded-bl-full z-0"></div>
           <div className="relative z-10 flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                 <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#3f8ace]/10 text-[#3f8ace] font-bold text-sm mb-6">
                    <ShieldCheck size={16} className="mr-2" /> Hydroizolacje Dachów
                 </div>
                 <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">Proces, który minimalizuje ryzyko po stronie klienta.</h2>
                 <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>Jeżeli masz dach płaski, najczęściej pokryty papą, który cieknie i nie potrafisz zlokalizować miejsca usterki – <strong>nie jesteś jedyny</strong>. Oznacza to też, że trafiłeś w dobre miejsce.</p>
                    <p>Papa to technologia, która mimo upływu wiel lat jest dalej bardzo popularna. Ma swoje plusy, jednak wraz z rosnącymi potrzebami na rynku budowlanym i zachodzącymi zmianami dotyczącymi ekologii, powoli odchodzi do lamusa.</p>
                    <p className="font-semibold text-[#3f8ace] text-xl mt-6">W tym miejscu pojawiamy się My z rozwiązaniami na miarę XXI wieku.</p>
                 </div>
              </div>
              <div className="lg:w-1/2">
                 <div className="space-y-0">
                    <div className="relative pl-12 pb-8">
                       <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-white border-2 border-[#3f8ace] flex items-center justify-center text-[#3f8ace] font-bold z-10 shadow-sm shadow-[#3f8ace]/20">1</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">Wizyta i dokumentacja <Camera size={18} className="ml-2 text-slate-400"/></h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Aby pomóc naszym klientom niezbędna jest wizyta na miejscu. Określamy stan dachu i robimy dokumentację fotograficzną. Pomiary robimy na miejscu lub na życzenie klienta – ze specjalistycznego drona ze skanerem 3D, aby klient nie musiał sam wchodzić na dach.</p>
                    </div>
                    <div className="relative pl-12 pb-8">
                       <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-white border-2 border-[#3f8ace] flex items-center justify-center text-[#3f8ace] font-bold z-10 shadow-sm shadow-[#3f8ace]/20">2</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">Szczegółowa wycena <FileText size={18} className="ml-2 text-slate-400"/></h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Tak przygotowana dokumentacja jest u nas podstawą. Na jej bazie precyzyjnie przygotowana, szczegółowa wycena trafia prosto do Ciebie.</p>
                    </div>
                    <div className="relative pl-12 pb-8">
                       <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-white border-2 border-[#3f8ace] flex items-center justify-center text-[#3f8ace] font-bold z-10 shadow-sm shadow-[#3f8ace]/20">3</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">Podpisanie umowy <PenTool size={18} className="ml-2 text-slate-400"/></h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Kiedy wszystko jest jasne i przejrzyste, podpisujemy umowę ustalając ramy czasowe.</p>
                    </div>
                    <div className="relative pl-12 pb-8">
                       <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-[#3f8ace]"></div>
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-[#3f8ace] border-2 border-[#3f8ace] flex items-center justify-center text-white font-bold z-10 shadow-md shadow-[#3f8ace]/40">4</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2">Realizacja zlecenia</h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Przystępujemy do pracy natryskowej z najwyższą dbałością o każdy detal i otoczenie obiektu.</p>
                    </div>
                    <div className="relative pl-12">
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-green-500 border-2 border-green-500 flex items-center justify-center text-white font-bold z-10 shadow-md shadow-green-500/40">
                          <ThumbsUp size={20} />
                       </div>
                       <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-green-800 font-bold flex items-center">
                          MASZ NAS Z GŁOWY NA 20 LAT ☺
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* PROCES 2 */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 mb-16 relative overflow-hidden">
           <div className="relative z-10 flex flex-col lg:flex-row-reverse gap-16">
              <div className="lg:w-1/2">
                 <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold text-sm mb-6 border border-slate-200">
                    <Layers size={16} className="mr-2" /> Gładzie Natryskowe
                 </div>
                 <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">Analiza → dobór technologii → realizacja → odpowiedzialność.</h2>
                 <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>Tutaj sprawa jest zdecydowanie prostsza, co nie znaczy, że brakuje nam doświadczenia. Wykonujemy gładzie natryskowe <strong>już od 15 lat!</strong></p>
                    <p>Najczęściej realizujemy je w nowych obiektach, takich jak domki jednorodzinne czy budynki użyteczności publicznej.</p>
                    <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                      <p className="text-sm text-amber-800 font-medium"><strong>Ważne:</strong> Wykorzystujemy zaawansowany i wydajny park maszynowy, dlatego nie realizujemy zleceń poniżej 300m² ze względu na logistykę sprzętu.</p>
                    </div>
                 </div>
              </div>
              <div className="lg:w-1/2">
                 <div className="space-y-0 mt-4 lg:mt-0">
                    <div className="relative pl-12 pb-8">
                       <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-white border-2 border-slate-800 flex items-center justify-center text-slate-800 font-bold z-10">1</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">Określenie stanu podłoża <Search size={18} className="ml-2 text-slate-400"/></h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Weryfikujemy tynki i powierzchnie, na których będziemy pracować, aby optymalnie dobrać gładź i metodę działania.</p>
                    </div>
                    <div className="relative pl-12 pb-8">
                       <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-white border-2 border-slate-800 flex items-center justify-center text-slate-800 font-bold z-10">2</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">Kosztorys i zakres <ClipboardCheck size={18} className="ml-2 text-slate-400"/></h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Precyzyjnie definiujemy co jest do zrobienia, ile materiału będzie potrzebne i przedstawiamy dokładny kosztorys całej operacji.</p>
                    </div>
                    <div className="relative pl-12">
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-800 flex items-center justify-center text-white font-bold z-10 shadow-md">3</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2">Umowa i Błyskawiczna Realizacja</h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Po akceptacji i podpisaniu umowy wprowadzamy nasz sprzęt, gwarantując idealnie równe ściany w ułamku czasu tradycyjnych metod.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* PROCES 3 */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 relative overflow-hidden">
           <div className="relative z-10 flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                 <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 font-bold text-sm mb-6 border border-cyan-100">
                    <PaintRoller size={16} className="mr-2" /> Malowanie Hydrodynamiczne
                 </div>
                 <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">Nie improwizujemy. Standaryzujemy to, co musi być powtarzalne.</h2>
                 <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>Zarówno malowanie dachów, elewacji, jak i wnętrz w zdecydowanej większości przypadków wykonujemy za pomocą precyzyjnych agregatów hydrodynamicznych.</p>
                    <p>Aby efekt przetrwał lata, musimy najpierw określić dokładnie co chcesz pomalować, jakim kolorem i jakie masz wobec farby wymagania (np. stopień połysku, odporność na zmywanie czy specyficzne warunki halowe).</p>
                 </div>
              </div>
              <div className="lg:w-1/2">
                 <div className="space-y-0 mt-4 lg:mt-0">
                    <div className="relative pl-12 pb-8">
                       <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center text-cyan-600 font-bold z-10 shadow-sm shadow-cyan-500/20">1</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2">Ustalenia materiałowe</h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Wspólnie dobieramy najwyższej klasy farby i grunty spełniające techniczne parametry obiektu.</p>
                    </div>
                    <div className="relative pl-12 pb-8">
                       <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center text-cyan-600 font-bold z-10 shadow-sm shadow-cyan-500/20">2</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2">Umowa i Organizacja</h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Podpisujemy umowę i szczegółowo organizujemy front robót, aby w jak najmniejszym stopniu zakłócić codzienne funkcjonowanie obiektu.</p>
                    </div>
                    <div className="relative pl-12 pb-8">
                       <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-cyan-500"></div>
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-cyan-500 border-2 border-cyan-500 flex items-center justify-center text-white font-bold z-10 shadow-md shadow-cyan-500/30">3</div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2">Realizacja natrysku</h4>
                       <p className="text-slate-600 text-sm leading-relaxed">Dbamy o absolutnie perfekcyjne zabezpieczenie otoczenia, precyzyjne przygotowanie powierzchni i błyskawiczną, równą aplikację powłoki za pomocą agregatu.</p>
                    </div>
                    <div className="relative pl-12">
                       <div className="absolute left-0 top-1.5 w-10 h-10 rounded-full bg-[#3f8ace] border-2 border-[#3f8ace] flex items-center justify-center text-white font-bold z-10 shadow-md shadow-[#3f8ace]/40">
                          <CheckCircle2 size={20} />
                       </div>
                       <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-900 font-bold flex items-center">
                          Tadam... znowu masz nas z głowy na jakieś 5 do 7 lat ☺
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}