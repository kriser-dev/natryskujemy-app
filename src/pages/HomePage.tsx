import React, {useState} from 'react';
import {
    MapPin, ArrowRight, Star, Play, Pause,
    HelpCircle, CheckCircle2, PhoneCall, Mail, Send, Loader2
} from 'lucide-react';
import {useAppContext} from '../context/useAppContext';
import {faqsData, opinionsData} from '../data';
import {FAQItem} from '../components/FAQItem';
import {ServiceCard1, ServiceCard2, ServiceCard3} from '../components/ServiceCards';
import {Facebook, Instagram, TikTokIcon, Youtube} from '../components/Icons';
import {SOCIAL_LINKS, CONTACT_INFO, TIMEOUTS} from '../config/constants';
import posterImage from '../assets/homeimage.webp';
import hydroDachu from '../assets/hydroizolacja-dachu.webp';

export default function HomePage() {
    const {navigateTo} = useAppContext();
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [isMarqueePaused, setIsMarqueePaused] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage(null);

        // Pobieramy dane z formularza
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            // TUTAJ JEST DOCELOWY ADRES NA SERWERZE (np. 'https://api.natryskujemy.pl/api/contact')
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Sukces: mail wysłany!
                setFormStatus('success');
                (e.target as HTMLFormElement).reset();
                // Ukrycie zielonego komunikatu po czasie zdefiniowanym w konfigu
                setTimeout(() => setFormStatus('idle'), TIMEOUTS.FORM_SUCCESS_RESET);
            } else {
                // Błąd serwera
                console.error('Błąd serwera podczas wysyłania');
                setErrorMessage('Wystąpił problem z serwerem. Prosimy o kontakt telefoniczny.');
                setFormStatus('idle');
            }
        } catch (error) {
            // Błąd sieci
            console.error('Błąd połączenia:', error);
            setErrorMessage('Brak połączenia z serwerem. Prosimy o kontakt telefoniczny.');
            setFormStatus('idle');
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
                {/* Video background */}
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

                {/* Dark overlay (lepszy kontrast) */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/60 z-10"></div>

                {/* Content */}
                <div className="relative z-20 w-full">
                    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

                        <div className="max-w-5xl">

                            {/* Badge */}
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-blue-100 font-medium text-sm mb-6 border border-white/20 backdrop-blur-sm">
                                <MapPin size={16} className="mr-2"/>
                                Działamy na terenie całego Śląska
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
                                Pewność wykonania hydroizolacji i prac natryskowych dla obiektów
                                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-300">
                        za które naprawdę odpowiadasz
                    </span>
                            </h1>

                            {/* Description */}
                            <p className="max-w-2xl text-lg md:text-xl text-slate-200 mb-10 leading-relaxed font-medium">
                                Pracujemy dla zarządców, spółdzielni, wspólnot i firm, które potrzebują trwałego rozwiązania, dobrej organizacji pracy i odpowiedzialności za efekt końcowy.
                            </p>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#kontakt"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigateTo('home', 'kontakt');
                                    }}
                                    className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center shadow-lg shadow-brand-primary/40"
                                >
                                    Zapraszamy do kontaktu
                                    <ArrowRight className="ml-2" size={20}/>
                                </a>

                                <a
                                    href="#uslugi"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigateTo('home', 'uslugi');
                                    }}
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all text-center backdrop-blur-md"
                                >
                                    Poznaj nasze usługi
                                </a>
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
                        <p className="text-slate-600 text-lg">Nie sprzedajemy „usługi”. Bierzemy odpowiedzialność za
                            efekt i trwałość realizacji. Dla obiektów, za które ktoś naprawdę odpowiada.</p>
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
                            <h2 className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-2">Firma
                                HydroPAKiet</h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold mb-6">Zakres prac dopasowany do obiektu,
                                nie do „pakietu usług”.</h3>
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
                            <div
                                className="relative rounded-2xl aspect-video overflow-hidden shadow-2xl border border-slate-700">
                                <img
                                    src={hydroDachu}
                                    alt="Nakładanie hydroizolacji na powierzchnię dachu"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {/* Delikatny niebieski filtr, aby zdjęcie pasowało do klimatu strony */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sekcja Opinii (Marquee) */}
            <section id="opinie" className="py-20 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Co mówią o nas klienci?</h2>
                        <p className="text-slate-600 text-lg mb-6">Najlepszą wizytówką naszej firmy jest zadowolenie
                            inwestorów i właścicieli budynków na Śląsku.</p>
                        <button
                            onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors text-xs font-bold"
                            aria-label={isMarqueePaused ? "Wznów animację" : "Zatrzymaj animację"}
                        >
                            {isMarqueePaused ? <Play size={14} className="mr-1.5"/> :
                                <Pause size={14} className="mr-1.5"/>}
                            {isMarqueePaused ? "Wznów przewijanie" : "Zatrzymaj przewijanie"}
                        </button>
                    </div>
                </div>

                <div className={`w-full relative marquee-mask ${isMarqueePaused ? 'marquee-paused' : ''}`}>
                    <div className="flex animate-scroll will-change-transform gap-6 py-4 px-4 w-max">
                        {[...opinionsData, ...opinionsData].map((op, index) => (
                            <div key={`opinion-${index}`}
                                 className="w-[320px] md:w-[450px] flex-shrink-0 bg-white p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                                <div className="flex text-yellow-400 mb-4">
                                    <Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star
                                    fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star
                                    fill="currentColor" size={20}/>
                                </div>
                                <p className="text-slate-700 italic mb-6 flex-grow leading-relaxed">"{op.text}"</p>
                                <div className="font-bold text-slate-900 flex items-center">
                                    <div
                                        className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mr-3 font-extrabold text-sm">{op.author.charAt(0)}</div>
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
                        <div
                            className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-6">
                            <HelpCircle size={16} className="mr-2"/> Baza Wiedzy
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Często Zadawane Pytania</h2>
                        <p className="text-slate-600 text-lg">Rozwiewamy wątpliwości. Zobacz, o co najczęściej pytają
                            nasi klienci przed rozpoczęciem współpracy.</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                        {faqsData.map((faq, index) => (
                            <FAQItem key={`faq-${index}-${faq.q.substring(0, 15).replace(/\s/g, '-')}`}
                                     id={`faq-${index}`} question={faq.q} answer={faq.a}/>
                        ))}
                    </div>
                </div>
            </section>

            {/* Kontakt */}
            <section id="kontakt" className="py-24 bg-brand-primary relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }}></div>
                </div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Porozmawiajmy o Twoim
                            obiekcie – zanim pojawi się problem</h2>
                        <p className="text-xl text-white/90">Zaczynamy od zrozumienia sytuacji technicznej, nie od
                            oferty.</p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-3/5 relative">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Zostaw kontakt i kilka informacji o obiekcie lub problemie. Wrócimy do Ciebie z informacją, jaki kolejny krok będzie najbardziej sensowny.</h3>

                            {formStatus === 'success' && (
                                <div
                                    className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                                    <div
                                        className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 size={32}/>
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Dziękujemy za zapytanie!</h4>
                                    <p className="text-slate-600">Wiadomość została wysłana pomyślnie.
                                        Skontaktujemy się z Tobą wkrótce.</p>
                                </div>
                            )}

                            <form onSubmit={handleFormSubmit}
                                  className={`space-y-6 transition-opacity duration-300 ${formStatus === 'success' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Imię
                                            i nazwisko / Firma</label>
                                        <input type="text" id="name" name="name" required minLength={3}
                                               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all disabled:bg-slate-50"
                                               placeholder="Jan Kowalski" disabled={formStatus === 'submitting'}/>
                                    </div>
                                    <div>
                                        <label htmlFor="phone"
                                               className="block text-sm font-medium text-slate-700 mb-2">
                                            Numer telefonu <span
                                            className="text-slate-400 font-normal text-xs ml-1">(opcjonalnie)</span>
                                        </label>
                                        <input type="tel" id="phone" name="phone" pattern="[0-9\-\+ ]{9,15}"
                                               title="Podaj prawidłowy numer telefonu"
                                               className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all disabled:bg-slate-50"
                                               placeholder="+48 000 000 000" disabled={formStatus === 'submitting'}/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Adres
                                        e-mail</label>
                                    <input type="email" id="email" name="email" required
                                           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all disabled:bg-slate-50"
                                           placeholder="biuro@twojafirma.pl" disabled={formStatus === 'submitting'}/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Szczegóły
                                        obiektu / Wyzwanie</label>
                                    <textarea id="message" name="message" rows={4} required minLength={10}
                                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none disabled:bg-slate-50"
                                              placeholder="Opisz w kilku słowach w czym możemy Ci pomóc..."
                                              disabled={formStatus === 'submitting'}></textarea>
                                </div>

                                {errorMessage && (
                                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl animate-in fade-in duration-300">
                                        <p className="text-sm font-medium">{errorMessage}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full sm:w-auto bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center shadow-lg shadow-brand-primary/30 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {formStatus === 'submitting' ? (
                                        <><Loader2 className="animate-spin mr-3" size={20}/> Przetwarzanie...</>
                                    ) : (
                                        <>Wyślij zapytanie <Send size={20}
                                                                 className="ml-3 group-hover:translate-x-1 transition-transform"/></>
                                    )}
                                </button>

                                <p className="text-xs text-slate-400 mt-4 text-center px-4 leading-relaxed">
                                    Wysyłając wiadomość, wyrażasz zgodę na przetwarzanie swoich danych osobowych w celu
                                    obsługi zapytania. Szczegóły znajdziesz w naszej <a href="/polityka-prywatnosci"
                                                                                        className="text-brand-primary hover:text-brand-dark hover:underline transition-colors">Polityce
                                    Prywatności</a>.
                                </p>

                            </form>
                        </div>

                        <div
                            className="lg:w-2/5 bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-slate-900 mb-8">Bezpośredni kontakt</h3>
                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div
                                        className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mr-4 flex-shrink-0">
                                        <PhoneCall size={24}/>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-slate-500 mb-1">Doradztwo techniczne i
                                            wyceny
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <a href={`tel:+${CONTACT_INFO.phone1Clean}`}
                                               className="text-2xl font-bold text-slate-900 hover:text-brand-primary transition-colors">{CONTACT_INFO.phone1}</a>
                                            <a href={`tel:+${CONTACT_INFO.phone2Clean}`}
                                               className="text-2xl font-bold text-slate-900 hover:text-brand-primary transition-colors">{CONTACT_INFO.phone2}</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div
                                        className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mr-4 flex-shrink-0">
                                        <Mail size={24}/>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-slate-500 mb-1">Adres e-mail</div>
                                        <a href={`mailto:${CONTACT_INFO.email}`}
                                           className="text-lg font-bold text-slate-900 hover:text-brand-primary transition-colors">{CONTACT_INFO.email}</a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div
                                        className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mr-4 flex-shrink-0">
                                        <MapPin size={24}/>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-slate-500 mb-1">Siedziba firmy</div>
                                        <div className="text-lg font-bold text-slate-900">{CONTACT_INFO.address1}</div>
                                        <div className="text-lg font-bold text-slate-900">{CONTACT_INFO.address2}</div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-200 mt-4">
                                    <div className="text-sm font-medium text-slate-500 mb-4">Znajdź nas w sieci</div>
                                    <div className="flex space-x-4">
                                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer"
                                           className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white hover:shadow-lg hover:shadow-[#1877F2]/30 transition-all transform hover:-translate-y-1"
                                           title="Facebook"><Facebook size={22}/></a>
                                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
                                           className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:shadow-lg hover:shadow-[#dc2743]/30 transition-all transform hover:-translate-y-1"
                                           title="Instagram"><Instagram size={22}/></a>
                                        <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer"
                                           className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-1"
                                           title="TikTok"><TikTokIcon size={22}/></a>
                                        <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer"
                                           className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#FF0000] hover:text-white hover:shadow-lg hover:shadow-[#FF0000]/30 transition-all transform hover:-translate-y-1"
                                           title="YouTube"><Youtube size={22}/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}