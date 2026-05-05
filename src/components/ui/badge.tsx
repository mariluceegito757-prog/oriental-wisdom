import type { HTMLAttributes } from "react";

const variants = {
  default: "bg-ink/8 text-ink",
  vermilion: "bg-vermilion/10 text-vermilion",
  gold: "bg-gold/10 text-gold-dark",
  jade: "bg-jade/10 text-jade",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
