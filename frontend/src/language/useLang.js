
import { useContext } from "react";
import { LangContext } from "./langContext.jsx";

export const useLang = () => {
    const context = useContext(LangContext);
    if (!context) throw new Error("useLang must be used inside LangProvider");
    return context;
};