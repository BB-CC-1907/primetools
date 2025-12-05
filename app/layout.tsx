import "./globals.css";
import { Providers } from "./providers";
import SessionPasswordGate from "../components/SessionPasswordGate";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PrimeTools – KI-Tools für PDFs, Texte, Emojis & Social Media",
  description:
    "PrimeTools bündelt kostenlose KI-Tools für PDFs, Texte, Emojis und Social-Media-Bildunterschriften in einer Oberfläche.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Providers>
          <SessionPasswordGate>{children}</SessionPasswordGate>
        </Providers>
      </body>
    </html>
  );
}
