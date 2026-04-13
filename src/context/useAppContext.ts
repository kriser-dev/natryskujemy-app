import {useContext} from "react";
import {AppContext} from "./AppContext";

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext musi być użyty wewnątrz AppProvider");
    }
    return context;
};