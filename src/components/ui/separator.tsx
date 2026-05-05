interface SeparatorProps {
  className?: string;
  label?: string;
}

export function Separator({ className = "", label }: SeparatorProps) {
  if (label) {
    return (
      <div className={`flex items-center gap-4 ${className}`} role="separator">
        <div className="h-px flex-1 bg-ink/12" aria-hidden />
        <span className="text-sm text-ink-muted">{label}</span>
        <div className="h-px flex-1 bg-ink/12" aria-hidden />
      </div>
    );
  }

  return <hr className={`border-ink/12 ${className}`} />;
}
