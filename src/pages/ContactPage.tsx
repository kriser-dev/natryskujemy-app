import { useState, type SubmitEvent } from 'react';
import { MapPin, CheckCircle2, PhoneCall, Mail, Send, Loader2 } from 'lucide-react';
import { Facebook, Instagram, TikTokIcon, Youtube } from '../components/Icons';
import { SOCIAL_LINKS, CONTACT_INFO, TIMEOUTS } from '../config/constants';

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // ZMIANA: Używamy SubmitEvent zamiast React.FormEvent
    const handleFormSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            // Pamiętaj by podmienić ten adres przed wrzuceniem na docelowy serwer cal.pl!
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setFormStatus('success');
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setFormStatus('idle'), TIMEOUTS.FORM_SUCCESS_RESET);
            } else {
                console.error('Błąd serwera podczas wysyłania');
                setErrorMessage('Wystąpił problem z serwerem. Prosimy o kontakt telefoniczny.');
                setFormStatus('idle');
            }
        } catch (error) {
            console.error('Błąd połączenia:', error);
            setErrorMessage('Brak połączenia z serwerem. Prosimy o kontakt telefoniczny.');
            setFormStatus('idle');
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

                            <p className="text-xs text-slate-400 mt-4 text-center px-4 leading-relaxed">
                                Wysyłając wiadomość, wyrażasz zgodę na przetwarzanie swoich danych osobowych w celu obsługi zapytania. Szczegóły znajdziesz w naszej <a href="/polityka-prywatnosci" className="text-brand-primary hover:text-brand-dark hover:underline transition-colors">Polityce Prywatności</a>.
                            </p>
                        </form>
                    </div>

                    {/* Prawa kolumna - Dane kontaktowe */}
                    <div className="lg:w-2/5 bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-slate-900 mb-8">Bezpośredni kontakt</h3>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mr-4 flex-shrink-0">
                                    <PhoneCall size={24}/>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-500 mb-1">Doradztwo techniczne i wyceny</div>
                                    <div className="flex flex-col space-y-2">
                                        <a href={`tel:+${CONTACT_INFO.phone1Clean}`} className="text-2xl font-bold text-slate-900 hover:text-brand-primary transition-colors">{CONTACT_INFO.phone1}</a>
                                        <a href={`tel:+${CONTACT_INFO.phone2Clean}`} className="text-2xl font-bold text-slate-900 hover:text-brand-primary transition-colors">{CONTACT_INFO.phone2}</a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mr-4 flex-shrink-0">
                                    <Mail size={24}/>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-500 mb-1">Adres e-mail</div>
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg font-bold text-slate-900 hover:text-brand-primary transition-colors">{CONTACT_INFO.email}</a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mr-4 flex-shrink-0">
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
                                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white hover:shadow-lg hover:shadow-[#1877F2]/30 transition-all transform hover:-translate-y-1" title="Facebook"><Facebook size={22}/></a>
                                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:shadow-lg hover:shadow-[#dc2743]/30 transition-all transform hover:-translate-y-1" title="Instagram"><Instagram size={22}/></a>
                                    <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-1" title="TikTok"><TikTokIcon size={22}/></a>
                                    <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#FF0000] hover:text-white hover:shadow-lg hover:shadow-[#FF0000]/30 transition-all transform hover:-translate-y-1" title="YouTube"><Youtube size={22}/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}