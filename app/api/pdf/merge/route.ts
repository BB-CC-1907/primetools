import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

// Sicherstellen, dass wir im Node.js-Runtime laufen (nicht Edge)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Je nach Frontend-Key – wir sammeln alles ein, was wie Dateien aussieht
    const allEntries: FormDataEntryValue[] = [
      ...formData.getAll("files"),
      ...formData.getAll("pdfs"),
      ...formData.getAll("pdfFiles"),
    ];

    // Nur Werte behalten, die wirklich Datei-ähnlich sind
    const fileEntries = allEntries.filter(
      (entry: FormDataEntryValue) =>
        typeof (entry as any)?.arrayBuffer === "function"
    ) as any[];

    if (!fileEntries || fileEntries.length < 2) {
      return NextResponse.json(
        { error: "Bitte mindestens zwei PDF-Dateien hochladen." },
        { status: 400 }
      );
    }

    const mergedPdf = await PDFDocument.create();

    for (const entry of fileEntries) {
      const file: any = entry;

      // Wenn ein MIME-Typ vorhanden ist und nicht PDF → überspringen
      if (file.type && file.type !== "application/pdf") {
        continue;
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const copiedPages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      for (const page of copiedPages) {
        mergedPdf.addPage(page);
      }
    }

    const mergedBytes = await mergedPdf.save();

    return new Response(mergedBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="primetools-merged.pdf"',
      },
    });
  } catch (error) {
    console.error("Merge error:", error);
    return NextResponse.json(
      { error: "Beim Zusammenführen ist ein Fehler aufgetreten." },
      { status: 500 }
    );
  }
}
