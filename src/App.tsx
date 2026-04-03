import React, { useState, useEffect, Suspense, lazy } from 'react';
import { 
  Droplets, PhoneCall, Menu, X, ChevronDown, ArrowUp, Cookie, MapPin, Loader2
} from 'lucide-react';

// Konteksty i ikony
import { AppProvider, useAppContext, throttle } from './context/AppContext';
import { Facebook, Instagram, TikTokIcon, Youtube } from './components/Icons';
import { TIMEOUTS, UI_CONFIG, SOCIAL_LINKS } from './config/constants';
import logoFirmy from './assets/natryskujemy.webp';

// Komponent Error Boundary
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-8 text-center">
          <Droplets className="h-16 w-16 text-red-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Przepraszamy, coś poszło nie tak.</h2>
          <p className="text-slate-600 mb-6">Wystąpił nieoczekiwany problem z wyświetleniem tej zawartości.</p>
          <button onClick={() => window.location.reload()} className="bg-[#3f8ace] text-white px-6 py-2.5 rounded-xl font-bold">
            Odśwież stronę
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// LAZY LOADING Podstron
const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const CookiesPolicyPage = lazy(() => import('./pages/CookiesPolicyPage'));

// Wskaźnik ładowania
const LoadingSpinner = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center text-[#3f8ace]">
    <Loader2 className="animate-spin h-12 w-12 mb-4" />
    <p className="text-slate-500 font-medium animate-pulse">Ładowanie zawartości...</p>
  </div>
);

const AppContent = () => {
  const { currentPage, isNavigating, navigateTo } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutMobileOpen, setIsAboutMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setIsAboutMobileOpen(false);
  };

  useEffect(() => {
    // Próg przewijania zmieniony na 400px zgodnie z prośbą
    const handleScroll = throttle(() => {
      setShowScrollTop(window.scrollY > 400);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    if (!localStorage.getItem('natryskujemy_cookie_consent')) {
      setTimeout(() => setShowCookieBanner(true), 1500); 
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const acceptAllCookies = () => { localStorage.setItem('natryskujemy_cookie_consent', 'all'); setShowCookieBanner(false); };
  const acceptEssentialCookies = () => { localStorage.setItem('natryskujemy_cookie_consent', 'essential'); setShowCookieBanner(false); };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-[#3f8ace] selection:text-white flex flex-col">
      <div className={`fixed top-0 left-0 h-1.5 bg-[#3f8ace] z-[100] transition-all duration-300 ease-out ${isNavigating ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />

      {/* Pasek Górny */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-sm hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="tel:+48500000000" className="flex items-center hover:text-white transition-colors">
              <PhoneCall size={16} className="mr-2 text-[#3f8ace]" /> +48 500 000 000
            </a>
            <a href="tel:+48600000000" className="flex items-center hover:text-white transition-colors">
              <PhoneCall size={16} className="mr-2 text-[#3f8ace]" /> +48 600 000 000
            </a>
          </div>
          <div className="flex space-x-6 items-center">
            <a href="mailto:kontakt@natryskujemy.pl" className="hover:text-white transition-colors">kontakt@natryskujemy.pl</a>
            <div className="flex space-x-3 border-l border-slate-700 pl-6">
              <a href={SOCIAL_LINKS.facebook} className="text-slate-400 hover:text-[#1877F2] transition-colors"><Facebook size={16} /></a>
              <a href={SOCIAL_LINKS.instagram} className="text-slate-400 hover:text-[#E4405F] transition-colors"><Instagram size={16} /></a>
              <a href={SOCIAL_LINKS.tiktok} className="text-slate-400 hover:text-white transition-colors"><TikTokIcon size={16} /></a>
              <a href={SOCIAL_LINKS.youtube} className="text-slate-400 hover:text-[#FF0000] transition-colors"><Youtube size={16} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Główne Menu */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
{/* Logo Container */}
<div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => navigateTo('home')}>
  <div className="flex items-center">
    {/* Twój sygnet/ikona kropelki (zostaje obok) */}
    <Droplets className="h-8 w-8 text-brand-primary mr-2 group-hover:scale-110 transition-transform" />
    
    <div className="flex flex-col mr-4">
      <span className="font-extrabold text-xl md:text-2xl tracking-tight text-slate-900 leading-none">
        natryskujemy<span className="text-brand-primary">.pl</span>
      </span>
      <span className="text-[10px] font-semibold text-slate-500 tracking-wider">
        MARKA FIRMY HydroPAKiet
      </span>
    </div>

    {/* TWOJE BIAŁE LOGO W NIEBIESKIM PUDEŁKU - widoczne też na mobile */}
    <div className="bg-brand-primary px-3 py-1.5 rounded-lg shadow-sm flex items-center justify-center transition-transform hover:scale-105 border border-brand-dark/10">
      <img 
        src={logoFirmy} 
        alt="Logo HydroPAKiet" 
        className="h-6 md:h-8 w-auto object-contain" 
      />
    </div>
  </div>
</div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-6 items-center">
              <button onClick={() => navigateTo('home')} className={`font-medium transition-colors ${currentPage === 'home' ? 'text-[#3f8ace]' : 'text-slate-600 hover:text-[#3f8ace]'}`}>Start</button>
              <button onClick={() => navigateTo('home', 'uslugi')} className="text-slate-600 hover:text-[#3f8ace] font-medium transition-colors">Nasze usługi</button>
              <button onClick={() => navigateTo('portfolio')} className={`font-medium transition-colors ${currentPage === 'portfolio' ? 'text-[#3f8ace]' : 'text-slate-600 hover:text-[#3f8ace]'}`}>Nasze realizacje</button>

              <div className="relative group py-6">
                <button className={`flex items-center font-medium transition-colors ${['about', 'process'].includes(currentPage) ? 'text-[#3f8ace]' : 'text-slate-600 group-hover:text-[#3f8ace]'}`}>
                  O nas <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top flex flex-col overflow-hidden">
                  <button onClick={() => navigateTo('home', 'o-nas')} className="text-left px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#3f8ace] border-b border-slate-50 transition-colors">Dlaczego my?</button>
                  <button onClick={() => navigateTo('about')} className="text-left px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#3f8ace] border-b border-slate-50 transition-colors">Kim jesteśmy?</button>
                  <button onClick={() => navigateTo('process')} className="text-left px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#3f8ace] transition-colors">Jak pomagamy?</button>
                </div>
              </div>
              
              <button onClick={() => navigateTo('home', 'kontakt')} className="bg-[#3f8ace] hover:bg-[#3270a6] text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center shadow-lg shadow-[#3f8ace]/30">
                <PhoneCall size={18} className="mr-2" /> Kontakt
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button onClick={toggleMenu} className="text-slate-600 hover:text-slate-900 focus:outline-none" aria-label="Menu">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col max-h-[70vh] overflow-y-auto">
			
              <button onClick={() => navigateTo('home')} className={`text-left px-4 py-3 text-base font-medium rounded-xl transition-colors ${currentPage === 'home' ? 'text-[#3f8ace] bg-blue-50/50' : 'text-slate-700 hover:text-[#3f8ace] hover:bg-slate-50'}`}>Start</button>
              <button onClick={() => navigateTo('home', 'uslugi')} className="text-left px-4 py-3 text-base font-medium text-slate-700 hover:text-[#3f8ace] hover:bg-slate-50 rounded-xl transition-colors">Nasze usługi</button>
              <button onClick={() => navigateTo('portfolio')} className={`text-left px-4 py-3 text-base font-medium rounded-xl transition-colors ${currentPage === 'portfolio' ? 'text-[#3f8ace] bg-blue-50/50' : 'text-slate-700 hover:text-[#3f8ace] hover:bg-slate-50'}`}>Nasze realizacje</button>

              <div className="flex flex-col">
                <button onClick={() => setIsAboutMobileOpen(!isAboutMobileOpen)} className="flex items-center justify-between px-4 py-3 text-base font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
                  <span>O nas</span>
                  <ChevronDown size={20} className={`transform transition-transform duration-300 text-slate-400 ${isAboutMobileOpen ? 'rotate-180 text-[#3f8ace]' : ''}`} />
                </button>
                {isAboutMobileOpen && (
                  <div className="flex flex-col bg-slate-50/80 rounded-xl mt-1 overflow-hidden ml-2 border-l-2 border-[#3f8ace]/20">
                    <button onClick={() => navigateTo('home', 'o-nas')} className="text-left px-6 py-3 text-sm font-semibold text-slate-600 hover:text-[#3f8ace] hover:bg-white transition-colors">Dlaczego my?</button>
                    <button onClick={() => navigateTo('about')} className={`text-left px-6 py-3 text-sm font-semibold transition-colors hover:bg-white ${currentPage === 'about' ? 'text-[#3f8ace] bg-white' : 'text-slate-600 hover:text-[#3f8ace]'}`}>Kim jesteśmy?</button>
                    <button onClick={() => navigateTo('process')} className={`text-left px-6 py-3 text-sm font-semibold transition-colors hover:bg-white ${currentPage === 'process' ? 'text-[#3f8ace] bg-white' : 'text-slate-600 hover:text-[#3f8ace]'}`}>Jak pomagamy?</button>
                  </div>
                )}
              </div>
              <button onClick={() => navigateTo('home', 'kontakt')} className="text-center mt-4 px-4 py-4 text-base font-bold text-white bg-[#3f8ace] rounded-xl shadow-lg shadow-[#3f8ace]/30">Kontakt</button>
            </div>
          </div>
        )}
      </nav>

      {/* Główna Zawartość obsługująca Lazy Loading */}
      <main className={`flex-grow transition-opacity duration-300 ${isNavigating ? 'opacity-40' : 'opacity-100'}`}>
        <Suspense fallback={<LoadingSpinner />}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'portfolio' && <PortfolioPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'process' && <ProcessPage />}
          {currentPage === 'privacy' && <PrivacyPolicyPage />}
          {currentPage === 'cookies' && <CookiesPolicyPage />}
        </Suspense>
      </main>

      {/* W 100% zrekonstruowana Stopka */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <div className="flex items-center text-white mb-4">
                    <Droplets className="h-6 w-6 text-[#3f8ace] mr-2" />
                    <span className="font-bold text-xl tracking-tight">natryskujemy<span className="text-[#3f8ace]">.pl</span></span>
                </div>
                <p className="mb-4 text-slate-500">Profesjonalne usługi natryskowe na Śląsku. Gwarantujemy najwyższą jakość wykonania oraz terminowość.</p>
                <div className="flex space-x-3 mb-4">
                    <a href={SOCIAL_LINKS.facebook} aria-label="Facebook" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all"><Facebook size={16} /></a>
                    <a href={SOCIAL_LINKS.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white transition-all"><Instagram size={16} /></a>
                    <a href={SOCIAL_LINKS.tiktok} aria-label="TikTok" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:border-black hover:text-white transition-all"><TikTokIcon size={16} /></a>
                    <a href={SOCIAL_LINKS.youtube} aria-label="YouTube" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white transition-all"><Youtube size={16} /></a>
                </div>
                <p className="text-xs text-slate-600">Marka obsługiwana przez firmę HydroPAKiet.</p>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Szybkie linki</h4>
                <ul className="space-y-2">
                    <li><button onClick={() => navigateTo('home', 'uslugi')} className="hover:text-[#3f8ace] transition-colors">Nasze usługi</button></li>
                    <li><button onClick={() => navigateTo('portfolio')} className="hover:text-[#3f8ace] transition-colors">Nasze realizacje</button></li>
                    <li><button onClick={() => navigateTo('home', 'o-nas')} className="hover:text-[#3f8ace] transition-colors">Dlaczego my?</button></li>
                    <li><button onClick={() => navigateTo('about')} className="hover:text-[#3f8ace] transition-colors">Kim jesteśmy</button></li>
                    <li><button onClick={() => navigateTo('process')} className="hover:text-[#3f8ace] transition-colors">Jak pomagamy</button></li>
                    <li><button onClick={() => navigateTo('home', 'kontakt')} className="hover:text-[#3f8ace] transition-colors">Kontakt i Wycena</button></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Dane Firmy</h4>
                <ul className="space-y-3">
                    <li className="flex items-start"><MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-[#3f8ace]"/> ul. Legionów 37C<br/>42-600 Tarnowskie Góry</li>
                    <li className="flex items-center"><PhoneCall size={16} className="mr-2 flex-shrink-0 text-[#3f8ace]"/> +48 500 000 000</li>
                    <li className="flex items-center"><PhoneCall size={16} className="mr-2 flex-shrink-0 text-[#3f8ace]"/> +48 600 000 000</li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500">
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
                <p>&copy; {new Date().getFullYear()} natryskujemy.pl. Wszelkie prawa zastrzeżone.</p>
                <div className="hidden md:block text-slate-700">|</div>
                <div className="flex space-x-4 text-xs font-medium">
                    <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">Polityka prywatności</button>
                    <button onClick={() => navigateTo('cookies')} className="hover:text-white transition-colors">Polityka cookies</button>
                </div>
            </div>
            <p className="mt-4 md:mt-0 text-xs text-slate-600">Zoptymalizowane pod kątem szybkiego ładowania i SEO.</p>
        </div>
      </footer>

      {/* Baner Cookies - z pełnym tekstem z oryginału */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-[100] animate-in slide-in-from-bottom duration-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start text-sm text-slate-300">
              <Cookie className="text-[#3f8ace] mr-3 flex-shrink-0 mt-0.5" size={20} />
              <p>
                Używamy plików cookies, aby zapewnić Ci najlepsze doświadczenia na naszej stronie, analizować ruch oraz do celów marketingowych. 
                Dalsze korzystanie z serwisu oznacza Twoją zgodę. Możesz odrzucić pliki nieobowiązkowe, wybierając opcję "Tylko niezbędne". Więcej informacji znajdziesz w naszej{' '}
                <button onClick={() => navigateTo('cookies')} className="text-[#3f8ace] hover:text-white underline transition-colors">Polityce Cookies</button>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-shrink-0">
              <button 
                onClick={acceptEssentialCookies} 
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm"
              >
                Tylko niezbędne
              </button>
              <button 
                onClick={acceptAllCookies} 
                className="w-full sm:w-auto bg-[#3f8ace] hover:bg-[#3270a6] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#3f8ace]/20 whitespace-nowrap text-sm"
              >
                Akceptuj wszystkie
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Przycisk powrotu na górę */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-[#3f8ace] text-white rounded-full shadow-lg shadow-[#3f8ace]/30 flex items-center justify-center hover:bg-[#3270a6] hover:-translate-y-1 transition-all duration-300 z-[90] ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Wróć na górę"
      >
        <ArrowUp size={24} />
      </button>

    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}