import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

// Sicherstellen, dass die Route im Node-Runtime läuft (nicht Edge)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: "Bitte mindestens zwei PDF-Dateien hochladen." },
        { status: 400 }
      );
    }

    const mergedPdf = await PDFDocument.create();

    for (const entry of files) {
      // Nur echte File-Objekte weiterverarbeiten
      if (!(entry instanceof File)) continue;

      // Nur PDFs akzeptieren
      if (entry.type !== "application/pdf") continue;

      // Datei in ArrayBuffer und dann in pdf-lib laden
      const arrayBuffer = await entry.arrayBuffer();
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
