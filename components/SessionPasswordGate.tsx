// components/SessionPasswordGate.tsx
// @ts-nocheck
"use client";

import { useEffect, useState, FormEvent } from "react";

const STORAGE_KEY = "primetools_session_ok";

type Props = {
  children: React.ReactNode;
};

export default function SessionPasswordGate({ children }: Props) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Beim Laden prüfen, ob Session bereits freigeschaltet ist
  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = window.sessionStorage.getItem(STORAGE_KEY);
    if (flag === "1") {
      setUnlocked(true);
    }
    setReady(true);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Falsches Passwort.");
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      }

      setUnlocked(true);
      setPassword("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Es ist ein Fehler aufgetreten. Bitte später erneut versuchen.");
      setLoading(false);
    }
  }

  // Solange wir nicht wissen, ob Session freigeschaltet ist, nichts anzeigen
  if (!ready) {
    return null;
  }

  // Wenn nicht freigeschaltet → Passwort-Overlay
  if (!unlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="w-full max-w-sm rounded-2xl bg-white/95 shadow-xl p-6">
          <h1 className="text-lg font-semibold text-center mb-2">
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
              disabled={loading || !password}
              className="w-full rounded-full bg-[#14b8a6] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0f9e90] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Prüfe Passwort..." : "Anmelden"}
            </button>
          </form>

          <p className="mt-3 text-[10px] text-center text-gray-400">
            Passwort gilt nur für diese Browsersitzung. Nach dem Schließen des
            Tabs musst du es erneut eingeben.
          </p>
        </div>
      </main>
    );
  }

  // Freigeschaltet → eigentliche App anzeigen
  return <>{children}</>;
}
