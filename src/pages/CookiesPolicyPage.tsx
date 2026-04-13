import {Cookie} from 'lucide-react';

export default function CookiesPolicyPage() {
    return (
        <div className="bg-slate-50 min-h-screen pt-16 pb-24 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-6">
                    <Cookie size={16} className="mr-2"/> Informacje Prawne
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">Polityka Cookies</h1>

                <div
                    className="bg-white p-8 md:p-12 rounded-3xl shadow-md border border-slate-100 prose prose-slate max-w-none text-slate-600">
                    <p className="lead text-lg font-medium text-slate-700">Serwis natryskujemy.pl używa plików cookies
                        (tzw. "ciasteczek"). Poniżej znajdziesz informacje o tym, czym one są i dlaczego ich
                        używamy.</p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Czym są pliki cookies?</h2>
                    <p>Ciasteczka to niewielkie pliki tekstowe wysyłane przez serwer www i zapisywane po stronie
                        użytkownika (zazwyczaj na twardym dysku komputera lub w pamięci urządzenia mobilnego). Pozwalają
                        one na odczytanie informacji w nich zawartych jedynie serwerowi, który je utworzył.</p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">W jakim celu je stosujemy?</h2>
                    <p>Wykorzystujemy pliki cookies w następujących celach:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li><strong>Funkcjonalnych:</strong> Aby zapisać Twoje preferencje, np. fakt, że zaakceptowałeś
                            już komunikat o plikach cookies (dzięki czemu nie pojawia się on przy każdym odświeżeniu
                            strony).
                        </li>
                        <li><strong>Analitycznych:</strong> Do tworzenia anonimowych statystyk, które pomagają nam
                            zrozumieć, w jaki sposób użytkownicy korzystają ze strony, co umożliwia ulepszanie jej
                            struktury i zawartości (np. poprzez Google Analytics).
                        </li>
                        <li><strong>Marketingowych:</strong> Aby dopasować wyświetlane reklamy do Twoich zainteresowań
                            na podstawie interakcji z naszą witryną (jeśli stosowane).
                        </li>
                    </ul>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Zarządzanie plikami cookies</h2>
                    <p>Standardowo oprogramowanie służące do przeglądania stron internetowych domyślnie dopuszcza
                        umieszczanie plików cookies na urządzeniu końcowym. Ustawienia te mogą zostać zmienione przez
                        Użytkownika w taki sposób, aby blokować automatyczną obsługę plików cookies w ustawieniach
                        przeglądarki internetowej.</p>
                    <p className="font-medium mt-4">Pamiętaj, że ograniczenie stosowania plików cookies może wpłynąć na
                        niektóre funkcjonalności dostępne na naszej stronie internetowej.</p>

                    <hr className="my-8 border-slate-200"/>
                    <p className="text-sm text-slate-500">
                        Więcej informacji o tym, jak chronimy Twoje dane, znajdziesz w naszej <a
                        href="/polityka-prywatnosci" className="text-brand-primary hover:underline font-medium">Polityce
                        Prywatności</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}