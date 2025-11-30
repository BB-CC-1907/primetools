import PageShell from "@/components/PageShell";
import Section from "@/components/Section";

export default function EmojiPage() {
  return (
    <PageShell
      title="Emoji Generator"
      subtitle="Create your own AI-generated emojis and stickers. Image generation backend will be added soon."
    >
      <div className="grid gap-6 md:grid-cols-[3fr,2fr]">
        <Section
          title="Describe your emoji"
          subtitle="Use a short description and generate a custom emoji (coming soon)."
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-ptText">
                Emoji description
              </label>
              <input
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-ptAccent/40 focus:ring"
                placeholder='e.g. "happy panda with sunglasses"'
                disabled
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-ptText">
                Style (Premium preview)
              </label>
              <select
                className="w-full rounded-xl border border-dashed border-ptAccent/40 bg-white px-3 py-2 text-xs text-ptMuted outline-none"
                disabled
              >
                <option>Classic emoji (Free)</option>
                <option>Sticker-like (Premium)</option>
                <option>Outline style (Premium)</option>
              </select>
              <p className="text-[10px] text-ptMuted">
                Additional styles and sets are part of Premium (coming soon).
              </p>
            </div>
            <button className="btn-primary w-full text-sm opacity-60" disabled>
              Generate emoji (coming soon)
            </button>
            <p className="text-[11px] text-ptMuted">
              Planned: Free up to 5 emojis per day. Premium: higher limits, HD
              export and transparent background.
            </p>
          </div>
        </Section>

        <Section
          title="Preview & download"
          subtitle="Once implemented, your emoji will appear here."
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-black/5 bg-white/80 text-xs text-ptMuted">
              Emoji preview (placeholder)
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="btn-outline text-xs opacity-60" disabled>
                Download PNG (Free)
              </button>
              <button className="btn-outline text-xs opacity-60" disabled>
                HD PNG (Premium)
              </button>
              <button className="btn-outline text-xs opacity-60" disabled>
                Sticker pack (Premium)
              </button>
            </div>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
