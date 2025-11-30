import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

function parsePagesInput(input: string, pageCount: number): number[] {
  const parts = input
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const indices = new Set<number>();

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((p) => p.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);

      if (isNaN(start) || isNaN(end) || start < 1 || end < 1 || start > end) {
        throw new Error(`Ungültiger Bereich: "${part}"`);
      }

      for (let page = start; page <= end; page++) {
        if (page > pageCount) {
          throw new Error(
            `Seite ${page} liegt außerhalb des Dokuments (max. ${pageCount}).`
          );
        }
        indices.add(page - 1); // 0-basiert für pdf-lib
      }
    } else {
      const page = parseInt(part, 10);
      if (isNaN(page) || page < 1) {
        throw new Error(`Ungültige Seitenzahl: "${part}"`);
      }
      if (page > pageCount) {
        throw new Error(
          `Seite ${page} liegt außerhalb des Dokuments (max. ${pageCount}).`
        );
      }
      indices.add(page - 1); // 0-basiert
    }
  }

  if (indices.size === 0) {
    throw new Error("Es wurden keine gültigen Seiten gefunden.");
  }

  return Array.from(indices).sort((a, b) => a - b);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const pagesInput = formData.get("pages");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Bitte genau eine PDF-Datei hochladen." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: `Nur PDF-Dateien erlaubt. ${file.name} ist kein PDF.` },
        { status: 400 }
      );
    }

    if (!pagesInput || typeof pagesInput !== "string" || !pagesInput.trim()) {
      return NextResponse.json(
        {
          error:
            "Bitte einen Seitenbereich angeben, z. B. 1-3,5,7-9.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const srcDoc = await PDFDocument.load(bytes);
    const pageCount = srcDoc.getPageCount();

    let indices: number[];
    try {
      indices = parsePagesInput(pagesInput, pageCount);
    } catch (err: any) {
      return NextResponse.json(
        { error: err?.message || "Ungültige Seitenangabe." },
        { status: 400 }
      );
    }

    const newDoc = await PDFDocument.create();
    const copiedPages = await newDoc.copyPages(srcDoc, indices);
    copiedPages.forEach((p) => newDoc.addPage(p));

    const newBytes = await newDoc.save();

    return new NextResponse(newBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="primetools-split.pdf"',
      },
    });
  } catch (error) {
    console.error("Split error:", error);
    return NextResponse.json(
      {
        error:
          "Beim Aufteilen der PDF ist ein Fehler aufgetreten.",
      },
      { status: 500 }
    );
  }
}
