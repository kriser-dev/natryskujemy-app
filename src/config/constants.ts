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
  facebook: "https://www.facebook.com/natryskujemy",
  instagram: "https://www.instagram.com/natryskujemy",
  tiktok: "https://www.tiktok.com/@natryskujemy.pl?_t=ZN-8wBZYbwOh8c&_r=1",
  youtube: "https://www.youtube.com/@Natryskujemy",
};

export const CONTACT_INFO = {
  phone1: "+48 504 056 342",
  phone1Clean: "48504056342", // numer bez spacji do linków tel:
  phone2: "+48 690 080 708",
  phone2Clean: "48690080708",
  email: "kontakt@natryskujemy.pl",
  address1: "ul. Legionów 37c",
  address2: "42-600 Tarnowskie Góry"
};