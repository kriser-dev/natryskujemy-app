import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Page, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext musi być użyty wewnątrz AppProvider');
  }
  return context;
};

// Funkcja Throttle (Zoptymalizowany event listener dla scrolla)
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  
  // ZMIANA 1: Inteligentny start. Czytamy co klient wpisał w pasku adresu.
  // Używamy <Page | '404'>, żeby TypeScript nie krzyczał o nieznanej stronie.
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const path = window.location.pathname.substring(1); 
    
    if (!path) return 'home';
    
    const validPages = ['home', 'portfolio', 'about', 'process', 'privacy', 'cookies'];
    
    // Jeśli adres jest na liście, ładujemy podstronę. Jeśli nie - 404.
    if (validPages.includes(path)) {
      return path as Page;
    }
    return '404';
  });

  const [isNavigating, setIsNavigating] = useState(false);

  // Aktualizujemy typ parametru 'page', by akceptował też '404'
  const navigateTo = useCallback((page: Page, hash = '') => {
    setIsNavigating(true); // Uruchamia loader na ekranie
    
    setTimeout(() => {
      setCurrentPage(page);
      setIsNavigating(false); // Wyłącza loader

      // ZMIANA 2: Magia nawigacji. Zmieniamy adres w pasku przeglądarki bez przeładowania strony!
      const newUrl = page === 'home' ? '/' : `/${page}`;
      window.history.pushState({}, '', hash ? `${newUrl}#${hash}` : newUrl);
      
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50); // Czekamy na wyrenderowanie podstrony zanim przescrollujemy
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 400); // 400ms - delay dla ładnego przejścia UI
  }, []);

  return (
    <AppContext.Provider value={{ currentPage, isNavigating, navigateTo }}>
      {children}
    </AppContext.Provider>
  );
};