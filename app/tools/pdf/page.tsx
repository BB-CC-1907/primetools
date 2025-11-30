import PageShell from "@/components/PageShell";
import Section from "@/components/Section";

export default function PdfToolsPage() {
  return (
    <PageShell
      title="PDF Tools"
      subtitle="Compress, merge, split and convert your PDFs in seconds. Backend and real processing are being added soon."
    >
      <div className="grid gap-6 md:grid-cols-[3fr,2fr]">
        <Section title="Your PDF" subtitle="Upload a file and choose a tool.">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-ptText">
                PDF file
              </label>
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-black/15 bg-white/70 px-4 py-10 text-center text-xs text-ptMuted">
                <span>Drag &amp; drop your PDF here</span>
                <span className="text-[10px]">
                  or click the button below to choose a file.
                </span>
                <button className="btn-outline text-xs" disabled>
                  Choose file (coming soon)
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-ptText">
                Action
              </label>
              <select
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none ring-ptAccent/40 focus:ring"
                disabled
              >
                <option>Compress PDF</option>
                <option>Merge PDFs</option>
                <option>Split PDF</option>
                <option>PDF to JPG</option>
                <option>JPG to PDF</option>
              </select>
            </div>

            <button className="btn-primary w-full text-sm opacity-60" disabled>
              Start processing (coming soon)
            </button>

            <p className="text-[11px] text-ptMuted">
              This is the visual layout only. The real PDF processing backend
              and file upload logic will be connected later.
            </p>
          </div>
        </Section>

        <Section
          title="How it will work"
          subtitle="Simple for free users. More power with Premium (coming soon)."
        >
          <ul className="space-y-2 text-xs text-ptMuted">
            <li>
              • <strong>Free:</strong> planned: up to 5 PDF actions per day and
              files up to 10 MB.
            </li>
            <li>
              • <strong>Premium:</strong> larger files, more actions and no ads.
            </li>
            <li>
              • Works on desktop and mobile. No installation required.
            </li>
          </ul>
        </Section>
      </div>
    </PageShell>
  );
}
