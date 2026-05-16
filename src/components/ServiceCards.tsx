import { useState, type SubmitEvent, type ReactNode } from 'react';
import { ShieldCheck, PaintRoller, Layers, ArrowRight, CheckCircle2, X, Send, Loader2, type LucideIcon } from 'lucide-react';

import imgUsluga1 from '../assets/usluga-dach.webp';
import imgUsluga2 from '../assets/usluga-malowanie.webp';
import imgUsluga3 from '../assets/usluga-gladzie.webp';

// --- MINI-KOMPONENT FORMULARZA (ANKIETY) ---
const QuickSurveyForm = ({ serviceName, placeholder }: { serviceName: string, placeholder: string }) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <div className="mt-10 bg-green-50 rounded-2xl p-8 border border-green-100 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4"><CheckCircle2 size={32}/></div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Świetnie! Zgłoszenie przyjęte.</h4>
                <p className="text-slate-600 text-sm">Otrzymaliśmy wstępne informacje o Twoim obiekcie. Nasi inżynierowie skontaktują się z Tobą najszybciej jak to możliwe.</p>
            </div>
        );
    }

    return (
        <div className="mt-10 rounded-2xl p-6 sm:p-8 border relative overflow-hidden transition-all bg-brand-primary/5 border-brand-primary/10">
            <div className="relative z-10">
                <div className="flex items-center mb-2">
                    <div className="w-2 h-2 rounded-full mr-3 animate-pulse bg-brand-primary"></div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900">Szybka pomoc: {serviceName}</h4>
                </div>
                {/* ZMIENIONY TEKST ZACHĘTY */}
                <p className="text-slate-600 text-sm mb-6">Zostaw e-mail i krótki opis sytuacji. Skontaktujemy się, by ocenić, czy i jak możemy pomóc.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="serviceType" value={serviceName} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* ZMIENIONE POLE NA ADRES EMAIL */}
                        <input type="email" name="email" required placeholder="Twój adres e-mail" className="w-full px-4 py-3 rounded-xl border border-white focus:ring-2 outline-none transition-all shadow-sm focus:border-brand-primary focus:ring-brand-primary/20" />
                        <input type="text" name="area" placeholder="Szacunkowy metraż (m²)" className="w-full px-4 py-3 rounded-xl border border-white focus:ring-2 outline-none transition-all shadow-sm focus:border-brand-primary focus:ring-brand-primary/20" />
                    </div>
                    <div>
                        <textarea name="description" required rows={2} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl border border-white focus:ring-2 outline-none transition-all shadow-sm resize-none focus:border-brand-primary focus:ring-brand-primary/20"></textarea>
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center group disabled:opacity-70 bg-brand-primary hover:bg-brand-dark">
                        {status === 'submitting' ? <><Loader2 className="animate-spin mr-2" size={18}/> Wysyłanie...</> : <>Przekaż do wyceny <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform"/></>}
                    </button>
                </form>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-50 bg-brand-primary/20"></div>
        </div>
    );
};

// --- GŁÓWNY, UNIWERSALNY KOMPONENT KARTY ---
interface BaseServiceCardProps {
    frontImage: string;
    frontTag?: string;
    frontIcon: LucideIcon;
    frontTitle: string;
    frontList: string[];
    backTheme?: 'primary' | 'dark';
    backTitle: string;
    backSubtitle: string;
    backDescription: string;
    backList: string[];
    modalTitle: string;
    modalQuote: string;
    modalDescription: ReactNode;
    modalFeatures: string[];
    formServiceName: string;
    formPlaceholder: string;
}

const BaseServiceCard = (props: BaseServiceCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const Icon = props.frontIcon;

    const backBgClass = props.backTheme === 'primary' ? 'bg-brand-primary text-white' : 'bg-slate-800 text-white border-b-4 border-brand-primary';
    const backSuperTitleClass = props.backTheme === 'primary' ? 'text-cyan-200' : 'text-slate-400';
    const backSubtitleClass = props.backTheme === 'primary' ? 'border-white/20' : 'border-slate-600 text-brand-primary';
    const backDescClass = props.backTheme === 'primary' ? 'text-white/90' : 'text-slate-300';
    const backListItemClass = props.backTheme === 'primary' ? '' : 'text-slate-200';
    const backListIconClass = props.backTheme === 'primary' ? 'text-cyan-300' : 'text-brand-primary';
    const backBtnClass = props.backTheme === 'primary' ? 'bg-white text-brand-primary hover:bg-slate-100' : 'bg-brand-primary text-white hover:bg-brand-dark';

    return (
        <>
            <div className="group h-[450px] w-full [perspective:1000px] cursor-pointer" onClick={() => !isModalOpen && setIsFlipped(!isFlipped)}>
                <div className={`relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] will-change-transform ${isFlipped ? '[transform:rotateY(180deg)]' : '[@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]'} shadow-lg hover:shadow-2xl`}>

                    {/* PRZÓD KARTY */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] border border-slate-700 shadow-lg">
                        {props.backTheme === 'primary' && <div className="absolute inset-0 border-2 border-brand-primary rounded-2xl z-20 pointer-events-none"></div>}
                        <picture className="absolute inset-0 w-full h-full">
                            <img src={props.frontImage} alt={props.frontTitle} className={`w-full h-full object-cover transition-transform duration-1000 will-change-transform ${isFlipped ? '' : '[@media(hover:hover)]:group-hover:scale-110'}`} loading="lazy" />
                        </picture>
                        <div className={`absolute inset-0 transition-opacity duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100 [@media(hover:hover)]:group-hover:opacity-0'}`}>
                            <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 ${props.backTheme === 'primary' ? 'to-brand-primary/50' : 'to-slate-800/40'}`}></div>
                            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10">
                                {props.frontTag && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">{props.frontTag}</div>}
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20 shadow-xl"><Icon size={40}/></div>
                                <h4 className="text-2xl font-extrabold text-white mb-3 drop-shadow-md">{props.frontTitle}</h4>
                                <ul className="text-slate-100 text-sm mb-4 space-y-1.5 drop-shadow-md font-medium">
                                    {props.frontList.map((item, idx) => <li key={idx}>{item}</li>)}
                                </ul>
                                <div className={`mt-auto flex items-center font-semibold text-sm drop-shadow-md ${props.backTheme === 'primary' ? 'text-cyan-300 animate-pulse' : 'text-slate-300'}`}>Dotknij, aby poznać szczegóły <ArrowRight size={16} className="ml-2"/></div>
                            </div>
                        </div>
                    </div>

                    {/* TYŁ KARTY */}
                    <div className={`absolute inset-0 h-full w-full rounded-2xl p-7 [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col justify-between ${backBgClass}`}>
                        <div>
                            <h3 className={`text-xs font-black uppercase tracking-widest mb-2 opacity-90 ${backSuperTitleClass}`}>{props.backTitle}</h3>
                            <h4 className={`text-lg font-bold mb-3 border-b pb-3 ${backSubtitleClass}`}>{props.backSubtitle}</h4>
                            <p className={`mb-4 leading-relaxed text-xs sm:text-sm ${backDescClass}`}>{props.backDescription}</p>
                            <ul className="space-y-2">
                                {props.backList.map((item, idx) => (
                                    <li key={idx} className={`flex items-start text-xs sm:text-sm ${backListItemClass}`}>
                                        <CheckCircle2 size={16} className={`mr-2 mt-0.5 flex-shrink-0 ${backListIconClass}`}/> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }} className={`w-full py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center group/btn active:scale-95 ${backBtnClass}`}>
                            Pełny opis technologii <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => setIsModalOpen(false)}>
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"></div>
                    <div className="relative bg-white rounded-[2rem] w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <div className="h-2 w-full bg-brand-primary"></div>
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all hover:rotate-90"><X size={24} /></button>

                        <div className="overflow-y-auto overflow-x-hidden max-h-[calc(85vh-8px)] p-8 sm:p-12 relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner"><Icon size={32}/></div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">{props.modalTitle}</h2>
                                <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-brand-primary italic text-lg text-slate-700">"{props.modalQuote}"</div>
                                    {props.modalDescription}
                                    <h4 className="text-xl font-bold text-slate-900">Dlaczego warto wybrać tę metodę?</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                                        {props.modalFeatures.map((feat, idx) => (
                                            <li key={idx} className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                                <CheckCircle2 className="text-green-500 mr-3" size={20}/> {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    </div>
                                <QuickSurveyForm serviceName={props.formServiceName} placeholder={props.formPlaceholder} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// --- EKSPORTOWANE KARTY ---

export const ServiceCard1 = () => (
    <BaseServiceCard
        frontImage={imgUsluga1}
        frontTag="Główna Specjalizacja"
        frontIcon={ShieldCheck}
        frontTitle="Hydroizolacje Dachów i Tarasów" frontList={['- Lorem ipsum dolor sit amet', '- Consectetur adipiscing elit']} backTheme="primary" backTitle="Hydroizolacje Dachów i Tarasów" backSubtitle="Szczelność, za którą bierzemy odpowiedzialność." backDescription="Tworzymy w 100% szczelne, bezspoinowe powłoki chroniące przed wodą. Idealne do naprawy przeciekających dachów płaskich." backList={['Brak szwów i łączeń (miejsc przecieków)', 'Odporność na mrozy i UV', 'Błyskawiczny czas realizacji']} modalTitle="Systemy Hydroizolacji Płynnych" modalQuote="Najwyższa forma ochrony dachu to taka, która nie posiada ani jednego słabego punktu w postaci zgrzewu czy zakładki." modalDescription={<p>Nasza technologia opiera się na nowoczesnych membranach płynnych, które po aplikacji tworzą jednolitą, „gumową” powłokę na całej powierzchni dachu lub tarasu.</p>} modalFeatures={['100% bezspoinowość', 'Refleksyjność (nie nagrzewa się)', 'Do 25 lat trwałości', 'Odporność na stojącą wodę']} formServiceName="Hydroizolacje" formPlaceholder="Opisz obiekt (np. przeciekający dach papowy, woda stoi po opadach, zależy na czasie...)" />
);

export const ServiceCard2 = () => (
    <BaseServiceCard
        frontImage={imgUsluga2}
        frontIcon={PaintRoller}
        frontTitle="Malowanie Hydrodynamiczne" frontList={['- Lorem ipsum dolor sit amet', '- Consectetur adipiscing elit']} backTheme="primary" backTitle="Malowanie Hydrodynamiczne" backSubtitle="Prace wykończeniowe w obiektach wielkopowierzchniowych." backDescription="Idealnie gładkie powierzchnie bez smug. Malujemy hale, magazyny i elewacje w rekordowym czasie." backList={['Wydajność do 1000m² dziennie', 'Doskonałe krycie detali i zakamarków', 'Oszczędność materiału do 20%']} modalTitle="Malowanie Natryskowe (Agregatem)" modalQuote="Rozwiązanie dedykowane dla inwestycji, gdzie liczy się czas i bezbłędna estetyka na dużych płaszczyznach." modalDescription={<p>Wykorzystujemy profesjonalne agregaty hydrodynamiczne, które tłoczą farbę pod wysokim ciśnieniem bez użycia powietrza. Pozwala to na uzyskanie idealnej struktury bez "chmurek" i smug typowych dla wałka.</p>} modalFeatures={['Idealna struktura bez smug', 'Wydajność do 1000m² dziennie', 'Doskonałe krycie detali', 'Oszczędność farby do 20%']} formServiceName="Malowanie Natryskowe" formPlaceholder="Opisz obiekt (np. hala magazynowa, malowanie ścian i sufitu wewnątrz, szukamy wolnego terminu...)" />
);

export const ServiceCard3 = () => (
    <BaseServiceCard
        frontImage={imgUsluga3}
        frontIcon={Layers}
        frontTitle="Gładzie Polimerowe" frontList={['- Lorem ipsum dolor sit amet', '- Consectetur adipiscing elit']} backTheme="primary" backTitle="Gładzie Polimerowe" backSubtitle="Szybkość, powtarzalność i jakość możliwa do skontrolowania." backDescription="Idealnie równe ściany w ułamku czasu. Gwarancja perfekcyjnego przygotowania powierzchni." backList={['Perfekcyjna gładkość (Q3/Q4)', 'Znacznie mniejsze pylenie', 'Wysoka twardość i odporność']} modalTitle="Natryskowe Gładzie Polimerowe" modalQuote="Gładzie polimerowe aplikowane natryskowo to obecnie najwyższy standard przygotowania ścian pod malowanie lub tapetowanie." modalDescription={<p>Dzięki maszynowej aplikacji warstwa jest idealnie równa na całej płaszczyźnie, co eliminuje ryzyko powstawania nierówności widocznych pod światło na dużych powierzchniach.</p>} modalFeatures={['Perfekcyjna gładkość (Q3/Q4)', 'Idealnie równa warstwa', 'Znacznie mniejsze pylenie', 'Wysoka twardość ściany']} formServiceName="Gładzie Polimerowe" formPlaceholder="Opisz obiekt (np. nowe biura, ściany działowe z karton-gipsu, wysoki standard wykończenia...)" />
);