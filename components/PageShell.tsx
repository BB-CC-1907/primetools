type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function PageShell({ title, subtitle, children }: Props) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-ptText">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-sm text-ptMuted">{subtitle}</p>
        )}
      </header>
      {children}
    </div>
  );
}
