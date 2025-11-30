import de from "./de.json";
import en from "./en.json";

const languages = { de, en };

export function getTranslation(lang, keyPath) {
  const obj = languages[lang];
  return keyPath.split(".").reduce((o, k) => (o ? o[k] : null), obj);
}

export function getUserLanguage() {
  return localStorage.getItem("lang") || "de";
}

export function setUserLanguage(lang) {
  localStorage.setItem("lang", lang);
}
