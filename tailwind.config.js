/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Nasz system kolorów marki
                brand: {
                    light: '#6ba5db',   // Jasny (opcjonalny, np. do hoverów)
                    primary: '#3f8ace', // Główny kolor natryskujemy.pl
                    dark: '#3270a6',    // Ciemniejszy, używany do wciśniętych przycisków / hoverów
                    second: '#3271a9',
                }
            }
        },
    },
    plugins: [
        require('tailwindcss-animate'),
    ],
}