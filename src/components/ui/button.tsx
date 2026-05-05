import { type ButtonHTMLAttributes, forwardRef } from "react";

const variants = {
  primary:
    "bg-ink text-paper hover:bg-ink-light active:bg-ink-muted",
  secondary:
    "border border-ink/20 bg-transparent text-ink hover:bg-ink/5 active:bg-ink/10",
  vermilion:
    "bg-vermilion text-white hover:bg-vermilion-light active:bg-vermilion-dark",
  gold: "bg-gold text-white hover:bg-gold-light active:bg-gold-dark",
  jade: "bg-jade text-white hover:bg-jade-light active:bg-jade-dark",
  ghost: "bg-transparent text-ink-muted hover:text-ink hover:bg-ink/5",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-8 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
