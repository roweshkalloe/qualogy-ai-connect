import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import nl from "./locales/nl.json";

// Initialize i18n without React binding first
i18n.init({
  resources: {
    en: { translation: en },
    nl: { translation: nl },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Then add the React binding
i18n.use(initReactI18next);

export default i18n;
