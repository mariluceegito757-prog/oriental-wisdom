export function InkBrushDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`} aria-hidden>
      <svg
        width="120"
        height="12"
        viewBox="0 0 120 12"
        fill="none"
        className="opacity-20"
      >
        <path
          d="M2 6 C20 2, 30 10, 40 6 C50 2, 60 10, 80 6 C90 4, 100 8, 118 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="60" cy="6" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}
