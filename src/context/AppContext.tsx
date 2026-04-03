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
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isNavigating, setIsNavigating] = useState(false);

  const navigateTo = useCallback((page: Page, hash = '') => {
    setIsNavigating(true); // Uruchamia loader na ekranie
    
    setTimeout(() => {
      setCurrentPage(page);
      setIsNavigating(false); // Wyłącza loader
      
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