import Link from "next/link";

export default function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold text-ptText">Free (live)</h2>
          <p className="text-sm text-ptMuted">
            Start for free with fair daily limits. No account required.
          </p>
        </div>
        <p className="text-3xl font-bold text-ptText">€0</p>
        <ul className="space-y-1 text-sm text-ptMuted">
          <li>• Access to all tools</li>
          <li>• Fair daily limits</li>
          <li>• Ads (planned)</li>
          <li>• No credit card required</li>
        </ul>
        <div className="mt-auto">
          <Link href="/tools/pdf" className="btn-outline w-full text-center">
            Use PrimeTools for free
          </Link>
        </div>
      </div>

      <div className="card flex flex-col gap-4 border border-ptAccent/40 opacity-70">
        <div>
          <h2 className="text-xl font-semibold text-ptText">
            Premium (coming soon)
          </h2>
          <p className="text-sm text-ptMuted">
            No ads, higher limits and extra features – available soon.
          </p>
        </div>
        <div className="flex items-baseline gap-3">
          <p className="text-3xl font-bold text-ptText">€3.99</p>
          <span className="text-xs text-ptMuted">per month</span>
        </div>
        <p className="text-xs text-ptMuted">
          Planned: €39.99 per year (2 months free).
        </p>
        <ul className="space-y-1 text-sm text-ptMuted">
          <li>• No ads</li>
          <li>• Higher or no daily limits</li>
          <li>• Faster processing</li>
          <li>• Larger PDFs, more text modes</li>
          <li>• HD emojis & sticker packs</li>
          <li>• More caption styles & variants</li>
        </ul>
        <div className="mt-auto">
          <button
            className="btn-primary w-full text-center text-sm opacity-60"
            disabled
          >
            Premium coming soon
          </button>
        </div>
      </div>
    </div>
  );
}
