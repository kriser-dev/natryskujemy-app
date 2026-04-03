import React from 'react';
import { Info } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-16 pb-24 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#3f8ace]/10 text-[#3f8ace] font-bold text-sm mb-6">
          <Info size={16} className="mr-2" /> Informacje Prawne
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">Polityka Prywatności</h1>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-md border border-slate-100 prose prose-slate max-w-none text-slate-600">
          <p className="lead text-lg font-medium text-slate-700">Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z usług poprzez serwis natryskujemy.pl.</p>
          
          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Administrator Danych Osobowych</h3>
          <p>Administratorem danych osobowych zawartych w serwisie jest firma <strong>HydroPAKiet</strong> z siedzibą przy ul. Legionów 37C, 42-600 Tarnowskie Góry.</p>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Cel zbierania danych</h3>
          <p>Dane osobowe (takie jak: imię, nazwisko, adres e-mail, numer telefonu) podawane w formularzach kontaktowych są przetwarzane wyłącznie w celu:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Odpowiedzi na przesłane zapytania przez formularz kontaktowy.</li>
            <li>Przygotowania i przesłania wyceny usług (hydroizolacji, malowania, gładzi).</li>
            <li>Realizacji i obsługi ewentualnej umowy.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Ochrona i udostępnianie</h3>
          <p>Szanujemy Twoją prywatność. Dane osobowe pozostawione w serwisie nie zostaną sprzedane ani udostępnione osobom trzecim, zgodnie z przepisami Ustawy o ochronie danych osobowych oraz Rozporządzenia RODO.</p>

          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Twoje prawa</h3>
          <p>Do danych zawartych w formularzu przysługuje wgląd osobie fizycznej, która je tam umieściła. Osoba ta ma również prawo do modyfikacji, żądania usunięcia (tzw. "prawo do bycia zapomnianym") i zaprzestania przetwarzania swoich danych w dowolnym momencie, kontaktując się pod adresem: <strong>kontakt@natryskujemy.pl</strong>.</p>
          
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-sm">
            Powyższy tekst jest wzorem poglądowym. Przed oficjalną publikacją strony należy skonsultować ostateczną treść ze specjalistą ds. RODO.
          </div>
        </div>
      </div>
    </div>
  );
}