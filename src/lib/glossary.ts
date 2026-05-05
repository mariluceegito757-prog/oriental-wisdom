export interface GlossaryTerm {
  term: string;
  pinyin: string;
  definition: string;
  category: "philosophy" | "metaphysics" | "bazi" | "ziwei" | "five-elements" | "general";
}

export const glossary: GlossaryTerm[] = [
  {
    term: "Wu Xing",
    pinyin: "wǔ xíng",
    definition: "The Five Elements or Five Phases — Wood, Fire, Earth, Metal, and Water — that describe the dynamic interactions and relationships between all phenomena in the universe.",
    category: "five-elements",
  },
  {
    term: "Qi",
    pinyin: "qì",
    definition: "The vital life force or energy that flows through all living things and the universe. In Chinese philosophy, the balance and flow of Qi determines health, fortune, and harmony.",
    category: "philosophy",
  },
  {
    term: "Yin Yang",
    pinyin: "yīn yáng",
    definition: "The dualistic principle of complementary opposites — light/dark, active/passive, masculine/feminine — whose dynamic balance governs the natural world.",
    category: "philosophy",
  },
  {
    term: "Ba Zi",
    pinyin: "bā zì",
    definition: "Literally 'Eight Characters,' Ba Zi is a Chinese astrological system based on the Four Pillars of Destiny — year, month, day, and hour of birth — each expressed as a Heavenly Stem and Earthly Branch.",
    category: "bazi",
  },
  {
    term: "Zi Wei Dou Shu",
    pinyin: "zǐ wēi dǒu shù",
    definition: "An advanced form of Chinese astrology that maps the positions of 100+ stars across 12 palaces to analyze a person's destiny, personality, relationships, and life path. Often called 'Purple Star Astrology.'",
    category: "ziwei",
  },
  {
    term: "Heavenly Stem",
    pinyin: "tiān gān",
    definition: "The ten celestial energies (Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui) that combine with the twelve Earthly Branches to form the sexagenary cycle used in Ba Zi and the Chinese calendar.",
    category: "bazi",
  },
  {
    term: "Earthly Branch",
    pinyin: "dì zhī",
    definition: "The twelve terrestrial energies associated with the Chinese zodiac animals (Rat, Ox, Tiger, etc.) that combine with Heavenly Stems to define the pillars in Ba Zi astrology.",
    category: "bazi",
  },
  {
    term: "Dao",
    pinyin: "dào",
    definition: "The Way — the fundamental principle underlying the universe, representing the natural order, balance, and the path of virtue. Central concept in Daoism.",
    category: "philosophy",
  },
  {
    term: "Feng Shui",
    pinyin: "fēng shuǐ",
    definition: "The ancient Chinese practice of harmonizing individuals with their surrounding environment through spatial arrangement, orientation, and energy flow. Literally 'Wind-Water.'",
    category: "metaphysics",
  },
  {
    term: "I Ching",
    pinyin: "yì jīng",
    definition: "The Book of Changes — an ancient Chinese divination text and the oldest of the Chinese classics, using 64 hexagrams to provide guidance and insight into situations and change.",
    category: "philosophy",
  },
  {
    term: "Gua",
    pinyin: "guà",
    definition: "A hexagram in the I Ching, composed of six stacked lines (either broken or unbroken), representing a specific archetypal situation or state of change.",
    category: "philosophy",
  },
  {
    term: "Sheng Xiao",
    pinyin: "shēng xiào",
    definition: "The Chinese zodiac — a 12-year cycle where each year is associated with an animal sign (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig) that influences a person's personality and destiny.",
    category: "bazi",
  },
];

export function getTerm(termName: string): GlossaryTerm | undefined {
  return glossary.find(
    (g) => g.term.toLowerCase() === termName.toLowerCase()
  );
}

export function getTermsByCategory(category: GlossaryTerm["category"]): GlossaryTerm[] {
  return glossary.filter((g) => g.category === category);
}
