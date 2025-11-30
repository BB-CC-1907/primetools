"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/tools/pdf", label: "PDF Tools" },
  { href: "/tools/text", label: "Text Tools" },
  { href: "/tools/emoji", label: "Emoji Generator" },
  { href: "/tools/captions", label: "Social Captions" },
  { href: "/pricing", label: "Pricing (coming soon)" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-black/5 bg-ptBackground/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-lg font-bold tracking-tight text-ptText">
            Prime
          </span>
          <span className="text-lg font-bold tracking-tight text-ptAccent">
            Tools
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ptMuted md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-ptText"
                  : "text-ptMuted hover:text-ptText"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-xs font-medium text-ptMuted hover:text-ptText"
          >
            Login (coming soon)
          </Link>
          <Link href="/pricing" className="btn-primary text-[11px]">
            Premium (coming soon)
          </Link>
        </div>
      </div>
    </header>
  );
}
