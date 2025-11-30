import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Statische Dateien & Login-Zeug NICHT schützen
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/login" ||
    pathname === "/api/login"
  ) {
    return NextResponse.next();
  }

  // Cookie auslesen
  const authCookie = request.cookies.get("primetools_auth");

  // Wenn kein oder falsches Cookie -> auf /login umleiten
  if (!authCookie || authCookie.value !== "ok") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Zugriff erlauben
  return NextResponse.next();
}

// Sagt Next.js, für welche Routen die Middleware gilt
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
