import { NextResponse } from "next/server";
import { PDFDocument, degrees } from "pdf-lib";

function parsePages(pages: string, totalPages: number): number[] {
  const result = new Set<number>();
  const parts = pages.split(",");

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.includes("-")) {
      const [startStr, endStr] = trimmed.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (Number.isNaN(start) || Number.isNaN(end)) continue;

      const from = Math.max(1, Math.min(start, end));
      const to = Math.min(totalPages, Math.max(start, end));

      for (let p = from; p <= to; p++) {
        result.add(p - 1); // 0-basiert
      }
    } else {
      const pageNum = parseInt(trimmed, 10);
      if (!Number.isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        result.add(pageNum - 1);
      }
    }
  }

  return Array.from(result).sort((a, b) => a - b);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const pagesInput = (formData.get("pages") as string | null) || "";
    const angleInput = (formData.get("angle") as string | null) || "90";

    if (!file) {
      return NextResponse.json(
        { error: "Keine Datei empfangen." },
        { status: 400 }
      );
    }

    if (!pagesInput.trim()) {
      return NextResponse.json(
        { error: "Kein Seitenbereich angegeben." },
        { status: 400 }
      );
    }

    const angle = parseInt(angleInput, 10);
    if (![90, 180, 270].includes(angle)) {
      return NextResponse.json(
        { error: "Ungültiger Drehwinkel." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const totalPages = pdfDoc.getPageCount();
    const pagesToRotate = parsePages(pagesInput, totalPages);

    if (pagesToRotate.length === 0) {
      return NextResponse.json(
        { error: "Keine gültigen Seiten im Bereich gefunden." },
        { status: 400 }
      );
    }

    const pages = pdfDoc.getPages();

    for (const idx of pagesToRotate) {
      const page = pages[idx];
      const currentRotation = page.getRotation().angle || 0;
      const newRotation = (currentRotation + angle) % 360;
      page.setRotation(degrees(newRotation));
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="primetools-rotated.pdf"',
      },
    });
  } catch (error) {
    console.error("Fehler beim Drehen der PDF-Seiten:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler beim Drehen der Seiten." },
      { status: 500 }
    );
  }
}
