"use client";

import { useState } from "react";
import Link from "next/link";
import { useT } from "../hooks/useT";
import { useLanguage } from "../context/LanguageContext";

function LanguageToggle() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-[#555555]">
      <button
        onClick={() => changeLanguage("de")}
        className={`rounded-full px-2 py-1 border border-transparent ${
          language === "de"
            ? "bg-[#14b8a6] text-white"
            : "hover:bg-[#14b8a6]/5 hover:border-[#14b8a6]"
        }`}
      >
        DE
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`rounded-full px-2 py-1 border border-transparent ${
          language === "en"
            ? "bg-[#14b8a6] text-white"
            : "hover:bg-[#14b8a6]/5 hover:border-[#14b8a6]"
        }`}
      >
        EN
      </button>
    </div>
  );
}

export default function Page() {
  const t = useT();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false); // Menü nach Klick schließen
  };

  return (
    <main className="min-h-screen bg-[#f7efe6] text-[#222222]">
      {/* Header */}
      <header className="border-b border-[#e4d7c7] bg-[#f7efe6]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-lg font-semibold text-[#222222]">Prime</span>
            <span className="text-lg font-semibold text-[#14b8a6]">Tools</span>
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden ml-10 items-center gap-5 text-sm font-medium text-[#555555] md:flex">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-black"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="hover:text-black"
            >
              {t("nav.pdfTools")}
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="hover:text-black"
            >
              {t("nav.textTools")}
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="hover:text-black"
            >
              {t("nav.emoji")}
            </button>
            <button
              onClick={() => scrollToSection("tools")}
              className="hover:text-black"
            >
              {t("nav.captions")}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="hover:text-black"
            >
              {t("nav.pricing")}
            </button>
            <button
              onClick={() => scrollToSection("footer")}
              className="hover:text-black"
            >
              {t("nav.login")}
            </button>
          </nav>

          {/* Rechts: Sprache + Premium + Hamburger (mobil) */}
          <div className="flex items-center gap-3">
            <LanguageToggle />

            {/* Premium-Button nur auf Desktop sichtbar */}
            <button className="hidden rounded-full border border-[#14b8a6] px-5 py-2 text-sm font-semibold text-[#14b8a6] hover:bg-[#14b8a6]/5 md:inline-flex">
              {t("cta.premiumBadge")}
            </button>

            {/* Hamburger nur auf Mobile sichtbar */}
            <button
              className="inline-flex items-center justify-center rounded-full border border-[#14b8a6] p-2 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="sr-only">Menü öffnen</span>
              <div className="flex flex-col gap-0.5">
                <span className="block h-0.5 w-4 bg-[#14b8a6]" />
                <span className="block h-0.5 w-4 bg-[#14b8a6]" />
                <span className="block h-0.5 w-4 bg-[#14b8a6]" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile-Menü */}
        {mobileOpen && (
          <div className="border-t border-[#e4d7c7] bg-[#f7efe6] md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 text-sm font-medium text-[#555555]">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left hover:text-black"
              >
                {t("nav.home")}
              </button>
              <button
                onClick={() => scrollToSection("tools")}
                className="text-left hover:text-black"
              >
                {t("nav.pdfTools")}
              </button>
              <button
                onClick={() => scrollToSection("tools")}
                className="text-left hover:text-black"
              >
                {t("nav.textTools")}
              </button>
              <button
                onClick={() => scrollToSection("tools")}
                className="text-left hover:text-black"
              >
                {t("nav.emoji")}
              </button>
              <button
                onClick={() => scrollToSection("tools")}
                className="text-left hover:text-black"
              >
                {t("nav.captions")}
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left hover:text-black"
              >
                {t("nav.pricing")}
              </button>
              <button
                onClick={() => scrollToSection("footer")}
                className="text-left hover:text-black"
              >
                {t("nav.login")}
              </button>

              <button className="mt-3 rounded-full border border-[#14b8a6] px-5 py-2 text-sm font-semibold text-[#14b8a6] hover:bg-[#14b8a6]/5">
                {t("cta.premiumBadge")}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="border-b border-[#e4d7c7] bg-[#f7efe6]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight text-[#222222] md:text-4xl lg:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-[#555555]">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-[#14b8a6] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f9789]">
                {t("hero.primary")}
              </button>
              <button className="rounded-full border border-[#14b8a6] px-6 py-2 text-sm font-semibold text-[#14b8a6] hover:bg-[#14b8a6]/5">
                {t("hero.secondary")}
              </button>
            </div>
            <p className="text-xs text-[#777777]">{t("hero.note")}</p>
          </div>

          {/* Hero Side Card */}
          <aside className="flex-1">
            <div className="rounded-3xl bg-white/90 p-6 shadow-md ring-1 ring-[#eddcc7]">
              <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#999999]">
                {t("heroIncluded.title")}
              </h2>
              <ul className="space-y-3 text-sm text-[#444444]">
                <li>• {t("heroIncluded.line1")}</li>
                <li>• {t("heroIncluded.line2")}</li>
                <li>• {t("heroIncluded.line3")}</li>
                <li>• {t("heroIncluded.line4")}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="border-b border-[#e4d7c7] bg-[#f7efe6] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 space-y-2">
            <h2 className="text-xl font-semibold text-[#222222] md:text-2xl">
              {t("toolsSection.title")}
            </h2>
            <p className="max-w-2xl text-sm text-[#555555]">
              {t("toolsSection.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* PDF-Tools */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eddcc7]">
              <h3 className="mb-2 text-lg font-semibold text-[#222222]">
                {t("toolsSection.pdf.title")}
              </h3>
              <p className="mb-3 text-sm text-[#555555]">
                {t("toolsSection.pdf.subtitle")}
              </p>
              <ul className="mb-4 space-y-1 text-sm text-[#555555]">
                <li>• {t("toolsSection.pdf.bullet1")}</li>
                <li>• {t("toolsSection.pdf.bullet2")}</li>
                <li>• {t("toolsSection.pdf.bullet3")}</li>
                <li>• {t("toolsSection.pdf.bullet4")}</li>
                <li>• {t("toolsSection.pdf.bullet5")}</li>
                <li>• {t("toolsSection.pdf.bullet6")}</li>
                <li>• {t("toolsSection.pdf.bullet7")}</li>
              </ul>
              <Link
                href="/pdf-tools"
                className="inline-flex items-center justify-center rounded-full border border-[#14b8a6] px-5 py-1.5 text-sm font-semibold text-[#14b8a6] hover:bg-[#14b8a6]/5"
              >
                {t("toolsSection.pdf.button")}
              </Link>
            </div>

            {/* Textwerkzeuge */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eddcc7]">
              <h3 className="mb-2 text-lg font-semibold text-[#222222]">
                {t("toolsSection.text.title")}
              </h3>
              <p className="mb-3 text-sm text-[#555555]">
                {t("toolsSection.text.subtitle")}
              </p>
              <ul className="mb-4 space-y-1 text-sm text-[#555555]">
                <li>• {t("toolsSection.text.bullet1")}</li>
                <li>• {t("toolsSection.text.bullet2")}</li>
                <li>• {t("toolsSection.text.bullet3")}</li>
                <li>• {t("toolsSection.text.bullet4")}</li>
              </ul>
              <button className="rounded-full border border-[#14b8a6] px-5 py-1.5 text-sm font-semibold text-[#14b8a6] hover:bg-[#14b8a6]/5">
                {t("toolsSection.text.button")}
              </button>
            </div>

            {/* Emoji-Generator */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eddcc7]">
              <h3 className="mb-2 text-lg font-semibold text-[#222222]">
                {t("toolsSection.emoji.title")}
              </h3>
              <p className="mb-3 text-sm text-[#555555]">
                {t("toolsSection.emoji.subtitle")}
              </p>
              <ul className="mb-4 space-y-1 text-sm text-[#555555]">
                <li>• {t("toolsSection.emoji.bullet1")}</li>
                <li>• {t("toolsSection.emoji.bullet2")}</li>
                <li>• {t("toolsSection.emoji.bullet3")}</li>
              </ul>
              <button className="rounded-full border border-[#14b8a6] px-5 py-1.5 text-sm font-semibold text-[#14b8a6] hover:bg-[#14b8a6]/5">
                {t("toolsSection.emoji.button")}
              </button>
            </div>

            {/* Social-Media-Captions */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eddcc7]">
              <h3 className="mb-2 text-lg font-semibold text-[#222222]">
                {t("toolsSection.captions.title")}
              </h3>
              <p className="mb-3 text-sm text-[#555555]">
                {t("toolsSection.captions.subtitle")}
              </p>
              <ul className="mb-4 space-y-1 text-sm text-[#555555]">
                <li>• {t("toolsSection.captions.bullet1")}</li>
                <li>• {t("toolsSection.captions.bullet2")}</li>
                <li>• {t("toolsSection.captions.bullet3")}</li>
              </ul>
              <button className="rounded-full border border-[#14b8a6] px-5 py-1.5 text-sm font-semibold text-[#14b8a6] hover:bg-[#14b8a6]/5">
                {t("toolsSection.captions.button")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-[#f7efe6] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 space-y-2">
            <h2 className="text-xl font-semibold text-[#222222] md:text-2xl">
              {t("pricingSection.title")}
            </h2>
            <p className="max-w-2xl text-sm text-[#555555]">
              {t("pricingSection.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Free plan */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eddcc7]">
              <h3 className="mb-1 text-lg font-semibold text-[#222222]">
                {t("pricingSection.free.title")}
              </h3>
              <p className="mb-4 text-sm text-[#555555]">
                {t("pricingSection.free.subtitle")}
              </p>
              <div className="mb-4 text-3xl font-semibold text-[#222222]">
                {t("pricingSection.free.price")}
                <span className="ml-1 text-sm font-normal text-[#777777]">
                  {t("pricingSection.free.perMonth")}
                </span>
              </div>
              <ul className="mb-4 space-y-1 text-sm text-[#555555]">
                <li>• {t("pricingSection.free.bullet1")}</li>
                <li>• {t("pricingSection.free.bullet2")}</li>
                <li>• {t("pricingSection.free.bullet3")}</li>
                <li>• {t("pricingSection.free.bullet4")}</li>
              </ul>
              <button className="rounded-full border border-[#14b8a6] px-5 py-1.5 text-sm font-semibold text-[#14b8a6] hover:bg-[#14b8a6]/5">
                {t("pricingSection.free.button")}
              </button>
            </div>

            {/* Premium plan */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eddcc7]">
              <h3 className="mb-1 text-lg font-semibold text-[#222222]">
                {t("pricingSection.premium.title")}
              </h3>
              <p className="mb-4 text-sm text-[#555555]">
                {t("pricingSection.premium.subtitle")}
              </p>
              <div className="mb-1 text-3xl font-semibold text-[#222222]">
                {t("pricingSection.premium.price")}
                <span className="ml-1 text-sm font-normal text-[#777777]">
                  {t("pricingSection.premium.perMonth")}
                </span>
              </div>
              <p className="mb-4 text-xs text-[#777777]">
                {t("pricingSection.premium.note")}
              </p>
              <ul className="mb-4 space-y-1 text-sm text-[#555555]">
                <li>• {t("pricingSection.premium.bullet1")}</li>
                <li>• {t("pricingSection.premium.bullet2")}</li>
                <li>• {t("pricingSection.premium.bullet3")}</li>
                <li>• {t("pricingSection.premium.bullet4")}</li>
                <li>• {t("pricingSection.premium.bullet5")}</li>
                <li>• {t("pricingSection.premium.bullet6")}</li>
              </ul>
              <button className="rounded-full bg-[#14b8a6] px-5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0f9789]">
                {t("pricingSection.premium.button")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t border-[#e4d7c7] bg-[#f7efe6]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-[#777777] md:flex-row">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-4">
            <button className="hover:text-[#444444]">{t("footer.about")}</button>
            <button className="hover:text-[#444444]">
              {t("footer.privacy")}
            </button>
            <button className="hover:text-[#444444]">{t("footer.terms")}</button>
            <button className="hover:text-[#444444]">
              {t("footer.contact")}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
