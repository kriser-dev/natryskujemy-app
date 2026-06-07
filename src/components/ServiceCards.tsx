import {useState, type ReactNode, type MouseEvent} from 'react';
import {
    ShieldCheck,
    PaintRoller,
    Layers,
    Droplets,
    ArrowRight,
    CheckCircle2,
    X,
    Loader2,
    Download,
    AlertCircle,
    type LucideIcon
} from 'lucide-react';
import {useAppContext} from '../context/useAppContext';

import imgUsluga1 from '../assets/usluga-dach.webp';
import imgUsluga2 from '../assets/usluga-malowanie.webp';
import imgUsluga3 from '../assets/usluga-gladzie.webp';
import imgUsluga4 from '../assets/usluga-posadzki.webp';

// Dynamiczny adres URL z .env (zapasowo localhost)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// --- MINI-SEKCJA PRZEJŚCIA DO FORMULARZA ---
const QuickSurveyForm = ({serviceName}: { serviceName: string, placeholder?: string }) => {
    // 1. Pobieramy funkcję nawigacji z Twojego globalnego kontekstu (tak samo jak w HomePage)
    const {navigateTo} = useAppContext();

    const handleGoToForm = () => {
        // 2. Przekierowujemy użytkownika do podstrony 'form' (lub 'formularz' - zależnie od nazwy w Twoim routerze)
        navigateTo('form');

        // Opcjonalnie: Możesz też zapisać wybraną usługę w localStorage,
        // aby nowy formularz od razu wiedział, który kafel kliknął użytkownik:
        localStorage.setItem('selectedService', serviceName);
    };

    return (
        // Usunąłem stąd klasy centrujące (items-center, text-center)
        <div
            className="mt-6 rounded-2xl p-6 sm:p-8 border relative overflow-hidden transition-all bg-brand-primary/5 border-brand-primary/10">
            <div className="relative z-10">

                {/* ZMIANA 1: justify-start wymusza wyrównanie nagłówka do lewej */}
                <div className="flex items-center justify-start mb-3">
                    <div className="w-2 h-2 rounded-full mr-3 animate-pulse bg-brand-primary"></div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900">Indywidualna oferta</h4>
                </div>

                {/* ZMIANA 2: text-left gwarantuje wyrównanie tekstu do lewej */}
                <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed text-left">
                    Opisz sytuację — sprawdzimy, czy ten system ma sens dla Twojego obiektu.
                </p>

                {/* ZMIANA 3: Przycisk opakowany w div z flex i justify-center, by był idealnie na środku */}
                <div className="flex justify-center w-full">
                    <button
                        onClick={handleGoToForm}
                        className="w-full sm:w-auto text-white px-10 py-4 rounded-xl font-bold transition-all shadow-md flex items-center justify-center group bg-brand-primary hover:bg-brand-dark transform active:scale-95 text-base"
                    >
                        Przejdź do formularza
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>

            </div>
            <div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-50 bg-brand-primary/20"></div>
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
    caseStudyFileName: string;
    modalFormText: ReactNode;
    preDownloadText?: ReactNode;
}

const BaseServiceCard = (props: BaseServiceCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const Icon = props.frontIcon;

    const [csEmail, setCsEmail] = useState('');
    const [csStatus, setCsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const isEmailValid = csEmail.trim().includes('@') && csEmail.trim().length > 4;

    const handleCaseStudyDownload = async (e: MouseEvent) => {
        e.preventDefault();
        if (!isEmailValid) return;

        setCsStatus('loading');

        try {
            // =====================================================================
            // 1.  Wysyłka e-maila do serwera (i dalej do MailerLite)
            // =====================================================================
            const emailResponse = await fetch(`${API_URL}/api/newsletter`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: csEmail})
            });

            if (!emailResponse.ok) {
                console.error('Nie udało się zapisać e-maila w bazie MailerLite');
                // UWAGA: Celowo nie dajemy tu "return;". Nawet jeśli zapis do newslettera
                // z jakiegoś powodu się nie uda (np. MailerLite ma chwilową awarię),
                // pozwalamy klientowi pobrać obiecany plik PDF. To najlepsza praktyka UX!
            }
            // =====================================================================

            // =====================================================================
            // 2.  Pobieranie pliku PDF
            // =====================================================================
            const response = await fetch(`/${props.caseStudyFileName}`);

            // 1. Sprawdzenie czy serwer nie zwrócił błędu HTTP
            if (!response.ok) {
                console.error('Błąd pobierania Case Study: Błąd HTTP - serwer odrzucił żądanie');
                setCsStatus('error');
                setTimeout(() => setCsStatus('idle'), 5000);
                return; // <-- Przerywamy działanie funkcji
            }

            // 2. Sprawdzenie typu pliku (czy to nie podmieniony HTML strony głównej)
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                console.error('Błąd pobierania Case Study: Zamiast pliku PDF serwer zwrócił stronę HTML');
                setCsStatus('error');
                setTimeout(() => setCsStatus('idle'), 5000);
                return; // <-- Przerywamy działanie funkcji
            }

            const blob = await response.blob();

            // 3. Sprawdzenie czy plik nie jest pusty (0 bajtów)
            if (blob.size === 0) {
                console.error('Błąd pobierania Case Study: Pobrany plik jest pusty');
                setCsStatus('error');
                setTimeout(() => setCsStatus('idle'), 5000);
                return; // <-- Przerywamy działanie funkcji
            }

            // Wymuszenie pobrania pliku w przeglądarce
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = props.caseStudyFileName;
            document.body.appendChild(a);
            a.click();

            // Czyszczenie pamięci podręcznej przeglądarki
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Sukces
            setCsStatus('success');
            setTimeout(() => setCsStatus('idle'), 3000);

            // Opcjonalnie: możemy wyczyścić pole email, by było puste po udanym pobraniu
            if (typeof setCsEmail === 'function') {
                setCsEmail('');
            }

        } catch (err) {
            // Blok catch wykona się TYLKO w awaryjnej sytuacji sieciowej (np. całkowity brak internetu u klienta)
            console.error('Błąd połączenia sieciowego podczas pobierania Case Study:', err);
            setCsStatus('error');
            setTimeout(() => setCsStatus('idle'), 5000);
        }
    };

    const backBgClass = props.backTheme === 'primary' ? 'bg-brand-primary text-white' : 'bg-slate-800 text-white border-b-4 border-brand-primary';
    const backSuperTitleClass = props.backTheme === 'primary' ? 'text-cyan-200' : 'text-slate-400';
    const backSubtitleClass = props.backTheme === 'primary' ? 'border-white/20' : 'border-slate-600 text-brand-primary';
    const backDescClass = props.backTheme === 'primary' ? 'text-white/90' : 'text-slate-300';
    const backListItemClass = props.backTheme === 'primary' ? '' : 'text-slate-200';
    const backListIconClass = props.backTheme === 'primary' ? 'text-cyan-300' : 'text-brand-primary';
    const backBtnClass = props.backTheme === 'primary' ? 'bg-white text-brand-primary hover:bg-slate-100' : 'bg-brand-primary text-white hover:bg-brand-dark';

    return (
        <>
            <div className="group h-[450px] w-full [perspective:1000px] cursor-pointer"
                 onClick={() => !isModalOpen && setIsFlipped(!isFlipped)}>
                <div
                    className={`relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] will-change-transform ${isFlipped ? '[transform:rotateY(180deg)]' : '[@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]'} shadow-lg hover:shadow-2xl`}>

                    {/* PRZÓD KARTY */}
                    <div
                        className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] border border-slate-700 shadow-lg">
                        {props.backTheme === 'primary' && <div
                            className="absolute inset-0 border-2 border-brand-primary rounded-2xl z-20 pointer-events-none"></div>}
                        <picture className="absolute inset-0 w-full h-full">
                            <img src={props.frontImage} alt={props.frontTitle}
                                 className={`w-full h-full object-cover transition-transform duration-1000 will-change-transform ${isFlipped ? '' : '[@media(hover:hover)]:group-hover:scale-110'}`}
                                 loading="lazy"/>
                        </picture>
                        <div
                            className={`absolute inset-0 transition-opacity duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100 [@media(hover:hover)]:group-hover:opacity-0'}`}>
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 ${props.backTheme === 'primary' ? 'to-brand-primary/50' : 'to-slate-800/40'}`}></div>
                            <div
                                className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10">
                                {props.frontTag && <div
                                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">{props.frontTag}</div>}
                                <div
                                    className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white border border-white/20 shadow-xl">
                                    <Icon size={40}/></div>
                                <h4 className="text-2xl font-extrabold text-white mb-3 drop-shadow-md">{props.frontTitle}</h4>
                                <ul className="text-slate-100 text-sm mb-4 space-y-1.5 drop-shadow-md font-medium text-left max-w-xs mx-auto">
                                    {props.frontList.map((item, idx) => <li key={idx}>{item}</li>)}
                                </ul>
                                <div
                                    className={`mt-auto flex items-center font-semibold text-sm drop-shadow-md ${props.backTheme === 'primary' ? 'text-cyan-300 animate-pulse' : 'text-slate-300'}`}>Dotknij,
                                    aby poznać szczegóły <ArrowRight size={16} className="ml-2"/></div>
                            </div>
                        </div>
                    </div>

                    {/* TYŁ KARTY */}
                    <div
                        className={`absolute inset-0 h-full w-full rounded-2xl p-7 [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col justify-between ${backBgClass}`}>
                        <div>
                            <h3 className={`text-xs font-black uppercase tracking-widest mb-2 opacity-90 ${backSuperTitleClass}`}>{props.backTitle}</h3>
                            <h4 className={`text-lg font-bold mb-3 border-b pb-3 ${backSubtitleClass}`}>{props.backSubtitle}</h4>
                            <p className={`mb-4 leading-relaxed text-xs sm:text-sm ${backDescClass}`}>{props.backDescription}</p>
                            <ul className="space-y-2">
                                {props.backList.map((item, idx) => (
                                    <li key={idx}
                                        className={`flex items-start text-xs sm:text-sm ${backListItemClass}`}>
                                        <CheckCircle2 size={16}
                                                      className={`mr-2 mt-0.5 flex-shrink-0 ${backListIconClass}`}/> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            setIsModalOpen(true);
                        }}
                                className={`w-full py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center group/btn active:scale-95 ${backBtnClass}`}>
                            Pełny opis technologii <ArrowRight size={18}
                                                               className="ml-2 group-hover/btn:translate-x-1 transition-transform"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={() => {
                    setIsModalOpen(false);
                    setCsEmail('');
                    setCsStatus('idle');
                }}>
                    <div
                        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"></div>
                    <div
                        className="relative bg-white rounded-[2rem] w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="h-2 w-full bg-brand-primary"></div>
                        <button onClick={() => {
                            setIsModalOpen(false);
                            setCsEmail('');
                            setCsStatus('idle');
                        }}
                                className="absolute top-6 right-6 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all hover:rotate-90">
                            <X size={24}/></button>

                        <div className="overflow-y-auto overflow-x-hidden max-h-[calc(85vh-8px)] p-8 sm:p-12 relative">
                            <div
                                className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
                            <div className="relative z-10">
                                <div
                                    className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    <Icon size={32}/></div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">{props.modalTitle}</h2>
                                <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                                    <div
                                        className="bg-slate-50 p-6 rounded-2xl border-l-4 border-brand-primary italic text-lg text-slate-700">"{props.modalQuote}"
                                    </div>
                                    {props.modalDescription}
                                    <h4 className="text-xl font-bold text-slate-900">Dlaczego warto wybrać tę
                                        metodę?</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                                        {props.modalFeatures.map((feat, idx) => (
                                            <li key={idx}
                                                className="flex items-center p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                                <CheckCircle2 className="text-green-500 mr-3" size={20}/> {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {props.preDownloadText && (
                                    <div
                                        className="mt-6 text-slate-600 text-[15px] leading-relaxed border-l-[3px] border-brand-primary/40 pl-4 py-1">
                                        {props.preDownloadText}
                                    </div>
                                )}

                                {/* FORMULARZ PRZED WYCENĄ - POBIERANIE CASE STUDY Z OBSŁUGĄ BŁĘDÓW */}
                                <div
                                    className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-inner">
                                    <div className="flex items-start space-x-3.5">
                                        <div
                                            className="w-11 h-11 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <Download size={22}/>
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-slate-900">Zobacz analizę problemów
                                                i możliwości ich usunięcia</h4>
                                            <p className="text-xs text-slate-500 leading-normal mt-0.5">Wpisz e-mail,
                                                aby pobrać plik PDF.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 mt-4">
                                        {/* KONTENER NR 1: Trzyma tylko input i przycisk obok siebie */}
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="email"
                                                placeholder="Twój adres e-mail"
                                                value={csEmail}
                                                onChange={(e) => setCsEmail(e.target.value)}
                                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-sm transition-all"
                                            />
                                            <button
                                                onClick={handleCaseStudyDownload}
                                                disabled={!isEmailValid || csStatus === 'loading'}
                                                className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-all shadow-md group disabled:opacity-50 disabled:cursor-not-allowed ${
                                                    csStatus === 'success' ? 'bg-green-600 text-white' :
                                                        csStatus === 'error' ? 'bg-red-600 text-white shadow-red-600/20' :
                                                            'bg-brand-primary hover:bg-brand-dark text-white'
                                                }`}
                                            >
                                                {csStatus === 'loading' ? (
                                                    <><Loader2 className="animate-spin mr-2"
                                                               size={16}/> Pobieranie...</>
                                                ) : csStatus === 'success' ? (
                                                    <><CheckCircle2 className="mr-2" size={16}/> Pobrano pomyślnie!</>
                                                ) : csStatus === 'error' ? (
                                                    <><AlertCircle className="mr-2" size={16}/> Brak pliku</>
                                                ) : (
                                                    <>Pobierz materiały <ArrowRight size={16}
                                                                                    className="ml-2 group-hover:translate-x-0.5 transition-transform"/></>
                                                )}
                                            </button>
                                        </div>

                                        {/* KONTENER NR 2: Tekst informacyjny, bezpiecznie w nowej linii pod spodem */}
                                        <p className="text-center text-[11px] text-slate-400 mt-3 leading-relaxed w-full">
                                            Pobierając materiały, zapisujesz się do darmowego newslettera edukacyjnego.
                                            Szanujemy Twój czas – zero spamu, a wypisać możesz się w każdej chwili jednym kliknięciem.
                                        </p>

                                    </div>
                                </div>

                                {/* „PÓŹNIEJ TROCHĘ TEKSTU” - TERAZ POBIERANE DYNAMICZNIE Z PROPSA */}
                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    {props.modalFormText}
                                </div>

                                <QuickSurveyForm serviceName={props.formServiceName}/>
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
        frontTitle="Hydroizolacje Dachów i Tarasów"
        frontList={[
            '• pełna szczelność',
            '• suchy budynek',
            '• trwałe zabezpieczenie'
        ]}
        backTheme="primary"
        backTitle="Hydroizolacje Dachów i Tarasów"
        backSubtitle="Szczelność, za którą bierzemy odpowiedzialność."
        backDescription="Tworzymy w 100% szczelne, bezspoinowe powłoki chroniące przed wodą. Idealne do naprawy przeciekających dachów płaskich."
        backList={['Brak szwów i łączeń (miejsc przecieków)', 'Odporność na mrozy i UV', 'Błyskawiczny czas realizacji']}
        modalTitle="Systemy Hydroizolacji Płynnych"
        modalQuote="Pamiętaj, dach nie przecieka wtedy, gdy nie ma gdzie puścić wody.”"
        modalDescription={<p>Zastosuj u siebie systemy hydroizolacji płynnych dla dachów, tarasów i obiektów
            technicznych, gdzie liczy się trwałość, szczelność i ograniczenie ryzyka kosztownych awarii.</p>}
        modalFeatures={['100% bezspoinowości', 'Odporność na stojącą wodę', 'Do 25 lat trwałości', 'Refleksyjność i niższe nagrzewanie dachu', 'Możliwość aplikacji bez zrywania starego pokrycia', 'Krótsze wyłączenie obiektu z użytkowania']}
        formServiceName="Hydroizolacje Dachów i Tarasów"
        formPlaceholder="Opisz obiekt (np. przeciekający dach papowy, woda stoi po opadach, zależy na czasie...)"
        caseStudyFileName="hydroizolacje-technologia-w-akcji.pdf"
        preDownloadText={
            <p>
                Nasza technologia opiera się na nowoczesnych membranach płynnych, które po aplikacji tworzą jednolitą,
                „gumową” powłokę na całej powierzchni dachu lub tarasu. Jest to nowatorska technologia, opracowana dla
                klientów, którzy chcą rozsądnie gospodarować budżetem.
            </p>
        }
        modalFormText={
            <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900">Większość problemów z przeciekami nie wynika z samego
                    materiału.</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Woda najczęściej nie pojawia się „na środku dachu”. Problemy zaczynają się:
                </p>
                <ul className="space-y-1.5 ml-2">
                    {['na łączeniach,', 'zakładkach,', 'obróbkach,', 'przejściach technicznych,', 'miejscach pracy konstrukcji,', 'źle wykonanych naprawach punktowych.'].map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                            <span className="text-brand-primary mr-2 font-bold">•</span> {item}
                        </li>
                    ))}
                </ul>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Klasyczne systemy zgrzewane często po latach stają się źródłem kolejnych awarii. Jeśli opiekujesz
                    się dachem lub projektujesz dachy, na pewno znasz to zagrożenie z praktyki.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    System membran płynnych eliminuje ten problem, tworząc jednolitą, elastyczną powłokę bez spoin i
                    słabych punktów.
                </p>

                <h5 className="text-base font-bold text-slate-900 pt-2">Kto najbardziej skorzysta z tego
                    rozwiązania?</h5>
                <ul className="space-y-1.5 ml-2">
                    {['zarządcy nieruchomości,', 'wspólnoty mieszkaniowe,', 'obiekty przemysłowe,', 'obiekty publiczne,', 'inwestorzy modernizujący istniejące pokrycia.'].map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                            <CheckCircle2 size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0"/> {item}
                        </li>
                    ))}
                </ul>
            </div>
        }
    />
);

export const ServiceCard2 = () => (
    <BaseServiceCard
        frontImage={imgUsluga2}
        frontIcon={PaintRoller}
        frontTitle="Malowanie Hydrodynamiczne"
        frontList={[
            '• szybka realizacja',
            '• idealne krycie',
            '• brak przestojów'
        ]}
        backTheme="primary"
        backTitle="Malowanie Hydrodynamiczne"
        backSubtitle="Prace wykończeniowe w obiektach wielkopowierzchniowych."
        backDescription="Idealnie gładkie powierzchnie bez smug. Malujemy hale, magazyny i elewacje w rekordowym czasie."
        backList={['Wydajność do 1000m² dziennie', 'Doskonałe krycie detali i zakamarków', 'Oszczędność materiału do 20%']}
        modalTitle="Malowanie Natryskowe (Agregatem)"
        modalQuote="Rozwiązanie dedykowane dla inwestycji, gdzie liczy się czas i bezbłędna estetyka na dużych płaszczyznach."
        modalDescription={<p>Wykorzystujemy profesjonalne agregaty hydrodynamiczne, które tłoczą farbę pod wysokim
            ciśnieniem bez użycia powietrza. Pozwala to na uzyskanie idealnej struktury bez "chmurek" i smug typowych
            dla wałka.</p>}
        modalFeatures={['Idealna struktura bez smug', 'Wydajność do 1000m² dziennie', 'Doskonałe krycie detali', 'Oszczędność farby do 20%']}
        formServiceName="Malowanie Natryskowe"
        formPlaceholder="Opisz obiekt (np. hala magazynowa, malowanie ścian i sufitu wewnątrz, szukamy wolnego terminu...)"
        caseStudyFileName="malowanie-natryskowe-technologia-w-akcji.pdf"
        modalFormText={
            <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900">Tradycyjne metody malowania wielkich powierzchni to
                    strata czasu i pieniędzy.</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Malowanie wałkiem na obiektach przemysłowych czy logistycznych generuje liczne problemy. Ujawniają
                    się one najczęściej jako:
                </p>
                <ul className="space-y-1.5 ml-2">
                    {['nierównomierne krycie i smugi widoczne pod światło,', 'przedłużające się przestoje w pracy obiektu,', 'znacznie wyższe zużycie materiału,', 'trudności z dokładnym pokryciem instalacji i konstrukcji stalowych.'].map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                            <span className="text-brand-primary mr-2 font-bold">•</span> {item}
                        </li>
                    ))}
                </ul>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Klasyczne podejście często kończy się koniecznością robienia poprawek i ukrytymi kosztami,
                    wynikającymi z długiego wyłączenia przestrzeni z użytku.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    Malowanie hydrodynamiczne odwraca tę sytuację – pozwala na aplikację farby pod wysokim ciśnieniem,
                    gwarantując idealną powłokę i skrócenie czasu pracy o kilkadziesiąt procent.
                </p>

                <h5 className="text-base font-bold text-slate-900 pt-2">Kto najbardziej skorzysta z tego
                    rozwiązania?</h5>
                <ul className="space-y-1.5 ml-2">
                    {['generalni wykonawcy i deweloperzy,', 'zarządcy hal produkcyjnych i magazynów,', 'właściciele obiektów komercyjnych i biurowych,', 'inwestorzy wymagający błyskawicznej realizacji.'].map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                            <CheckCircle2 size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0"/> {item}
                        </li>
                    ))}
                </ul>
            </div>
        }
    />
);

export const ServiceCard3 = () => (
    <BaseServiceCard
        frontImage={imgUsluga3}
        frontIcon={Layers}
        frontTitle="Gładzie Polimerowe"
        frontList={[
            '• idealna gładkość',
            '• minimalne pylenie',
            '• szybka realizacja'
        ]}
        backTheme="primary"
        backTitle="Gładzie Polimerowe"
        backSubtitle="Szybkość, powtarzalność i jakość możliwa do skontrolowania."
        backDescription="Idealnie równe ściany w ułamku czasu. Gwarancja perfekcyjnego przygotowania powierzchni."
        backList={['Perfekcyjna gładkość (Q3/Q4)', 'Znacznie mniejsze pylenie', 'Wysoka twardość i odporność']}
        modalTitle="Natryskowe Gładzie Polimerowe"
        modalQuote="Gładzie polimerowe aplikowane natryskowo to obecnie najwyższy standard przygotowania ścian pod malowanie lub tapetowanie."
        modalDescription={<p>Dzięki maszynowej aplikacji warstwa jest idealnie równa na całej płaszczyźnie, co eliminuje
            ryzyko powstawania nierówności widocznych pod światło na dużych powierzchniach.</p>}
        modalFeatures={['Perfekcyjna gładkość (Q3/Q4)', 'Idealnie równa warstwa', 'Znacznie mniejsze pylenie', 'Wysoka twardość ściany']}
        formServiceName="Gładzie Polimerowe"
        formPlaceholder="Opisz obiekt (np. nowe biura, ściany działowe z karton-gipsu, wysoki standard wykończenia...)"
        caseStudyFileName="gladzie-natryskowe-technologia-w-akcji.pdf"
        modalFormText={
            <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900">Ręczne szpachlowanie nie gwarantuje powtarzalnej
                    jakości na dużych inwestycjach.</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Przy dużych metrażach tradycyjne metody nakładania gładzi szybko obnażają swoje słabości. Błędy i
                    niedociągnięcia widać przeważnie:
                </p>
                <ul className="space-y-1.5 ml-2">
                    {['przy bocznym oświetleniu (fale i wyraźne smugi),', 'w postaci mikropęknięć na łączeniach płyt,', 'w ogromnym zapyleniu obiektu podczas długotrwałego szlifowania,', 'w drastycznym wydłużeniu harmonogramu prac wykończeniowych.'].map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                            <span className="text-brand-primary mr-2 font-bold">•</span> {item}
                        </li>
                    ))}
                </ul>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Tradycyjne mieszanki gipsowe wymagają czasu, a błąd ludzki przy ręcznym zaciąganiu bezpośrednio
                    rzutuje na ostateczny wygląd drogich farb, tapet i oświetlenia.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    Natryskowe gładzie polimerowe eliminują te błędy – tworzą twardą, idealnie równą (standard Q3/Q4) i
                    elastyczną warstwę, drastycznie przyspieszając etap wykończenia.
                </p>

                <h5 className="text-base font-bold text-slate-900 pt-2">Kto najbardziej skorzysta z tego
                    rozwiązania?</h5>
                <ul className="space-y-1.5 ml-2">
                    {['firmy deweloperskie i wykończeniowe,', 'inwestorzy biurowi i hotelowi,', 'placówki edukacyjne i medyczne,', 'osoby oczekujące bezbłędnej estetyki w standardzie premium.'].map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                            <CheckCircle2 size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0"/> {item}
                        </li>
                    ))}
                </ul>
            </div>
        }
    />
);

export const ServiceCard4 = () => (
    <BaseServiceCard
        frontImage={imgUsluga4}
        frontIcon={Droplets}
        frontTitle="Posadzki Żywiczne"
        frontList={[
            '• brak pylenia',
            '• łatwe czyszczenie',
            '• najwyższa trwałość'
        ]}
        backTheme="primary"
        backTitle="Posadzki Żywiczne"
        backSubtitle="Trwałość i estetyka bez kompromisów."
        backDescription="Tworzymy niezwykle odporne posadzki epoksydowe i poliuretanowe, idealne do hal, magazynów oraz nowoczesnych wnętrz."
        backList={['Wysoka odporność mechaniczna', 'Łatwość w utrzymaniu czystości', 'Brak spoin i łączeń']}
        modalTitle="Systemy Posadzek Żywicznych"
        modalQuote="Posadzka, która zniesie największe obciążenia, zachowując przy tym nienaganny wygląd przez lata."
        modalDescription={<p>Aplikujemy profesjonalne posadzki żywiczne, precyzyjnie dopasowując grubość i właściwości
            systemu do specyfiki danego obiektu – od intensywnie użytkowanych hal produkcyjnych po estetyczne garaże i
            przestrzenie komercyjne.</p>}
        modalFeatures={['Ekstremalna odporność na ścieranie', 'Powłoka antypoślizgowa (opcja)', 'Odporność na chemię i oleje', 'Szeroka paleta kolorów']}
        formServiceName="Posadzki Żywiczne"
        formPlaceholder="Opisz obiekt (np. hala produkcyjna 200m2, stary beton, poszukujemy odporności chemicznej...)"
        caseStudyFileName="posadzki-zywiczne-technologia-w-akcji.pdf"
        modalFormText={
            <div className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900">Niezabezpieczony beton z czasem pyli, pęka i chłonie
                    zabrudzenia jak gąbka.</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Posadzki w warunkach intensywnego użytkowania poddawane są skrajnym obciążeniom. Najpoważniejsze
                    wyzwania to najczęściej:
                </p>
                <ul className="space-y-1.5 ml-2">
                    {['głębokie, trudne do usunięcia plamy z olejów i agresywnej chemii,', 'odspajanie i łuszczenie się cienkich powłok malarskich,', 'ciągłe pylenie podłoża, które niszczy sprzęt i maszyny,', 'trudności z utrzymaniem rygorystycznych norm higieny.'].map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                            <span className="text-brand-primary mr-2 font-bold">•</span> {item}
                        </li>
                    ))}
                </ul>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Tanie metody zabezpieczenia podłoża sprawdzają się zaledwie na chwilę, a późniejsza naprawa
                    zniszczonej płyty w trakcie funkcjonowania zakładu jest niesamowicie kosztowna i skomplikowana
                    logistycznie.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    Profesjonalnie dobrana posadzka żywiczna rozwiązuje te problemy, tworząc szczelną, bezspoinową
                    barierę, odporną na ścieranie, uderzenia i chemię przez wiele lat.
                </p>

                <h5 className="text-base font-bold text-slate-900 pt-2">Kto najbardziej skorzysta z tego
                    rozwiązania?</h5>
                <ul className="space-y-1.5 ml-2">
                    {['zakłady produkcyjne i przemysłowe,', 'warsztaty i serwisy samochodowe,', 'obiekty logistyczne z ruchem wózków widłowych,', 'przestrzenie komercyjne, garaże i wystawiennictwo.'].map((item, i) => (
                        <li key={i} className="flex items-start text-sm text-slate-600">
                            <CheckCircle2 size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0"/> {item}
                        </li>
                    ))}
                </ul>
            </div>
        }
    />
);