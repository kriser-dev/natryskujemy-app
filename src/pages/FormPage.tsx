import {useState, useEffect, type SubmitEvent} from 'react';
import {
    CheckCircle2,
    Send,
    Loader2,
    ClipboardList,
    FileText,
    User,
    Phone,
    Mail,
    Box,
    MessageSquare
} from 'lucide-react';
import {useAppContext} from '../context/useAppContext';

export default function FormPage() {
    const {navigateTo} = useAppContext();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Stany dla pól formularza

    // 1. Zapamiętujemy, czy użytkownik wszedł z kafelka (true/false)
    const [isServicePreselected] = useState(() => !!localStorage.getItem('selectedService'));

    // 2. Pobieramy nazwę usługi (jeśli jest)
    const [serviceType, setServiceType] = useState(() => localStorage.getItem('selectedService') || '');

    // 3. Sprzątamy pamięć w tle.
    // Uwaga: Używamy useEffect tylko do sprzątania (nie ma tu setState, więc nie wywoła to błędów lintera ani podwójnego renderowania!)
    useEffect(() => {
        localStorage.removeItem('selectedService');
    }, []);

    const [area, setArea] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        // Konstruujemy obiekt danych identyczny z tym, co przyjmuje server.js
        const data = {
            name,
            email,
            phone,
            message,
            serviceType,
            area
        };

        // --- NOWE 1: Pobieramy stan checkboxa newslettera z formularza ---
        const formEl = e.currentTarget;
        const newsletterCheckbox = formEl.querySelector('#newsletterConsent') as HTMLInputElement | null;
        const wantsNewsletter = newsletterCheckbox ? newsletterCheckbox.checked : false;

        try {
            // Strzał do Twojego gotowego serwera node.js
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if (response.ok) {

                // --- NOWE 2: Jeśli klient zaznaczył checkbox, zapisujemy go do MailerLite ---
                if (wantsNewsletter && email) {
                    try {
                        await fetch('http://localhost:3000/api/newsletter', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({email: email})
                        });
                    } catch (mlErr) {
                        console.error('Błąd zapisu do newslettera z formularza wyceny:', mlErr);
                    }
                }
                // -----------------------------------------------------------------------------

                setStatus('success');
                // Czyszczenie pól po sukcesie (Twój kod)
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
                setArea('');
                setServiceType('');
            } else {
                console.error('Błąd serwera podczas wysyłania formularza');
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Błąd połączenia z backendem:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    if (status === 'success') {
        return (
            <div
                className="min-h-screen pt-32 pb-24 bg-slate-50 flex items-center justify-center px-4 animate-in zoom-in-95 duration-300">
                <div
                    className="max-w-xl w-full bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-2xl text-center flex flex-col items-center">
                    <div
                        className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <CheckCircle2 size={40}/>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Formularz wysłany!</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Dziękujemy za przesłanie szczegółów dotyczących Twojego obiektu. Nasi inżynierowie przystąpili
                        już do analizy technicznej. Skontaktujemy się z Tobą najszybciej jak to możliwe, aby omówić
                        szczegóły.
                    </p>
                    <button
                        onClick={() => navigateTo('home')}
                        className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm"
                    >
                        Wróć do strony głównej
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-slate-50 animate-in fade-in duration-500">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Nagłówek strony */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                        Zapytanie o szczegółową ofertę
                    </h1>
                    <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
                        Przeanalizujemy specyfikę architektoniczną Twojego obiektu i przygotujemy dla Ciebie dedykowaną,
                        kompleksową ofertę.
                    </p>
                </div>

                {/* Główny kontener formularza */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* SEKCJA 1: Szczegóły techniczne inwestycji */}
                        <div>
                            <div className="flex items-center space-x-2 pb-3 mb-6 border-b border-slate-100">
                                <ClipboardList className="text-brand-primary" size={20}/>
                                <h3 className="text-lg font-bold text-slate-900">1. Zakres prac i dane obiektu</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Rodzaj
                                        usługi</label>

                                    {isServicePreselected ? (
                                        // WERSJA A: Jeśli użytkownik przyszedł z kafelka - pokazujemy piętrowy układ
                                        <div
                                            className="w-full px-4 py-3 rounded-xl border border-brand-primary/30 bg-brand-primary/5 shadow-inner flex flex-col items-start gap-2">
                                            <span
                                                className="flex items-start sm:items-center text-slate-900 font-bold text-sm leading-snug">
                                                <Box size={16}
                                                     className="text-brand-primary mr-2.5 mt-0.5 sm:mt-0 flex-shrink-0"/>
                                                {serviceType}
                                            </span>
                                            <span
                                                className="text-[10px] bg-brand-primary/15 text-brand-primary px-2.5 py-1 rounded-full font-bold uppercase tracking-wider select-none ml-6">
                                                Wybrana usługa
                                            </span>
                                        </div>
                                    ) : (
                                        // WERSJA B: Jeśli wszedł na stronę bezpośrednio - pokazujemy tradycyjną listę wyboru
                                        <div className="relative">
                                            <select
                                                required
                                                value={serviceType}
                                                onChange={(e) => setServiceType(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all appearance-none bg-white text-sm"
                                            >
                                                <option value="">-- Wybierz usługę --</option>
                                                <option value="Hydroizolacje Dachów i Tarasów">Hydroizolacje Dachów i
                                                    Tarasów
                                                </option>
                                                <option value="Posadzki Żywiczne">Posadzki Żywiczne</option>
                                                <option value="Malowanie Hydrodynamiczne">Malowanie Hydrodynamiczne
                                                </option>
                                                <option value="Gładzie Polimerowe">Gładzie Polimerowe</option>
                                            </select>
                                            <div
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                                <Box size={16}/>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Szacunkowy metraż
                                        (m²)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            placeholder="np. 150"
                                            value={area}
                                            onChange={(e) => setArea(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-sm"
                                        />
                                        <div
                                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 text-xs font-semibold select-none">
                                            m²
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Opis sytuacji / Stan
                                    aktualny obiektu</label>
                                <div className="relative">
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Opisz obecny stan (np. przeciekający dach kryty papą, podłoże z nowego betonu, hala produkcyjna, oczekiwany wysoki standard wykończenia...)"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-sm resize-none"
                                    ></textarea>
                                    <div className="absolute bottom-3 right-3 text-slate-300 pointer-events-none">
                                        <MessageSquare size={16}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEKCJA 2: Dane kontaktowe */}
                        <div>
                            <div className="flex items-center space-x-2 pb-3 mb-6 border-b border-slate-100">
                                <FileText className="text-brand-primary" size={20}/>
                                <h3 className="text-lg font-bold text-slate-900">2. Dane kontaktowe</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Imię i nazwisko /
                                        Nazwa firmy</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Jan Kowalski"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-sm"
                                        />
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                            <User size={16}/>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="text-sm font-semibold text-slate-700 mb-2 flex items-center justify-between">
                                        <span>Numer telefonu</span>
                                        <span className="text-xs text-slate-400 font-normal italic">(opcjonalnie)</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            placeholder="+48 000 000 000"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-sm"
                                        />
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                            <Phone size={16}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Adres e-mail</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        placeholder="biuro@twojadomena.pl"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all text-sm"
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <Mail size={16}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Komunikat o błędzie */}
                        {status === 'error' && (
                            <div
                                className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 text-center animate-in fade-in">
                                Wystąpił błąd serwera podczas wysyłania wiadomości. Spróbuj ponownie za chwilę lub użyj
                                zakładki Kontakt.
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* ZGODY I NOTKI PRAWNE */}
                        {/* ========================================================================= */}
                        <div className="space-y-4 py-2 border-t border-slate-100 pt-6">

                            {/* 1. OPZJONALNY CHECKBOX NEWSLETTERA (Ujednolicony styl) */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5 mt-0.5">
                                    <input
                                        id="newsletterConsent"
                                        type="checkbox"
                                        className="w-5 h-5 rounded-md border-slate-300 text-brand-primary focus:ring-brand-primary/50 transition-all cursor-pointer accent-brand-primary"
                                        disabled={status === 'submitting'}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="newsletterConsent"
                                           className="font-medium text-slate-700 cursor-pointer select-none">
                                        Chcę otrzymywać dodatkowe materiały edukacyjne i porady na e-mail
                                    </label>
                                    <p className="text-slate-500 text-xs mt-0.5">
                                        Zapisz się do newslettera. To w pełni opcjonalne, a z listy możesz wypisać się w
                                        każdej chwili jednym kliknięciem.
                                    </p>
                                </div>
                            </div>

                            {/* 2. WYMAGANA INFORMACJA RODO (Zgodna z podstroną Kontakt + Wycentrowana) */}
                            <p className="text-xs text-slate-400 leading-relaxed w-full bg-slate-50 p-4 rounded-xl border border-slate-100 text-center mx-auto max-w-2xl">
                                Wysyłając formularz, wyrażasz zgodę na przetwarzanie swoich danych osobowych w celu
                                przygotowania i przedstawienia szczegółowej oferty handlowej. Szczegóły dotyczące
                                ochrony Twoich danych oraz przysługujących Ci praw znajdziesz w naszej{' '}
                                <span
                                    onClick={() => navigateTo('privacy')}
                                    className="text-brand-primary hover:text-brand-dark underline cursor-pointer transition-colors"
                                >
                                    Polityce Prywatności
                                </span>
                                .
                            </p>

                        </div>
                        {/* ========================================================================= */}

                        {/* Przyciski akcji */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 items-center">
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full sm:w-auto bg-brand-primary hover:bg-brand-dark text-white px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center shadow-lg shadow-brand-primary/20 group disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                            >
                                {status === 'submitting' ? (
                                    <><Loader2 className="animate-spin mr-2" size={18}/> Przetwarzanie...</>
                                ) : (
                                    <>Poproś o szczegółową ofertę <Send size={16}
                                                                        className="ml-2 group-hover:translate-x-0.5 transition-transform"/></>
                                )}
                            </button>

                            {/* Dodano 'sm:ml-auto', co spycha ten przycisk maksymalnie do prawej strony na większych ekranach */}
                            <button
                                type="button"
                                onClick={() => navigateTo('home')}
                                disabled={status === 'submitting'}
                                className="w-full sm:w-auto sm:ml-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-4 rounded-xl font-medium transition-all text-sm disabled:opacity-50"
                            >
                                Anuluj
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}