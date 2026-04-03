// src/config/constants.ts

export const UI_CONFIG = {
  // Próg w pikselach (o ile trzeba przewinąć stronę w dół), aby pokazał się przycisk "Scroll to Top"
  SCROLL_THRESHOLD: 400,
  
  // Opóźnienie przy przełączaniu stron (w milisekundach), pozwalające na ładną animację loadera
  NAVIGATION_DELAY: 400,
  
  // Częstotliwość wywoływania funkcji podczas scrollowania (Throttle)
  SCROLL_THROTTLE_LIMIT: 100,
};

export const TIMEOUTS = {
  // Czas po jakim pojawia się baner o plikach cookies na pierwszej wizycie (ms)
  COOKIE_BANNER: 1500,
  
  // Czas powrotu formularza do stanu początkowego po udanym wysłaniu wiadomości (ms)
  FORM_SUCCESS_RESET: 5000,
  
  // Symulacja wysyłania formularza (do usunięcia/zmiany przy podpięciu prawdziwego backendu)
  FORM_SUBMIT_SIMULATION: 1500,
};

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/TwojProfil",
  instagram: "https://www.instagram.com/TwojProfil",
  tiktok: "https://www.tiktok.com/@TwojProfil",
  youtube: "https://www.youtube.com/@TwojKanal",
};