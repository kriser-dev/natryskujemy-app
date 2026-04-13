import React, {useState, useCallback, type ReactNode} from "react";
import {AppContext} from "./AppContext";
import type {Page} from "../types";
import {UI_CONFIG} from "../config/constants";

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [currentPage, setCurrentPage] = useState<Page>(() => {
        const path = window.location.pathname.substring(1);

        if (!path) return "home";

        const validPages = [
            "home",
            "portfolio",
            "about",
            "process",
            "privacy",
            "cookies",
        ];

        if (validPages.includes(path)) {
            return path as Page;
        }
        return "404";
    });

    const [isNavigating, setIsNavigating] = useState(false);

    const navigateTo = useCallback((page: Page, hash = "") => {
        setIsNavigating(true);

        setTimeout(() => {
            setCurrentPage(page);
            setIsNavigating(false);

            const newUrl = page === "home" ? "/" : `/${page}`;
            window.history.pushState({}, "", hash ? `${newUrl}#${hash}` : newUrl);

            if (hash) {
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({behavior: "smooth"});
                    }
                }, 50);
            } else {
                window.scrollTo({top: 0, behavior: "instant" as ScrollBehavior});
            }
        }, UI_CONFIG.NAVIGATION_DELAY);
    }, []);

    return (
        <AppContext.Provider value={{currentPage, isNavigating, navigateTo}}>
            {children}
        </AppContext.Provider>
    );
};