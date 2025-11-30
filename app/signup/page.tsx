import PageShell from "@/components/PageShell";

export default function SignupPage() {
  return (
    <PageShell
      title="Sign up (coming soon)"
      subtitle="Login-Funktion kommt bald. Aktuell kannst du PrimeTools ohne Account nutzen."
    >
      <div className="card max-w-sm space-y-4">
        <p className="text-sm text-ptMuted">
          Account creation and Premium subscriptions are not active yet. At the
          moment you can use all free tools without signing up.
        </p>
        <p className="text-xs text-ptMuted">
          Später kannst du hier ein Konto erstellen, um Premium zu abonnieren,
          deine Limits zu erhöhen und Werbung auszublenden.
        </p>
        <button className="btn-primary w-full text-sm opacity-60" disabled>
          Sign up coming soon
        </button>
      </div>
    </PageShell>
  );
}
