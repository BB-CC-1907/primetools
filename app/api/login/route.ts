import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const expectedPassword = process.env.PRIMETOOLS_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json(
        { error: "Server-Passwort ist nicht konfiguriert." },
        { status: 500 }
      );
    }

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Falsches Passwort." },
        { status: 401 }
      );
    }

    // Cookie setzen (z. B. 7 Tage gültig)
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: "primetools_auth",
      value: "ok", // einfacher Marker, kein echtes Session-System
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 Tage
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Login-Fehler:", error);
    return NextResponse.json(
      { error: "Interner Fehler." },
      { status: 500 }
    );
  }
}
