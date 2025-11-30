import PageShell from "@/components/PageShell";
import Section from "@/components/Section";

export default function TextToolsPage() {
  return (
    <PageShell
      title="Text Tools"
      subtitle="Rewrite, simplify and summarize your text instantly. AI backend will be connected soon."
    >
      <div className="grid gap-6 md:grid-cols-[3fr,2fr]">
        <Section title="Your text" subtitle="Paste your text and choose a mode.">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-ptText">
                Input text
              </label>
              <textarea
                className="min-h-[180px] w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-ptAccent/40 focus:ring"
                placeholder="Paste your text here... (AI processing coming soon)"
                disabled
              />
              <p className="text-[11px] text-ptMuted">
                Free: planned up to 10,000 characters per day. Premium: higher
                limits and more styles.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-ptText">
                  Mode
                </label>
                <select
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none ring-ptAccent/40 focus:ring"
                  disabled
                >
                  <option>Rewrite</option>
                  <option>Simplify</option>
                  <option>Summarize</option>
                  <option>Create checklist</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-ptText">
                  Tone (Premium preview)
                </label>
                <select
                  className="w-full rounded-xl border border-dashed border-ptAccent/40 bg-white px-3 py-2 text-xs text-ptMuted outline-none"
                  disabled
                >
                  <option>Neutral (Free)</option>
                  <option>Professional (Premium)</option>
                  <option>Friendly (Premium)</option>
                  <option>Playful (Premium)</option>
                  <option>SEO optimized (Premium)</option>
                </select>
                <p className="text-[10px] text-ptMuted">
                  Additional tones will be unlocked with Premium.
                </p>
              </div>
            </div>
            <button className="btn-primary w-full text-sm opacity-60" disabled>
              Generate result (coming soon)
            </button>
          </div>
        </Section>

        <Section title="Result" subtitle="Your AI-enhanced output will appear here.">
          <div className="min-h-[160px] rounded-2xl border border-black/5 bg-white/70 px-3 py-2 text-sm text-ptMuted">
            Result placeholder – will show the AI-generated text once the
            backend is connected.
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
