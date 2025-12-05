"use client";

import { useEffect, useState } from "react";

const PASSWORD =
  process.env.NEXT_PUBLIC_PRIMETOOLS_PASSWORD || "fallback-passwort";

type Props = {
  children: React.ReactNode;
};

export default function SessionPasswordGate({ children }: Props) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Beim Laden prüfen, ob diese Sitzung schon freigeschaltet ist
  useEffect(() => {
    try {
      const flag = sessionStorage.getItem("primetools-auth");
      if (flag === "ok") {
        setIsAuthed(true);
      }
    } catch (err) {
      console.error("sessionStorage error", err);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input === PASSWORD) {
      try {
        sessionStorage.setItem("primetools-auth", "ok");
      } catch (err) {
        console.error("sessionStorage set error", err);
      }
      setIsAuthed(true);
      setError("");
    } else {
      setError("Falsches Passwort.");
    }
  };

  if (isChecking) {
    // kurze „Ladephase“, damit nichts flackert
    return null;
  }

  if (!isAuthed) {
    // Passwort-Formular anzeigen
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-[#10172a] p-6 rounded-2xl shadow-xl w-full max-w-sm space-y-4"
        >
          <h1 className="text-lg font-semibold text-center">Zugang zu PrimeTools</h1>
          <p className="text-sm text-center text-gray-300">
            Bitte gib das Passwort ein, um die Tools zu verwenden.
          </p>

          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-[#020617] px-3 py-2 text-sm outline-none"
          />

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-emerald-500 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  // Wenn freigeschaltet → ganz normale App anzeigen
  return <>{children}</>;
}
