import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "PrimeTools – KI-Tools für PDFs, Texte, Emojis & Social Media",
  description:
    "PrimeTools bündelt kostenlose KI-Tools für PDFs, Texte, Emojis und Social-Media-Bildunterschriften in einer übersichtlichen Oberfläche. Keine Anmeldung nötig. Verfügbar auf Deutsch und Englisch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
