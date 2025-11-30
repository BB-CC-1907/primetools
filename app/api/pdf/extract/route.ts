import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Keine Datei empfangen." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const srcPdf = await PDFDocument.load(arrayBuffer);

    const pageCount = srcPdf.getPageCount();

    if (pageCount === 0) {
      return NextResponse.json(
        { error: "Die PDF enthält keine Seiten." },
        { status: 400 }
      );
    }

    const zip = new JSZip();

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(srcPdf, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      zip.file(`page-${i + 1}.pdf`, pdfBytes);
    }

    const zipBytes = await zip.generateAsync({ type: "uint8array" });

    return new NextResponse(zipBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition":
          'attachment; filename="primetools-extracted-pages.zip"',
      },
    });
  } catch (error) {
    console.error("Fehler beim Extrahieren der PDF-Seiten:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler beim Extrahieren der Seiten." },
      { status: 500 }
    );
  }
}
