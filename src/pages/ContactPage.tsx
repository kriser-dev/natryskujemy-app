import { useState, useRef, useEffect, type SubmitEvent } from 'react';
import { MapPin, CheckCircle2, PhoneCall, Mail, Send, Loader2, X } from 'lucide-react';
import { Facebook, Instagram, TikTokIcon, Youtube } from '../components/Icons';
import { SOCIAL_LINKS, CONTACT_INFO, TIMEOUTS } from '../config/constants';
import { useAppContext } from '../context/useAppContext';

// ZDJĘCIA DORADCÓW - Pamiętaj by wrzucić te pliki do folderu src/assets/
import imgOsoba1 from '../assets/osoba1.webp';
import imgOsoba2 from '../assets/osoba2.webp';

// Dynamiczny adres URL z .env (zapasowo localhost)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ContactPage() {
    const { navigateTo } = useAppContext();

    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    // POPRAWKA: Typ 'number' zamiast 'NodeJS.Timeout' rozwiązuje błąd środowiska Vite
    const timeoutRef = useRef<number | null>(null);

    // Bezpieczne czyszczenie timeoutu przy odmontowywaniu komponentu
    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Obsługa klawisza Escape dla zamykania zdjęcia
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setEnlargedImage(null);
            }
        };
        if (enlargedImage) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [enlargedImage]);

    const handleFormSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage(null);

        const formElement = e.currentTarget;
        const formData = new FormData(formElement);

        // POPRAWKA: Bezpieczne typowanie danych wejściowych z formularza
        const data = {
            name: String(formData.get('name') ?? ''),
            phone: String(formData.get('phone') ?? ''),
            email: String(formData.get('email') ?? ''),
            message: String(formData.get('message') ?? ''),
        };

        const newsletterCheckbox = formElement.querySelector('#newsletterConsent') as HTMLInputElement | null;
        const wantsNewsletter = newsletterCheckbox ? newsletterCheckbox.checked : false;

        try {
            const contactPromise = fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const newsletterPromise = wantsNewsletter && data.email
                ? fetch(`${API_URL}/api/newsletter`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: data.email }),
                })
                : Promise.resolve(null);

            // Równoległa wysyłka (nie zawiesza interfejsu użytkownika)
            const [contactResult, newsletterResult] = await Promise.allSettled([
                contactPromise,
                newsletterPromise
            ]);

            if (contactResult.status === 'fulfilled') {
                const response = contactResult.value;
                const resultData = await response.json().catch(() => ({}));

                if (!response.ok) {
                    // Przechwycenie błędu biznesowego bezpośrednio z Twojego nowego backendu
                    throw new Error(resultData.error || 'Błąd serwera podczas wysyłania formularza');
                }
            } else {
                throw new Error('Błąd połączenia z serwerem. Spróbuj ponownie później.');
            }

            if (newsletterResult.status === 'fulfilled' && newsletterResult.value) {
                const res = newsletterResult.value;
                if (!res.ok) {
                    console.error('Błąd zapisu do newslettera');
                }
            }

            setFormStatus('success');
            formElement.reset(); // POPRAWKA: Bezpieczne resetowanie przez currentTarget

            timeoutRef.current = window.setTimeout(() => {
                setFormStatus('idle');
            }, TIMEOUTS.FORM_SUCCESS_RESET);

        } catch (error) {
            console.error('Błąd formularza kontaktowego:', error);
            setFormStatus('idle');

            // POPRAWKA: Eliminacja błędu ESLint "Unexpected any" za pomocą sprawdzenia instancji
            const errMessage = error instanceof Error
                ? error.message
                : 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.';

            setErrorMessage(errMessage);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 bg-brand-primary relative overflow-hidden animate-in fade-in duration-500">
            {/* Tło - Wzór kropek */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                }}></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Porozmawiajmy o Twoim obiekcie – zanim pojawi się problem</h1>
                    <p className="text-xl text-white/90">Zaczynamy od zrozumienia sytuacji technicznej, nie od oferty.</p>
                </div>

                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col lg:flex-row gap-12">
                    {/* Lewa kolumna - Formularz */}
                    <div className="lg:w-3/5 relative">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Zostaw kontakt i kilka informacji o obiekcie lub problemie. Wrócimy do Ciebie z informacją, jaki kolejny krok będzie najbardziej sensowny.</h3>

                        {formStatus === 'success' && (
                            <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={32}/>
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-2">Dziękujemy za zapytanie!</h4>
                                <p className="text-slate-600">Wiadomość została wysłana pomyślnie. Skontaktujemy się z Tobą wkrótce.</p>
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className={`space-y-6 transition-opacity duration-300 ${formStatus === 'success' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Imię i nazwisko / Firma</label>
                                    <input type="text" id="name" name="name" required minLength={3}
                                           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all disabled:bg-slate-50"
                                           placeholder="Jan Kowalski" disabled={formStatus === 'submitting'}/>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                                        Numer telefonu <span className="text-slate-400 font-normal text-xs ml-1">(opcjonalnie)</span>
                                    </label>
                                    <input type="tel" id="phone" name="phone" pattern="[0-9\-\+ ]{9,15}" title="Podaj prawidłowy numer telefonu"
                                           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all disabled:bg-slate-50"
                                           placeholder="+48 000 000 000" disabled={formStatus === 'submitting'}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Adres e-mail</label>
                                <input type="email" id="email" name="email" required
                                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all disabled:bg-slate-50"
                                       placeholder="biuro@twojafirma.pl" disabled={formStatus === 'submitting'}/>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Szczegóły obiektu / Wyzwanie</label>
                                <textarea id="message" name="message" rows={4} required minLength={10}
                                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none disabled:bg-slate-50"
                                          placeholder="Opisz w kilku słowach w czym możemy Ci pomóc..." disabled={formStatus === 'submitting'}></textarea>
                            </div>

                            {/* DODANY CHECKBOX NEWSLETTERA */}
                            <div className="flex items-start py-2">
                                <div className="flex items-center h-5 mt-0.5">
                                    <input
                                        id="newsletterConsent"
                                        name="newsletterConsent"
                                        type="checkbox"
                                        className="w-5 h-5 rounded-md border-slate-300 text-brand-primary focus:ring-brand-primary/50 transition-all cursor-pointer accent-brand-primary"
                                        disabled={formStatus === 'submitting'}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="newsletterConsent" className="font-medium text-slate-700 cursor-pointer select-none">
                                        Chcę otrzymywać materiały edukacyjne i oferty na e-mail
                                    </label>
                                    <p className="text-slate-500 text-xs mt-1">
                                        Zapisz się do newslettera. To w pełni opcjonalne, a z listy możesz wypisać się w każdej chwili jednym kliknięciem.
                                    </p>
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl animate-in fade-in duration-300">
                                    <p className="text-sm font-medium">{errorMessage}</p>
                                </div>
                            )}

                            <button type="submit" disabled={formStatus === 'submitting'}
                                    className="w-full sm:w-auto bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center shadow-lg shadow-brand-primary/30 group disabled:opacity-70 disabled:cursor-not-allowed">
                                {formStatus === 'submitting' ? (
                                    <><Loader2 className="animate-spin mr-3" size={20}/> Przetwarzanie...</>
                                ) : (
                                    <>Wyślij zapytanie <Send size={20} className="ml-3 group-hover:translate-x-1 transition-transform"/></>
                                )}
                            </button>

                            <p className="text-xs text-slate-400 mt-3 leading-relaxed text-center mx-auto max-w-2xl bg-slate-50 p-4 rounded-xl border border-slate-100">
                                Wysyłając wiadomość, wyrażasz zgodę na przetwarzanie swoich danych osobowych w celu obsługi zapytania. Szczegóły znajdziesz w naszej{' '}
                                <span
                                    onClick={() => navigateTo('privacy')}
                                    className="text-brand-primary hover:text-brand-dark underline cursor-pointer font-medium transition-colors"
                                >
                                    Polityce Prywatności
                                </span>.
                            </p>
                        </form>
                    </div>

                    {/* Prawa kolumna - Dane kontaktowe */}
                    <div className="lg:w-2/5 bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-slate-900 mb-8">Bezpośredni kontakt</h3>
                        <div className="space-y-8">

                            <div className="flex items-start">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-primary mr-5 flex-shrink-0 shadow-sm border border-slate-100">
                                    <PhoneCall size={24}/>
                                </div>
                                <div className="pt-1 flex-1">
                                    <div className="text-sm font-medium text-slate-500 mb-3">Doradztwo techniczne i wyceny</div>
                                    <div className="space-y-4">

                                        {/* Numer 1 z KLIKALNYM pierwszym zdjęciem */}
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="relative flex-shrink-0 cursor-pointer group"
                                                onClick={() => setEnlargedImage(imgOsoba1)}
                                                title="Kliknij, aby powiększyć zdjęcie"
                                            >
                                                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm bg-white group-hover:ring-2 group-hover:ring-brand-primary/40 transition-all duration-300">
                                                    <img src={imgOsoba1} alt="Doradca 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white rounded-full shadow-sm"></div>
                                            </div>
                                            <a href={`tel:+${CONTACT_INFO.phone1Clean}`} className="text-xl font-bold text-slate-900 hover:text-brand-primary transition-colors">
                                                {CONTACT_INFO.phone1}
                                            </a>
                                        </div>

                                        {/* Numer 2 z KLIKALNYM drugim zdjęciem */}
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="relative flex-shrink-0 cursor-pointer group"
                                                onClick={() => setEnlargedImage(imgOsoba2)}
                                                title="Kliknij, aby powiększyć zdjęcie"
                                            >
                                                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm bg-white group-hover:ring-2 group-hover:ring-brand-primary/40 transition-all duration-300">
                                                    <img src={imgOsoba2} alt="Doradca 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white rounded-full shadow-sm"></div>
                                            </div>
                                            <a href={`tel:+${CONTACT_INFO.phone2Clean}`} className="text-xl font-bold text-slate-900 hover:text-brand-primary transition-colors">
                                                {CONTACT_INFO.phone2}
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-primary mr-5 flex-shrink-0 shadow-sm border border-slate-100">
                                    <Mail size={24}/>
                                </div>
                                <div className="pt-1">
                                    <div className="text-sm font-medium text-slate-500 mb-1">Adres e-mail</div>
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg font-bold text-slate-900 hover:text-brand-primary transition-colors">{CONTACT_INFO.email}</a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-primary mr-5 flex-shrink-0 shadow-sm border border-slate-100">
                                    <MapPin size={24}/>
                                </div>
                                <div className="pt-1">
                                    <div className="text-sm font-medium text-slate-500 mb-1">Siedziba firmy</div>
                                    <div className="text-lg font-bold text-slate-900">{CONTACT_INFO.address1}</div>
                                    <div className="text-lg font-bold text-slate-900">{CONTACT_INFO.address2}</div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-200 mt-4">
                                <div className="text-sm font-medium text-slate-500 mb-5">Znajdź nas w sieci</div>
                                <div className="flex space-x-4">
                                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer"
                                       className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md shadow-[#1877F2]/20 hover:shadow-xl hover:shadow-[#1877F2]/40 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110"
                                       title="Facebook">
                                        <Facebook size={22}/>
                                    </a>
                                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
                                       className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md shadow-[#dc2743]/20 hover:shadow-xl hover:shadow-[#dc2743]/40 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110"
                                       title="Instagram">
                                        <Instagram size={22}/>
                                    </a>
                                    <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer"
                                       className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110"
                                       title="TikTok">
                                        <TikTokIcon size={22}/>
                                    </a>
                                    <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer"
                                       className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-md shadow-[#FF0000]/20 hover:shadow-xl hover:shadow-[#FF0000]/40 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110"
                                       title="YouTube">
                                        <Youtube size={22}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL (LIGHTBOX) Z POWIĘKSZONYM ZDJĘCIEM */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center p-4"
                    onClick={() => setEnlargedImage(null)}
                >
                    {/* Ciemne, rozmyte tło */}
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300"></div>

                    {/* Okienko powiększonego zdjęcia */}
                    <div
                        className="relative z-10 animate-in zoom-in-95 duration-300 flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()} // Zapobiega zamknięciu, gdy klikniesz na same zdjęcie
                    >
                        <button
                            onClick={() => setEnlargedImage(null)}
                            className="absolute -top-12 right-0 md:-right-12 p-2 text-white/70 hover:text-white hover:rotate-90 transition-all duration-300"
                        >
                            <X size={32} />
                        </button>

                        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white relative">
                            <img src={enlargedImage} alt="Powiększone zdjęcie doradcy" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}