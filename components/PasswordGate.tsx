"use client";

import { useState, FormEvent, ReactNode } from "react";

type PasswordGateProps = {
  children: ReactNode;
};

export default function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Falsches Passwort.");
        setIsLoading(false);
        return;
      }

      // ✅ Passwort war korrekt – Seite freigeben
      setIsUnlocked(true);
      setPassword("");
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Es ist ein Fehler aufgetreten. Bitte später erneut versuchen.");
      setIsLoading(false);
    }
  }

  // ❗ WICHTIG: Kein Cookie, kein localStorage – nur State im aktuellen Tab
  // => Bei jedem Reload ist isUnlocked wieder false → Passwort erneut nötig.

  if (!isUnlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="w-full max-w-sm rounded-2xl bg-white/95 shadow-xl p-6">
          <h1 className="text-lg font-semibold text-center mb-4">
            🔒 Zugang zu PrimeTools
          </h1>
          <p className="text-xs text-gray-500 text-center mb-4">
            Bitte gib das Passwort ein, um die Tools zu benutzen.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#14b8a6]"
              placeholder="Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />

            {error && (
              <p className="text-[11px] text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full rounded-full bg-[#14b8a6] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0f9e90] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Prüfe Passwort..." : "Anmelden"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ✅ Passwort korrekt → eigentliche App anzeigen
  return <>{children}</>;
}
