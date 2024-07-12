import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
    saveMissing: true,
    missingKeyHandler: (lngs, ns, key) => {
        console.warn("Missing key", key);
    },
});

export default i18n;
