import type { Metadata } from "next";
import { glossary } from "@/lib/glossary";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PinyinBadge } from "@/components/chinese-culture/pinyin-badge";

export const metadata: Metadata = {
  title: "Glossary of Chinese Metaphysical Terms | Oriental Wisdom",
  description:
    "A comprehensive reference of Chinese metaphysical and philosophical terms with pinyin pronunciation and English definitions.",
};

const categoryLabels: Record<string, string> = {
  philosophy: "Philosophy",
  metaphysics: "Metaphysics",
  bazi: "Ba Zi",
  ziwei: "Zi Wei",
  "five-elements": "Five Elements",
  general: "General",
};

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-ink">Glossary</h1>
      <p className="mt-3 text-lg text-ink-muted">
        Your guide to the key terms and concepts in Chinese metaphysics
      </p>

      <div className="mt-12 space-y-4">
        {glossary.map((entry) => (
          <Card key={entry.term} className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <div className="flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h2 className="font-serif text-lg font-bold text-ink">
                  {entry.term}
                </h2>
                <PinyinBadge pinyin={entry.pinyin} />
                <Badge variant="jade">{categoryLabels[entry.category] ?? entry.category}</Badge>
              </div>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {entry.definition}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
