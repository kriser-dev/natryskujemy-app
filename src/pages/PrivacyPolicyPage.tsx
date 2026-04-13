import {Info} from 'lucide-react';
import {CONTACT_INFO} from '../config/constants';

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-slate-50 min-h-screen pt-16 pb-24 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-6">
                    <Info size={16} className="mr-2"/> Informacje Prawne
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">Polityka Prywatności</h1>

                <div
                    className="bg-white p-8 md:p-12 rounded-3xl shadow-md border border-slate-100 prose prose-slate max-w-none text-slate-600">
                    <p className="lead text-lg font-medium text-slate-700">Niniejsza polityka prywatności określa zasady
                        przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z
                        korzystaniem z usług poprzez serwis natryskujemy.pl.</p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Administrator Danych Osobowych</h2>
                    <p>Administratorem danych osobowych zawartych w serwisie jest firma <strong>HydroPAKiet</strong> z
                        siedzibą: {CONTACT_INFO.address1}, {CONTACT_INFO.address2}.</p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Cel zbierania danych</h2>
                    <p>Dane osobowe (takie jak: imię, nazwisko, adres e-mail, numer telefonu) podawane w formularzach
                        kontaktowych są przetwarzane wyłącznie w celu:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Odpowiedzi na przesłane zapytania przez formularz kontaktowy.</li>
                        <li>Przygotowania i przesłania wyceny usług (hydroizolacji, malowania, gładzi).</li>
                        <li>Realizacji i obsługi ewentualnej umowy.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Ochrona i udostępnianie</h2>
                    <p>Szanujemy Twoją prywatność. Dane osobowe pozostawione w serwisie są odpowiednio zabezpieczone i
                        nie zostaną sprzedane ani udostępnione osobom trzecim bez Twojej zgody, zgodnie z przepisami
                        Rozporządzenia o Ochronie Danych Osobowych (RODO).</p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Twoje prawa</h2>
                    <p>Do danych zawartych w formularzu przysługuje wgląd osobie fizycznej, która je tam umieściła.
                        Osoba ta ma również prawo do ich sprostowania, usunięcia (tzw. "prawo do bycia zapomnianym"),
                        ograniczenia przetwarzania oraz przenoszenia danych, kontaktując się z Administratorem pod
                        adresem: <strong><a href={`mailto:${CONTACT_INFO.email}`}
                                            className="text-brand-primary hover:underline">{CONTACT_INFO.email}</a></strong>.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Pliki Cookies (Ciasteczka)</h2>
                    <p>Nasz serwis zbiera w sposób automatyczny informacje zawarte w plikach cookies. Są one
                        wykorzystywane wyłącznie do zapewnienia prawidłowego działania strony oraz w podstawowych celach
                        analitycznych, pomagając nam zrozumieć, jak Użytkownicy korzystają z serwisu.</p>
                </div>
            </div>
        </div>
    );
}