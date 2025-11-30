// @ts-nocheck
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../i18n";

export function useT() {
  const { language } = useLanguage();

  return (key: string) => {
    const value = getTranslation(language, key);
    return value ?? key;
  };
}
