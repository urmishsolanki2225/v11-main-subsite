import React, { createContext, useContext } from "react";

interface ILanguageContext {
    language?: string;
}
interface ILanguageProvider {
    language?: string;
    children?: React.ReactNode;
}

export const LanguageProvider: React.FC<ILanguageProvider> = ({
    language,
    children,
}) => {
    return (
        <LanguageContext.Provider value={{ language }}>
            {children}
        </LanguageContext.Provider>
    );
};

const LanguageContext = createContext<ILanguageContext | undefined>(undefined);

export const useLanguage = (): string | undefined => {
    return useContext(LanguageContext)?.language;
};
