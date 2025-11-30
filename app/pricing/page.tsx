import PageShell from "@/components/PageShell";
import PricingTable from "@/components/PricingTable";

export default function PricingPage() {
  return (
    <PageShell
      title="Pricing & plans"
      subtitle="The free plan is available today. Premium subscriptions are planned and will be added soon."
    >
      <PricingTable />
      <p className="mt-4 text-xs text-ptMuted">
        Premium is planned at €3.99 per month or €39.99 per year (2 months
        free). Login and payments are not active yet. At the moment you can use
        all free tools without an account.
      </p>
    </PageShell>
  );
}
