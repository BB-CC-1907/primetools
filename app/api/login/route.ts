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

    // ✅ Kein Cookie mehr setzen – nur Erfolg zurückgeben
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login-Fehler:", error);
    return NextResponse.json(
      { error: "Interner Fehler." },
      { status: 500 }
    );
  }
}
