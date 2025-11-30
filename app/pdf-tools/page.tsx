"use client";

import { useState } from "react";
import Link from "next/link";
import { useT } from "../../hooks/useT";
import { useLanguage } from "../../context/LanguageContext";

function LanguageToggle() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-[#555555]">
      <button
        onClick={() => changeLanguage("de")}
        className={`rounded-full px-2 py-1 border border-transparent ${
          language === "de"
            ? "bg-[#14b8a6] text-white"
            : "hover:bg-[#14b8a6]/5 hover:border-[#14b8a6]"
        }`}
      >
        DE
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`rounded-full px-2 py-1 border border-transparent ${
          language === "en"
            ? "bg-[#14b8a6] text-white"
            : "hover:bg-[#14b8a6]/5 hover:border-[#14b8a6]"
        }`}
      >
        EN
      </button>
    </div>
  );
}

export default function PdfToolsPage() {
  const t = useT();
  const [files, setFiles] = useState<File[]>([]);
  const [splitPages, setSplitPages] = useState("");
  const [rotateAngle, setRotateAngle] = useState("90"); // 90, 180 oder 270 Grad

  const handleFileChange = (event: any) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const newFiles = Array.from(fileList);

    // neue Dateien an bestehende anhängen
    setFiles((prev) => [...prev, ...newFiles]);

    // Input zurücksetzen, damit man dieselbe Datei später nochmal auswählen kann
    event.target.value = "";
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearFiles = () => {
    setFiles([]);
    setSplitPages(""); // Seitenbereich auch zurücksetzen
  };

  const handleActionClick = (action: string) => {
    if (action === "compress") {
      compressPdf();
      return;
    }

    if (action === "merge") {
      mergePdfs();
      return;
    }

    if (action === "split") {
      splitPdf();
      return;
    }

    if (action === "toPdf") {
      convertFilesToPdf();
      return;
    }

    if (action === "rotate") {
      rotatePdf();
      return;
    }

    if (action === "extract") {
      extractPdfPages();
      return;
    }

    // toJpg und alles andere: Platzhalter
    alert(`${t("pdfPage.comingSoon")}\n\nAktion: ${action}`);
  };

  const splitPdf = async () => {
    if (!splitPages || !splitPages.trim()) {
      alert("Bitte einen Seitenbereich eingeben, z. B. 1-3,5,7-9.");
      return;
    }

    if (files.length === 0) {
      alert("Bitte mindestens eine Datei auswählen.");
      return;
    }

    const onlyPdfs = files.filter(
      (file) => file.type === "application/pdf"
    );

    if (onlyPdfs.length === 0) {
      alert("Bitte mindestens eine PDF-Datei auswählen.");
      return;
    }

    if (onlyPdfs.length > 1) {
      alert("Bitte genau eine PDF-Datei für das Aufteilen ausgewählt lassen.");
      return;
    }

    const pdfFile = onlyPdfs[0];

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("pages", splitPages);

      const response = await fetch("/api/pdf/split", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        alert(data?.error || "Es ist ein Fehler aufgetreten.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "primetools-split.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Beim Aufteilen ist ein Fehler aufgetreten.");
    }
  };

  const extractPdfPages = async () => {
    if (files.length === 0) {
      alert("Bitte mindestens eine Datei auswählen.");
      return;
    }

    const onlyPdfs = files.filter(
      (file) => file.type === "application/pdf"
    );

    if (onlyPdfs.length === 0) {
      alert("Bitte mindestens eine PDF-Datei auswählen.");
      return;
    }

    if (onlyPdfs.length > 1) {
      alert("Bitte genau eine PDF-Datei für das Extrahieren ausgewählt lassen.");
      return;
    }

    const pdfFile = onlyPdfs[0];

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);

      const response = await fetch("/api/pdf/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        alert(data?.error || "Es ist ein Fehler aufgetreten.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "primetools-extracted-pages.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Beim Extrahieren der Seiten ist ein Fehler aufgetreten.");
    }
  };

const rotatePdf = async () => {
  if (!splitPages || !splitPages.trim()) {
    alert("Bitte einen Seitenbereich eingeben, z. B. 1-3,5,7-9.");
    return;
  }

  if (files.length === 0) {
    alert("Bitte mindestens eine Datei auswählen.");
    return;
  }

  const onlyPdfs = files.filter(
    (file) => file.type === "application/pdf"
  );

  if (onlyPdfs.length === 0) {
    alert("Bitte mindestens eine PDF-Datei auswählen.");
    return;
  }

  if (onlyPdfs.length > 1) {
    alert("Bitte genau eine PDF-Datei für das Drehen ausgewählt lassen.");
    return;
  }

  const pdfFile = onlyPdfs[0];

  try {
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("pages", splitPages);    // gleicher Seitenbereich wie beim Split
    formData.append("angle", rotateAngle);   // 90, 180 oder 270

    const response = await fetch("/api/pdf/rotate", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      alert(data?.error || "Es ist ein Fehler aufgetreten.");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "primetools-rotated.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Beim Drehen der Seiten ist ein Fehler aufgetreten.");
  }
};

  const convertFilesToPdf = async () => {
    if (files.length === 0) {
      alert("Bitte mindestens eine Bilddatei auswählen (JPG oder PNG).");
      return;
    }

    const imageFiles = files.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png"
    );

    if (imageFiles.length === 0) {
      alert(
        "Aktuell können nur Bilddateien im Format JPG oder PNG in PDF umgewandelt werden."
      );
      return;
    }

    try {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/pdf/to-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        alert(data?.error || "Es ist ein Fehler aufgetreten.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "primetools-from-images.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Beim Umwandeln in PDF ist ein Fehler aufgetreten.");
    }
  };

  const compressPdf = async () => {
    if (files.length === 0) {
      alert("Bitte mindestens eine Datei auswählen.");
      return;
    }

    const onlyPdfs = files.filter(
      (file) => file.type === "application/pdf"
    );

    if (onlyPdfs.length === 0) {
      alert("Bitte mindestens eine PDF-Datei auswählen.");
      return;
    }

    if (onlyPdfs.length > 1) {
      alert(
        "Bitte genau eine PDF-Datei für die Komprimierung ausgewählt lassen."
      );
      return;
    }

    const pdfFile = onlyPdfs[0];

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);

      const response = await fetch("/api/pdf/compress", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        alert(data?.error || "Es ist ein Fehler aufgetreten.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "primetools-compressed.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Beim Komprimieren ist ein Fehler aufgetreten.");
    }
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      alert("Bitte mindestens zwei PDF-Dateien auswählen.");
      return;
    }

    const onlyPdfs = files.filter(
      (file) => file.type === "application/pdf"
    );

    if (onlyPdfs.length < 2) {
      alert("Mindestens zwei der ausgewählten Dateien müssen PDFs sein.");
      return;
    }

    try {
      const formData = new FormData();
      onlyPdfs.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/pdf/merge", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        alert(data?.error || "Es ist ein Fehler aufgetreten.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "primetools-merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Beim Zusammenführen ist ein Fehler aufgetreten.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7efe6] text-[#222222]">
      {/* Header */}
      <header className="border-b border-[#e4d7c7] bg-[#f7efe6]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-lg font-semibold text-[#222222]">
              Prime
            </span>
            <span className="text-lg font-semibold text-[#14b8a6]">
              Tools
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/"
              className="rounded-full border border-[#14b8a6] px-4 py-1.5 text-xs font-semibold text-[#14b8a6] hover:bg-[#14b8a6]/5"
            >
              {t("pdfPage.backToHome")}
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row">
        {/* Upload-Bereich */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#222222] md:text-3xl">
              {t("pdfPage.title")}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[#555555]">
              {t("pdfPage.subtitle")}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eddcc7]">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#ddbfa0] bg-[#fdf7ef] px-4 py-10 text-center transition hover:bg-[#f7efe6]">
              <span className="mb-2 text-sm font-medium text-[#222222]">
                {t("pdfPage.uploadLabel")}
              </span>
              <span className="text-xs text-[#777777]">
                {t("pdfPage.uploadHint")}
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.ppt,.pptx"
              />
            </label>

            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold text-[#222222]">
                {t("pdfPage.selectedFiles")}
              </h2>
              {files.length === 0 ? (
                <p className="text-xs text-[#777777]">
                  {t("pdfPage.noFiles")}
                </p>
              ) : (
                <>
                  <ul className="space-y-1 text-xs text-[#555555]">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex flex-col">
                          <span className="truncate">{file.name}</span>
                          <span className="text-[10px] text-[#999999]">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>

                        <button
                          onClick={() => removeFile(index)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-[#dddddd] text-[#888888] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={clearFiles}
                    className="mt-3 inline-flex items-center gap-1 rounded-full border border-[#e0bcbc] px-3 py-1 text-[11px] font-medium text-[#aa4a4a] transition-colors hover:bg-[#d86b6b] hover:text-white"
                  >
                    <span>✕</span>
                    <span>{t("pdfPage.clearAllFiles")}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Aktionen */}
        <aside className="flex-1 space-y-4">
          <h2 className="text-sm font-semibold text-[#222222]">
            {t("pdfPage.actionsTitle")}
          </h2>

          <div className="grid gap-4">
            <button
              onClick={() => handleActionClick("compress")}
              className="rounded-2xl bg-white p-4 text-left text-sm text-[#444444] shadow-sm ring-1 ring-[#eddcc7] hover:bg-[#f9efe3]"
            >
              <div className="font-semibold">{t("pdfPage.compress")}</div>
              <div className="mt-1 text-xs text-[#777777]">
                {t("pdfPage.compressDescription")}
              </div>
            </button>

            <button
              onClick={() => handleActionClick("merge")}
              className="rounded-2xl bg-white p-4 text-left text-sm text-[#444444] shadow-sm ring-1 ring-[#eddcc7] hover:bg-[#f9efe3]"
            >
              <div className="font-semibold">{t("pdfPage.merge")}</div>
              <div className="mt-1 text-xs text-[#777777]">
                {t("pdfPage.mergeDescription")}
              </div>
            </button>

            <button
              onClick={() => handleActionClick("split")}
              className="rounded-2xl bg-white p-4 text-left text-sm text-[#444444] shadow-sm ring-1 ring-[#eddcc7] hover:bg-[#f9efe3]"
            >
              <div className="font-semibold">{t("pdfPage.split")}</div>
              <div className="mt-1 text-xs text-[#777777]">
                {t("pdfPage.splitDescription")}
              </div>
            </button>

            <button
              onClick={() => handleActionClick("toPdf")}
              className="rounded-2xl bg-white p-4 text-left text-sm text-[#444444] shadow-sm ring-1 ring-[#eddcc7] hover:bg-[#f9efe3]"
            >
              <div className="font-semibold">{t("pdfPage.toPdf")}</div>
              <div className="mt-1 text-xs text-[#777777]">
                {t("pdfPage.toPdfDescription")}
              </div>
            </button>

            <button
              onClick={() => handleActionClick("toJpg")}
              className="rounded-2xl bg-white p-4 text-left text-sm text-[#444444] shadow-sm ring-1 ring-[#eddcc7] hover:bg-[#f9efe3]"
            >
              <div className="font-semibold">{t("pdfPage.toJpg")}</div>
              <div className="mt-1 text-xs text-[#777777]">
                {t("pdfPage.toJpgDescription")}
              </div>
            </button>

            <button
              onClick={() => handleActionClick("rotate")}
              className="rounded-2xl bg-white p-4 text-left text-sm text-[#444444] shadow-sm ring-1 ring-[#eddcc7] hover:bg-[#f9efe3]"
            >
              <div className="font-semibold">{t("pdfPage.rotate")}</div>
              <div className="mt-1 text-xs text-[#777777]">
            {t("pdfPage.rotateDescription")}
              </div>
            </button>

            <button
              onClick={() => handleActionClick("extract")}
              className="rounded-2xl bg-white p-4 text-left text-sm text-[#444444] shadow-sm ring-1 ring-[#eddcc7] hover:bg-[#f9efe3]"
            >
              <div className="font-semibold">{t("pdfPage.extract")}</div>
              <div className="mt-1 text-xs text-[#777777]">
            {t("pdfPage.extractDescription")}
              </div>
            </button>
          </div>

          <div className="mt-4 text-xs text-[#555555]">
            <label className="mb-1 block font-semibold">
              {t("pdfPage.splitInputLabel")}
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-[#e0d2bd] bg-white px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#00b894]"
              placeholder={t("pdfPage.splitInputPlaceholder")}
              value={splitPages}
              onChange={(e) => setSplitPages(e.target.value)}
            />
            <p className="mt-1 text-[11px] text-[#777777]">
              {t("pdfPage.splitInputHint")}
            </p>
          </div>

<div className="mt-3 text-xs text-[#555555]">
  <label className="mb-1 block font-semibold">
    {t("pdfPage.rotateAngleLabel")}
  </label>
  <select
    className="w-full rounded-xl border border-[#e0d2bd] bg-white px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#00b894]"
    value={rotateAngle}
    onChange={(e) => setRotateAngle(e.target.value)}
  >
    <option value="90">{t("pdfPage.rotateAngle90")}</option>
    <option value="180">{t("pdfPage.rotateAngle180")}</option>
    <option value="270">{t("pdfPage.rotateAngle270")}</option>
  </select>
  <p className="mt-1 text-[11px] text-[#777777]">
    {t("pdfPage.rotateAngleHint")}
  </p>
</div>

          <p className="mt-6 text-sm text-[#666666]">
            {t("pdfPage.simpleCompressionNote")}
          </p>

          <p className="mt-2 text-xs text-[#999999]">
            {t("pdfPage.comingSoon")}
          </p>
        </aside>
      </section>
    </main>
  );
}
