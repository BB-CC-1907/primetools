// @ts-nocheck
"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { getUserLanguage, setUserLanguage } from "../i18n";

const LanguageContext = createContext({
  language: "de",
  changeLanguage: (lang: string) => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState("de");

  // Sprache beim Laden aus localStorage holen
  useEffect(() => {
    const lang = getUserLanguage();
    setLanguageState(lang);
  }, []);

  function changeLanguage(lang) {
    setLanguageState(lang);
    setUserLanguage(lang);
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  return useContext(LanguageContext);
}
