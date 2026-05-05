interface PinyinBadgeProps {
  pinyin: string;
  className?: string;
}

export function PinyinBadge({ pinyin, className = "" }: PinyinBadgeProps) {
  return (
    <span
      className={`text-xs text-ink-muted italic font-serif tracking-wide ${className}`}
      aria-label={`Pronunciation: ${pinyin}`}
    >
      {pinyin}
    </span>
  );
}
