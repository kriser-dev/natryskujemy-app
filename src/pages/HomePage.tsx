import { useState } from 'react';
import { MapPin, ArrowRight, Star, Play, Pause, HelpCircle, Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/useAppContext';
import { faqsData, opinionsData } from '../data';
import { FAQItem } from '../components/FAQItem';
import { ServiceCard1, ServiceCard2, ServiceCard3 } from '../components/ServiceCards';
import posterImage from '../assets/homeimage.webp';
import hydroDachu from '../assets/hydroizolacja-dachu.webp';

export default function HomePage() {
    const { navigateTo } = useAppContext();
    const [isMarqueePaused, setIsMarqueePaused] = useState(false);

    // Nowy stan dla przycisku pobierania
    const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Funkcja obsługująca bezpieczne pobieranie pliku
    const handleDownload = async () => {
        setDownloadStatus('loading');
        try {
            // Próbujemy pobrać plik
            const response = await fetch('/folder-reklamowy.pdf');

            // 1. Sprawdzenie czy serwer nie zgłosił twardego błędu (np. 404, 500)
            if (!response.ok) throw new Error('Błąd HTTP - serwer odrzucił żądanie');

            // 2. KRYTYCZNA POPRAWKA: Sprawdzamy typ (Content-Type) zwróconego pliku
            // Jeśli to HTML, to znaczy, że serwer Reacta podłożył nam stronę główną zamiast brakującego PDFa
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                throw new Error('Zamiast pliku PDF serwer zwrócił stronę HTML (brak pliku)');
            }

            // Dekodujemy plik
            const blob = await response.blob();

            // 3. Dodatkowe zabezpieczenie przed pustymi plikami (0 bajtów)
            if (blob.size === 0) throw new Error('Pobrany plik jest pusty');

            // Wymuszamy pobranie zweryfikowanego pliku
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'HydroPAKiet-folder-ofertowy.pdf'; // Nazwa docelowa pliku
            document.body.appendChild(a);
            a.click();

            // Sprzątanie pamięci
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Pokazujemy sukces
            setDownloadStatus('success');
            setTimeout(() => setDownloadStatus('idle'), 3000);

        } catch (error) {
            console.error('Błąd pobierania pliku:', error);
            // Pokazujemy błąd (czerwony przycisk) i blokujemy pobranie śmieciowego pliku
            setDownloadStatus('error');
            setTimeout(() => setDownloadStatus('idle'), 5000);
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            <style>{`
        section[id] { scroll-margin-top: 80px; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 40s linear infinite; width: max-content; }
        .animate-scroll:hover { animation-play-state: paused; }
        .marquee-mask { -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
        .marquee-paused .animate-scroll { animation-play-state: paused !important; }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll { animation: none !important; transform: translateX(0) !important; flex-wrap: wrap; justify-content: center; }
          .marquee-mask { mask-image: none; -webkit-mask-image: none; }
        }
      `}</style>

            {/* Schema.org dla SEO */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "LocalBusiness",
                            "name": "natryskujemy.pl (HydroPAKiet)",
                            "image": "https://natryskujemy.pl/images/logo.webp",
                            "telephone": [
                                "+48 504 056 342",
                                "+48 690 080 708"
                            ],
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "ul. Legionów 37c",
                                "addressLocality": "Tarnowskie Góry",
                                "postalCode": "42-600",
                                "addressCountry": "PL"
                            }
                        },
                        {
                            "@type": "FAQPage",
                            "mainEntity": faqsData.map(faq => ({
                                "@type": "Question",
                                "name": faq.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.a
                                }
                            }))
                        }
                    ]
                })
            }}/>

            {/* Sekcja Hero */}
            <section className="relative bg-slate-900 overflow-hidden min-h-screen flex items-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    fetchPriority="high"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    poster={posterImage}
                >
                    <source src="/homevideo.mp4" type="video/mp4"/>
                </video>

                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/60 z-10"></div>

                <div className="relative z-20 w-full">
                    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="max-w-5xl">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 border border-white/20 backdrop-blur-sm">
                                <MapPin size={16} className="mr-2"/>
                                Działamy na terenie całego Śląska
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
                                Pewność wykonania hydroizolacji i prac natryskowych dla obiektów
                                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-300">
                                    za które naprawdę odpowiadasz
                                </span>
                            </h1>

                            <p className="max-w-2xl text-lg md:text-xl text-slate-200 mb-10 leading-relaxed font-medium">
                                Pracujemy dla zarządców, spółdzielni, wspólnot i firm, które potrzebują trwałego rozwiązania, dobrej organizacji pracy i odpowiedzialności za efekt końcowy.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="/kontakt"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigateTo('contact');
                                    }}
                                    className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center shadow-lg shadow-brand-primary/40"
                                >
                                    Skontaktuj się z nami
                                    <ArrowRight className="ml-2" size={20}/>
                                </a>

                                <a
                                    href="/#uslugi"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigateTo('home', 'uslugi');
                                    }}
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all text-center backdrop-blur-md"
                                >
                                    Poznaj nasze usługi
                                </a>

                                {/* INTELIGENTNY PRZYCISK POBIERANIA */}
                                <button
                                    onClick={handleDownload}
                                    disabled={downloadStatus === 'loading'}
                                    className={`group px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center text-center backdrop-blur-md border duration-300 ${
                                        downloadStatus === 'error'
                                            ? 'bg-red-500/20 text-red-100 border-red-500/50 hover:bg-red-500/30'
                                            : downloadStatus === 'success'
                                                ? 'bg-green-500/20 text-green-100 border-green-500/50'
                                                : 'bg-white/5 hover:bg-white/15 text-cyan-50 border-cyan-200/30 disabled:opacity-70 disabled:cursor-not-allowed'
                                    }`}
                                >
                                    {downloadStatus === 'loading' && (
                                        <><Loader2 className="mr-3 animate-spin text-cyan-300" size={20}/> Pobieranie...</>
                                    )}
                                    {downloadStatus === 'success' && (
                                        <><CheckCircle2 className="mr-2 text-green-400" size={20}/> Pomyślnie pobrano!</>
                                    )}
                                    {downloadStatus === 'error' && (
                                        <><AlertCircle className="mr-2 text-red-400" size={20}/> Plik chwilowo niedostępny</>
                                    )}
                                    {downloadStatus === 'idle' && (
                                        <>Pobierz folder ofertowy <Download className="ml-3 group-hover:-translate-y-1 transition-transform text-cyan-300" size={20}/></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sekcja Usługi */}
            <section id="uslugi" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Nasze usługi</h2>
                        <p className="text-slate-600 text-lg">Nie sprzedajemy „usługi”. Bierzemy odpowiedzialność za efekt i trwałość realizacji. Dla obiektów, za które ktoś naprawdę odpowiada.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ServiceCard1/>
                        <ServiceCard2/>
                        <ServiceCard3/>
                    </div>
                </div>
            </section>

            {/* Sekcja O nas */}
            <section id="o-nas" className="py-20 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-2">Firma HydroPAKiet</h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold mb-6">Zakres prac dopasowany do obiektu, nie do „pakietu usług”.</h3>
                            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                                Każdą realizację traktujemy jak projekt – z analizą, doborem technologii i kontrolą
                                wykonania. Klienci wybierają nas wtedy, gdy liczy się nie tylko wykonanie usługi, ale też sposób prowadzenia całego tematu: rzetelna ocena sytuacji, dobór właściwego rozwiązania, terminowość i odpowiedzialność za jakość pracy. Za marką <strong>natryskujemy.pl</strong> stoi rzetelność i doświadczenie
                                firmy HydroPAKiet.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mt-10">
                                <div>
                                    <div className="text-4xl font-extrabold text-brand-primary mb-2">1000+</div>
                                    <div className="text-slate-400 font-medium">Zrealizowanych projektów</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-extrabold text-brand-primary mb-2">20+</div>
                                    <div className="text-slate-400 font-medium">Lat doświadczenia</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <div className="relative rounded-2xl aspect-video overflow-hidden shadow-2xl border border-slate-700">
                                <img
                                    src={hydroDachu}
                                    alt="Nakładanie hydroizolacji na powierzchnię dachu"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sekcja Opinii */}
            <section id="opinie" className="py-20 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Co mówią o nas klienci?</h2>
                        <p className="text-slate-600 text-lg mb-6">Najlepszą wizytówką naszej firmy jest zadowolenie inwestorów i właścicieli budynków na Śląsku.</p>
                        <button
                            onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors text-xs font-bold"
                            aria-label={isMarqueePaused ? "Wznów animację" : "Zatrzymaj animację"}
                        >
                            {isMarqueePaused ? <Play size={14} className="mr-1.5"/> : <Pause size={14} className="mr-1.5"/>}
                            {isMarqueePaused ? "Wznów przewijanie" : "Zatrzymaj przewijanie"}
                        </button>
                    </div>
                </div>

                <div className={`w-full relative marquee-mask ${isMarqueePaused ? 'marquee-paused' : ''}`}>
                    <div className="flex animate-scroll will-change-transform gap-6 py-4 px-4 w-max">
                        {[...opinionsData, ...opinionsData].map((op, index) => (
                            <div key={`opinion-${index}`} className="w-[320px] md:w-[450px] flex-shrink-0 bg-white p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                                <div className="flex text-yellow-400 mb-4">
                                    <Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/>
                                </div>
                                <p className="text-slate-700 italic mb-6 flex-grow leading-relaxed">"{op.text}"</p>
                                <div className="font-bold text-slate-900 flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mr-3 font-extrabold text-sm">{op.author.charAt(0)}</div>
                                    {op.author}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sekcja FAQ */}
            <section id="faq" className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-6">
                            <HelpCircle size={16} className="mr-2"/> Baza Wiedzy
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Często Zadawane Pytania</h2>
                        <p className="text-slate-600 text-lg">Rozwiewamy wątpliwości. Zobacz, o co najczęściej pytają nasi klienci przed rozpoczęciem współpracy.</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                        {faqsData.map((faq, index) => (
                            <FAQItem key={`faq-${index}-${faq.q.substring(0, 15).replace(/\s/g, '-')}`} id={`faq-${index}`} question={faq.q} answer={faq.a}/>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}