// LangContext.jsx
import { createContext, useContext, useState } from "react";
import { translations } from "./translations.js";

const LangContext = createContext(null);

export function LangProvider({ children }) {
    const [lang, setLang] = useState("en");


    const t = (path) => {
        return path.split(".").reduce((obj, key) => obj?.[key], translations[lang]) ?? path;
    };

    return (
        <LangContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);