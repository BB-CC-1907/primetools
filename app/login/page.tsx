"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        router.push("/");
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Falsches Passwort.");
      }
    } catch (err) {
      console.error(err);
      setError("Es ist ein Fehler aufgetreten. Bitte später erneut versuchen.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7efe6] text-[#222222]">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eddcc7]">
        <h1 className="text-xl font-semibold text-center mb-4">
          Prime<span className="text-[#14b8a6]">Tools</span> Zugang
        </h1>
        <p className="text-xs text-[#555555] text-center mb-4">
          Diese Vorabversion ist geschützt. Bitte Passwort eingeben.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#222222] mb-1">
              Passwort
            </label>
            <input
              type="password"
              className="w-full rounded-xl border border-[#e0d2bd] bg-white px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#00b894]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-[11px] text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-[#14b8a6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0f9e90] transition-colors"
          >
            Anmelden
          </button>
        </form>
      </div>
    </main>
  );
}
