type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Section({ title, subtitle, children }: Props) {
  return (
    <section className="space-y-4 rounded-2xl bg-white/70 p-6 shadow-soft">
      {title && (
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-ptText">{title}</h2>
          {subtitle && (
            <p className="text-xs text-ptMuted">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
