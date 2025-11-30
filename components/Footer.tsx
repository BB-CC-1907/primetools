import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-ptMuted md:flex-row md:items-center md:justify-between">
        <span>© {year} PrimeTools. All rights reserved.</span>
        <div className="flex flex-wrap gap-4">
          <Link href="#" className="hover:text-ptText">
            About
          </Link>
          <Link href="#" className="hover:text-ptText">
            Privacy
          </Link>
          <Link href="#" className="hover:text-ptText">
            Terms
          </Link>
          <Link href="#" className="hover:text-ptText">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
