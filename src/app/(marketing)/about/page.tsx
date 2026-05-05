import type { Metadata } from "next";
import { InkBrushDivider } from "@/components/chinese-culture/ink-brush-divider";

export const metadata: Metadata = {
  title: "About Oriental Wisdom",
  description:
    "Bridging East and West through the timeless wisdom of Chinese metaphysics, philosophy, and traditional arts.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-ink">About Oriental Wisdom</h1>
      <p className="mt-3 text-lg text-ink-muted">
        Bridging East and West through timeless wisdom
      </p>

      <InkBrushDivider />

      <div className="space-y-6 text-ink-muted leading-relaxed">
        <p>
          Oriental Wisdom was born from a simple conviction: that the depth and
          sophistication of Chinese metaphysics deserve to be shared with the
          world — in clear, accessible language that respects both the tradition
          and the modern seeker.
        </p>
        <p>
          For millennia, systems like <strong>Ba Zi (Eight Characters)</strong>,{" "}
          <strong>Zi Wei Dou Shu (Purple Star Astrology)</strong>, the{" "}
          <strong>I Ching (Book of Changes)</strong>, and{" "}
          <strong>Feng Shui</strong> have guided countless lives across Asia.
          They offer a lens for understanding personality, timing,
          relationships, and life purpose — not through superstition, but
          through a nuanced framework of elemental dynamics and cosmic rhythm.
        </p>
        <p>
          Our mission is to make this knowledge available to a global audience
          through:
        </p>
        <ul className="space-y-2 list-disc pl-6">
          <li>
            <strong>In-depth articles</strong> that explain concepts from first
            principles
          </li>
          <li>
            <strong>Structured courses</strong> for those ready to dive deeper
          </li>
          <li>
            <strong>Personal consultations</strong> with experienced
            practitioners
          </li>
        </ul>
        <p>
          We believe these ancient arts have profound relevance for modern life —
          not as dogma, but as tools for reflection, self-understanding, and
          living with greater harmony.
        </p>
      </div>
    </div>
  );
}
