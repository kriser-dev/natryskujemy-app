import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 1. IMPORT BIBLIOTEKI GA4
import ReactGA from 'react-ga4'

// 2. INICJALIZACJA GOOGLE ANALYTICS
ReactGA.initialize('G-9TSC7S0YR4')

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
