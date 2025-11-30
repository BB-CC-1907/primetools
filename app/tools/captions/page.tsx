import PageShell from "@/components/PageShell";
import Section from "@/components/Section";

export default function CaptionsPage() {
  return (
    <PageShell
      title="Social Captions"
      subtitle="Generate captions and hashtags for TikTok, Instagram and YouTube. AI captioning will be connected soon."
    >
      <div className="grid gap-6 md:grid-cols-[3fr,2fr]">
        <Section
          title="Describe your content"
          subtitle="Tell PrimeTools what your post or video is about (coming soon)."
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-ptText">
                Content description
              </label>
              <textarea
                className="min-h-[140px] w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-ptAccent/40 focus:ring"
                placeholder='e.g. "30-second TikTok about a full-body home workout, fun and motivating tone, English"'
                disabled
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-ptText">
                  Platform
                </label>
                <select
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none ring-ptAccent/40 focus:ring"
                  disabled
                >
                  <option>TikTok</option>
                  <option>Instagram</option>
                  <option>YouTube</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-ptText">
                  Tone
                </label>
                <select
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-xs outline-none ring-ptAccent/40 focus:ring"
                  disabled
                >
                  <option>Neutral (Free)</option>
                  <option>Funny (Premium)</option>
                  <option>Motivational (Premium)</option>
                  <option>Educational (Premium)</option>
                </select>
                <p className="text-[10px] text-ptMuted">
                  Additional tones and variants are part of Premium (coming
                  soon).
                </p>
              </div>
            </div>
            <button className="btn-primary w-full text-sm opacity-60" disabled>
              Generate captions (coming soon)
            </button>
          </div>
        </Section>

        <Section
          title="Generated captions"
          subtitle="A preview of how the results will be shown."
        >
          <div className="space-y-3 text-xs text-ptMuted">
            <div className="rounded-2xl border border-black/5 bg-white/80 p-3">
              <p className="text-[11px] font-semibold text-ptText">
                Title / Hook
              </p>
              <p className="mt-1">
                Placeholder for generated hooks. Once the backend is connected,
                hooks will appear here.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/80 p-3">
              <p className="text-[11px] font-semibold text-ptText">
                Caption
              </p>
              <p className="mt-1">
                Placeholder for full captions. This area will show the generated
                caption text.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/80 p-3">
              <p className="text-[11px] font-semibold text-ptText">
                Hashtags
              </p>
              <p className="mt-1">#example #hashtags #will #appear #here</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <button className="btn-outline text-xs opacity-60" disabled>
              Copy all
            </button>
            <button className="btn-outline text-xs opacity-60" disabled>
              Copy hashtags only
            </button>
          </div>
          <p className="mt-2 text-[11px] text-ptMuted">
            Planned: Free up to 10 caption generations per day. Premium: higher
            limits, more tones and multiple variants per click.
          </p>
        </Section>
      </div>
    </PageShell>
  );
}
