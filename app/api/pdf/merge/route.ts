import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

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

    for (const file of files) {
      if (!(file instanceof File)) continue;
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { error: `Nur PDF-Dateien erlaubt. ${file.name} ist kein PDF.` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const copiedPages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();

    return new NextResponse(mergedBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          "attachment; filename=primetools-merged.pdf",
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