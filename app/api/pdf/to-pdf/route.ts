import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Bitte mindestens eine Bilddatei hochladen." },
        { status: 400 }
      );
    }

    const imageFiles = files.filter(
      (file): file is File =>
        file instanceof File &&
        (file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png")
    );

    if (imageFiles.length === 0) {
      return NextResponse.json(
        {
          error:
            "Aktuell werden nur Bilddateien im Format JPG oder PNG unterstützt.",
        },
        { status: 400 }
      );
    }

    const pdfDoc = await PDFDocument.create();

    for (const imageFile of imageFiles) {
      const bytes = await imageFile.arrayBuffer();

      let embeddedImage;
      if (
        imageFile.type === "image/jpeg" ||
        imageFile.type === "image/jpg"
      ) {
        embeddedImage = await pdfDoc.embedJpg(bytes);
      } else {
        embeddedImage = await pdfDoc.embedPng(bytes);
      }

      const { width, height } = embeddedImage.size();

      const page = pdfDoc.addPage([width, height]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="primetools-from-images.pdf"',
      },
    });
  } catch (error) {
    console.error("To-PDF error:", error);
    return NextResponse.json(
      {
        error:
          "Beim Umwandeln in PDF ist ein Fehler aufgetreten.",
      },
      { status: 500 }
    );
  }
}
