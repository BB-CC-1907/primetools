import "./globals.css";
import { Providers } from "./providers";
import { ReactNode } from "react";
import PasswordGate from "../components/PasswordGate";

export const metadata = {
  title: "PrimeTools – KI-Tools für PDFs, Texte, Emojis & Social Media",
  description:
    "PrimeTools bündelt kostenlose KI-Tools für PDFs, Texte, Emojis und Social-Media-Bildunterschriften in einer Plattform.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <Providers>
          <PasswordGate>{children}</PasswordGate>
        </Providers>
      </body>
    </html>
  );
}
