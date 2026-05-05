import type { Metadata } from "next";
import { BaZiForm } from "./bazi-form";

export const metadata: Metadata = {
  title: "Free BaZi Calculator | Oriental Wisdom",
  description:
    "Calculate your Four Pillars of Destiny (Ba Zi) for free. Discover your Day Master, elemental balance, and the heavenly stems and earthly branches that shape your destiny.",
};

export default function BaZiCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-ink">
          Free BaZi Calculator
        </h1>
        <p className="mt-3 text-lg text-ink-muted">
          Calculate your Four Pillars of Destiny —
          discover your Day Master and elemental balance
        </p>
      </div>

      <BaZiForm />
    </div>
  );
}
