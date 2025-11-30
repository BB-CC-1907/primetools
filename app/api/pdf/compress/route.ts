import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

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

    const bytes = await file.arrayBuffer();

    // PDF laden
    const pdfDoc = await PDFDocument.load(bytes);

    // Komprimiertes PDF speichern (Basis-Komprimierung über pdf-lib)
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
    });

    return new NextResponse(compressedBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="primetools-compressed.pdf"',
      },
    });
  } catch (error) {
    console.error("Compress error:", error);
    return NextResponse.json(
      {
        error:
          "Beim Komprimieren der PDF ist ein Fehler aufgetreten.",
      },
      { status: 500 }
    );
  }
}
