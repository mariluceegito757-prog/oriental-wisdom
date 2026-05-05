"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { getTerm, type GlossaryTerm } from "@/lib/glossary";

interface GlossaryTooltipProps {
  term: string;
  display?: string;
}

export function GlossaryTooltip({ term, display }: GlossaryTooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const entry: GlossaryTerm | undefined = getTerm(term);

  const show = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!entry) return <span>{display ?? term}</span>;

  return (
    <span
      className="relative inline"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <button
        type="button"
        className="inline cursor-help border-b border-dotted border-vermilion/40 text-vermilion-dark transition-colors hover:text-vermilion focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-vermilion"
        aria-describedby={visible ? tooltipId : undefined}
        onClick={() => setVisible((v) => !v)}
      >
        {display ?? term}
      </button>
      {visible && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg border border-ink/10 bg-paper px-4 py-3 shadow-ink min-w-64 max-w-80 text-left"
          onMouseEnter={show}
          onMouseLeave={hide}
          onFocus={show}
          onBlur={hide}
        >
          <span className="flex items-baseline gap-2 mb-1">
            <span className="font-semibold text-ink text-sm">{entry.term}</span>
            <span className="text-xs text-ink-muted italic">{entry.pinyin}</span>
          </span>
          <span className="text-sm text-ink-muted leading-relaxed">
            {entry.definition}
          </span>
        </span>
      )}
    </span>
  );
}
