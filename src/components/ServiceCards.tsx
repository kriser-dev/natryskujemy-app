import {useState} from 'react';
import {ShieldCheck, PaintRoller, Layers, ArrowRight, CheckCircle2, X} from 'lucide-react';

import imgUsluga1 from '../assets/usluga-dach.webp';
import imgUsluga2 from '../assets/usluga-malowanie.webp';
import imgUsluga3 from '../assets/usluga-gladzie.webp';

export const ServiceCard1 = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="group h-[450px] w-full [perspective:1000px] cursor-pointer"
                 onClick={() => !isModalOpen && setIsFlipped(!isFlipped)}>

                <div className={`relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] will-change-transform ${isFlipped ? '[transform:rotateY(180deg)]' : '[@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]'} shadow-lg hover:shadow-2xl`}>

                    {/* PRZÓD KARTY */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] border-2 border-brand-primary shadow-lg">
                        <picture className="absolute inset-0 w-full h-full">
                            <img src={imgUsluga1} alt="Hydroizolacja Dachów i tarasów" className={`w-full h-full object-cover transition-transform duration-1000 will-change-transform ${isFlipped ? '' : '[@media(hover:hover)]:group-hover:scale-110'}`} loading="lazy" />
                        </picture>
                        <div className={`absolute inset-0 transition-opacity duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100 [@media(hover:hover)]:group-hover:opacity-0'}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-brand-primary/50"></div>
                            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10">
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">Główna Specjalizacja</div>
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20 shadow-xl"><ShieldCheck size={40}/></div>
                                <h4 className="text-2xl font-extrabold text-white mb-3 drop-shadow-md">Hydroizolacje Dachów i Tarasów</h4>
                                <ul className="text-slate-100 text-sm mb-4 space-y-1.5 drop-shadow-md font-medium">
                                    <li>- Lorem ipsum dolor sit amet</li>
                                    <li>- Consectetur adipiscing elit</li>
                                </ul>
                                <div className="mt-auto flex items-center text-cyan-300 font-semibold text-sm animate-pulse drop-shadow-md">Dotknij, aby poznać szczegóły <ArrowRight size={16} className="ml-2"/></div>
                            </div>
                        </div>
                    </div>

                    {/* TYŁ KARTY */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-brand-primary p-7 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col justify-between">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-cyan-200 mb-2 opacity-90">Hydroizolacje Dachów i Tarasów</h3>
                            <h4 className="text-lg font-bold mb-3 border-b border-white/20 pb-3">Szczelność, za którą bierzemy odpowiedzialność.</h4>
                            <p className="text-white/90 mb-4 leading-relaxed text-xs sm:text-sm">Tworzymy w 100% szczelne, bezspoinowe powłoki chroniące przed wodą. Idealne do naprawy przeciekających dachów płaskich.</p>
                            <ul className="space-y-2">
                                <li className="flex items-start text-xs sm:text-sm"><CheckCircle2 size={16} className="text-cyan-300 mr-2 mt-0.5 flex-shrink-0"/> Brak szwów i łączeń (miejsc przecieków)</li>
                                <li className="flex items-start text-xs sm:text-sm"><CheckCircle2 size={16} className="text-cyan-300 mr-2 mt-0.5 flex-shrink-0"/> Odporność na mrozy i UV</li>
                                <li className="flex items-start text-xs sm:text-sm"><CheckCircle2 size={16} className="text-cyan-300 mr-2 mt-0.5 flex-shrink-0"/> Błyskawiczny czas realizacji</li>
                            </ul>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                            className="w-full bg-white text-brand-primary hover:bg-slate-100 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center group/btn active:scale-95">
                            Pełny opis technologii <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL 1 */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setIsModalOpen(false)}>
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"></div>

                    <div className="relative bg-white rounded-[2rem] w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <div className="h-2 w-full bg-brand-primary"></div>

                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all hover:rotate-90">
                            <X size={24} />
                        </button>

                        <div className="overflow-y-auto overflow-x-hidden max-h-[calc(85vh-8px)] p-8 sm:p-12 relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner"><ShieldCheck size={32}/></div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Systemy Hydroizolacji Płynnych</h2>

                                <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-brand-primary italic text-lg text-slate-700">
                                        "Najwyższa forma ochrony dachu to taka, która nie posiada ani jednego słabego punktu w postaci zgrzewu czy zakładki."
                                    </div>
                                    <p>Nasza technologia opiera się na nowoczesnych membranach płynnych, które po aplikacji tworzą jednolitą, „gumową” powłokę na całej powierzchni dachu lub tarasu.</p>
                                    <h4 className="text-xl font-bold text-slate-900">Dlaczego warto wybrać tę metodę?</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> 100% bezspoinowość</li>
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Refleksyjność (nie nagrzewa się)</li>
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Do 25 lat trwałości</li>
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Odporność na stojącą wodę</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const ServiceCard2 = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="group h-[450px] w-full [perspective:1000px] cursor-pointer" onClick={() => !isModalOpen && setIsFlipped(!isFlipped)}>
                <div className={`relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] will-change-transform ${isFlipped ? '[transform:rotateY(180deg)]' : '[@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]'} shadow-md hover:shadow-xl`}>

                    <div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] shadow-md border border-slate-700">
                        <picture className="absolute inset-0 w-full h-full">
                            <img src={imgUsluga2} alt="Malowanie Hydrodynamiczne" className={`w-full h-full object-cover transition-transform duration-1000 will-change-transform ${isFlipped ? '' : '[@media(hover:hover)]:group-hover:scale-110'}`} loading="lazy" />
                        </picture>
                        <div className={`absolute inset-0 transition-opacity duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100 [@media(hover:hover)]:group-hover:opacity-0'}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-800/40"></div>
                            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20 transition-colors duration-500 shadow-xl"><PaintRoller size={40}/></div>
                                <h4 className="text-2xl font-extrabold text-white mb-3 drop-shadow-md">Malowanie Hydrodynamiczne</h4>
                                <ul className="text-slate-100 text-sm mb-4 space-y-1.5 drop-shadow-md font-medium">
                                    <li>- Lorem ipsum dolor sit amet</li>
                                    <li>- Consectetur adipiscing elit</li>
                                </ul>
                                <div className="mt-auto flex items-center text-slate-300 font-semibold text-sm drop-shadow-md">Dotknij, aby poznać szczegóły <ArrowRight size={16} className="ml-2"/></div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-slate-800 p-7 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col justify-between border-b-4 border-brand-primary">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 opacity-90">Malowanie Hydrodynamiczne</h3>
                            <h4 className="text-lg font-bold mb-3 border-b border-slate-600 pb-3 text-brand-primary">Prace wykończeniowe w obiektach wielkopowierzchniowych.</h4>
                            <p className="text-slate-300 mb-4 leading-relaxed text-xs sm:text-sm">Idealnie gładkie powierzchnie bez smug. Malujemy hale, magazyny i elewacje w rekordowym czasie.</p>
                            <ul className="space-y-2">
                                <li className="flex items-start text-xs sm:text-sm text-slate-200"><CheckCircle2 size={16} className="text-brand-primary mr-2 mt-0.5 flex-shrink-0"/> Wydajność do 1000m² dziennie</li>
                                <li className="flex items-start text-xs sm:text-sm text-slate-200"><CheckCircle2 size={16} className="text-brand-primary mr-2 mt-0.5 flex-shrink-0"/> Doskonałe krycie detali i zakamarków</li>
                                <li className="flex items-start text-xs sm:text-sm text-slate-200"><CheckCircle2 size={16} className="text-brand-primary mr-2 mt-0.5 flex-shrink-0"/> Oszczędność materiału do 20%</li>
                            </ul>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                            className="w-full bg-brand-primary text-white hover:bg-brand-dark py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center group/btn active:scale-95">
                            Szczegóły wykonania <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL 2 */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setIsModalOpen(false)}>
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"></div>
                    <div className="relative bg-white rounded-[2rem] w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <div className="h-2 w-full bg-brand-primary"></div>
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all hover:rotate-90"><X size={24} /></button>

                        <div className="overflow-y-auto overflow-x-hidden max-h-[calc(85vh-8px)] p-8 sm:p-12 relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner"><PaintRoller size={32}/></div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Malowanie Natryskowe (Agregatem)</h2>

                                <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-brand-primary italic text-lg text-slate-700">
                                        "Rozwiązanie dedykowane dla inwestycji, gdzie liczy się czas i bezbłędna estetyka na dużych płaszczyznach."
                                    </div>
                                    <p>Wykorzystujemy profesjonalne agregaty hydrodynamiczne, które tłoczą farbę pod wysokim ciśnieniem bez użycia powietrza. Pozwala to na uzyskanie idealnej struktury bez "chmurek" i smug typowych dla wałka.</p>
                                    <h4 className="text-xl font-bold text-slate-900">Dlaczego warto wybrać tę metodę?</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Idealna struktura bez smug</li>
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Wydajność do 1000m² dziennie</li>
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Doskonałe krycie detali</li>
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Oszczędność farby do 20%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const ServiceCard3 = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="group h-[450px] w-full [perspective:1000px] cursor-pointer" onClick={() => !isModalOpen && setIsFlipped(!isFlipped)}>
                <div className={`relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] will-change-transform ${isFlipped ? '[transform:rotateY(180deg)]' : '[@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]'} shadow-md hover:shadow-xl`}>

                    <div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] shadow-md border border-slate-700">
                        <picture className="absolute inset-0 w-full h-full">
                            <img src={imgUsluga3} alt="Gładzie Polimerowe" className={`w-full h-full object-cover transition-transform duration-1000 will-change-transform ${isFlipped ? '' : '[@media(hover:hover)]:group-hover:scale-110'}`} loading="lazy" />
                        </picture>
                        <div className={`absolute inset-0 transition-opacity duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100 [@media(hover:hover)]:group-hover:opacity-0'}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-800/40"></div>
                            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20 transition-colors duration-500 shadow-xl"><Layers size={40}/></div>
                                <h4 className="text-2xl font-extrabold text-white mb-3 drop-shadow-md">Gładzie Polimerowe</h4>
                                <ul className="text-slate-100 text-sm mb-4 space-y-1.5 drop-shadow-md font-medium">
                                    <li>- Lorem ipsum dolor sit amet</li>
                                    <li>- Consectetur adipiscing elit</li>
                                </ul>
                                <div className="mt-auto flex items-center text-slate-300 font-semibold text-sm drop-shadow-md">Dotknij, aby poznać szczegóły <ArrowRight size={16} className="ml-2"/></div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-slate-800 p-7 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col justify-between border-b-4 border-brand-primary">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 opacity-90">Gładzie Polimerowe</h3>
                            <h4 className="text-lg font-bold mb-3 border-b border-slate-600 pb-3 text-brand-primary">Szybkość, powtarzalność i jakość możliwa do skontrolowania.</h4>
                            <p className="text-slate-300 mb-4 leading-relaxed text-xs sm:text-sm">Idealnie równe ściany w ułamku czasu. Gwarancja perfekcyjnego przygotowania powierzchni.</p>
                            <ul className="space-y-2">
                                <li className="flex items-start text-xs sm:text-sm text-slate-200"><CheckCircle2 size={16} className="text-brand-primary mr-2 mt-0.5 flex-shrink-0"/> Perfekcyjna gładkość (Q3/Q4)</li>
                                <li className="flex items-start text-xs sm:text-sm text-slate-200"><CheckCircle2 size={16} className="text-brand-primary mr-2 mt-0.5 flex-shrink-0"/> Znacznie mniejsze pylenie</li>
                                <li className="flex items-start text-xs sm:text-sm text-slate-200"><CheckCircle2 size={16} className="text-brand-primary mr-2 mt-0.5 flex-shrink-0"/> Wysoka twardość i odporność</li>
                            </ul>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                            className="w-full bg-brand-primary text-white hover:bg-brand-dark py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center group/btn active:scale-95">
                            Standard wykończenia <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL 3 */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setIsModalOpen(false)}>
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"></div>
                    <div className="relative bg-white rounded-[2rem] w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <div className="h-2 w-full bg-brand-primary"></div>
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all hover:rotate-90"><X size={24} /></button>

                        <div className="overflow-y-auto overflow-x-hidden max-h-[calc(85vh-8px)] p-8 sm:p-12 relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner"><Layers size={32}/></div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">Natryskowe Gładzie Polimerowe</h2>

                                <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-brand-primary italic text-lg text-slate-700">
                                        "Gładzie polimerowe aplikowane natryskowo to obecnie najwyższy standard przygotowania ścian pod malowanie lub tapetowanie."
                                    </div>
                                    <p>Dzięki maszynowej aplikacji warstwa jest idealnie równa na całej płaszczyźnie, co eliminuje ryzyko powstawania nierówności widocznych pod światło na dużych powierzchniach.</p>
                                    <h4 className="text-xl font-bold text-slate-900">Dlaczego warto wybrać tę metodę?</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Perfekcyjna gładkość (Q3/Q4)</li>
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Idealnie równa warstwa</li>
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Znacznie mniejsze pylenie</li>
                                        <li className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm"><CheckCircle2 className="text-green-500 mr-3" size={20}/> Wysoka twardość ściany</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};