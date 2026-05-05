export interface GlossaryTerm {
  term: string;
  pinyin: string;
  definition: string;
  category: "philosophy" | "metaphysics" | "bazi" | "ziwei" | "five-elements" | "general";
}

export const glossary: GlossaryTerm[] = [
  // === Philosophy ===
  {
    term: "Dao",
    pinyin: "dào",
    definition: "The Way — the fundamental principle underlying the universe, representing the natural order, balance, and the path of virtue. Central concept in Daoism and Chinese philosophy.",
    category: "philosophy",
  },
  {
    term: "De",
    pinyin: "dé",
    definition: "Virtue or inner power. In Daoism, De is the expression of Dao in action — the quality of living in alignment with the Way. Often paired with Dao as 'Dao De' (the Way and its Virtue).",
    category: "philosophy",
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
    definition: "The dualistic principle of complementary opposites — light/dark, active/passive, masculine/feminine, hot/cold — whose dynamic balance governs the natural world and all phenomena.",
    category: "philosophy",
  },
  {
    term: "Wu Wei",
    pinyin: "wú wéi",
    definition: "Non-action or effortless action. A Daoist principle of acting in natural alignment with the flow of events, without force or struggle — like water flowing downhill.",
    category: "philosophy",
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
    definition: "A hexagram in the I Ching, composed of six stacked lines (either broken Yin or unbroken Yang), representing a specific archetypal situation or state of change.",
    category: "philosophy",
  },
  {
    term: "San Bao",
    pinyin: "sān bǎo",
    definition: "The Three Treasures of Chinese philosophy and medicine: Jing (essence), Qi (vital energy), and Shen (spirit). Together they represent the core substance of life.",
    category: "philosophy",
  },
  {
    term: "Jing",
    pinyin: "jīng",
    definition: "Essence — the foundational substance of life, stored in the kidneys. In Chinese metaphysics, Jing is one of the Three Treasures (San Bao) and determines constitutional strength.",
    category: "philosophy",
  },
  {
    term: "Shen",
    pinyin: "shén",
    definition: "Spirit or consciousness — the radiant quality of life manifesting as awareness, presence, and mental clarity. The highest of the Three Treasures.",
    category: "philosophy",
  },
  {
    term: "Tian",
    pinyin: "tiān",
    definition: "Heaven or the celestial realm. In Chinese cosmology, Tian represents the highest natural force and the source of order and moral authority in the universe.",
    category: "philosophy",
  },
  {
    term: "Tian Di Ren",
    pinyin: "tiān dì rén",
    definition: "The Three Realms — Heaven (Tian), Earth (Di), and Humanity (Ren). This trinity is fundamental to Chinese cosmology and the BaZi chart's structure.",
    category: "philosophy",
  },
  {
    term: "Ziran",
    pinyin: "zì rán",
    definition: "Naturalness or spontaneity. A key Daoist concept meaning the state of being naturally oneself, unforced and uncontrived — the quality of Dao itself.",
    category: "philosophy",
  },
  {
    term: "Pu",
    pinyin: "pǔ",
    definition: "The Uncarved Block — a Daoist metaphor for the original, simple, undifferentiated state of being, free from artificial distinctions and social conditioning.",
    category: "philosophy",
  },

  // === Metaphysics ===
  {
    term: "Feng Shui",
    pinyin: "fēng shuǐ",
    definition: "The ancient Chinese practice of harmonizing individuals with their surrounding environment through spatial arrangement, orientation, and energy flow. Literally 'Wind-Water.'",
    category: "metaphysics",
  },
  {
    term: "Ming",
    pinyin: "mìng",
    definition: "Destiny or fate — the aspect of life determined at birth, which can be read through BaZi and Zi Wei charts. Represented by the Heavenly Stems in BaZi.",
    category: "metaphysics",
  },
  {
    term: "Yun",
    pinyin: "yùn",
    definition: "Luck or fortune over time — the changing circumstances that interact with your Ming (destiny). Represented by the Earthly Branches and the luck pillars in BaZi.",
    category: "metaphysics",
  },
  {
    term: "Ming Yun",
    pinyin: "mìng yùn",
    definition: "Destiny and Luck together — the full picture of a life path. Ming is the blueprint at birth; Yun is how it unfolds across time through the 10-year luck pillars.",
    category: "metaphysics",
  },
  {
    term: "San Cai",
    pinyin: "sān cái",
    definition: "The Three Powers — Heaven, Earth, and Humanity. A cosmological framework used in BaZi analysis to understand the balance of forces in a chart.",
    category: "metaphysics",
  },
  {
    term: "Yuan Fen",
    pinyin: "yuán fèn",
    definition: "Karmic affinity or destined connection. The concept that relationships and encounters in life are governed by a pre-existing cosmic alignment.",
    category: "metaphysics",
  },
  {
    term: "Tai Ji",
    pinyin: "tài jí",
    definition: "The Supreme Ultimate — the primordial source of all existence from which Yin and Yang emerged. Symbolized by the Taijitu (Yin-Yang symbol).",
    category: "metaphysics",
  },
  {
    term: "Ba Gua",
    pinyin: "bā guà",
    definition: "The Eight Trigrams — fundamental symbols of the I Ching, each composed of three lines (broken or unbroken), representing fundamental principles of reality.",
    category: "metaphysics",
  },

  // === Ba Zi ===
  {
    term: "Ba Zi",
    pinyin: "bā zì",
    definition: "Literally 'Eight Characters,' Ba Zi is a Chinese astrological system based on the Four Pillars of Destiny — year, month, day, and hour of birth — each expressed as a Heavenly Stem and Earthly Branch.",
    category: "bazi",
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
    term: "Day Master",
    pinyin: "rì zhǔ",
    definition: "The Heavenly Stem of the Day Pillar — the most important element in a BaZi chart, representing the self, one's core nature, personality, and constitution.",
    category: "bazi",
  },
  {
    term: "Four Pillars",
    pinyin: "sì zhù",
    definition: "The four columns of a BaZi chart: Year, Month, Day, and Hour Pillars. Each pillar contains a Heavenly Stem and an Earthly Branch, totaling eight characters.",
    category: "bazi",
  },
  {
    term: "Luck Pillar",
    pinyin: "dà yùn",
    definition: "Ten-year luck cycles in BaZi that show how a person's destiny unfolds over time. Each luck pillar interacts with the natal chart to produce favorable or challenging periods.",
    category: "bazi",
  },
  {
    term: "Annual Luck",
    pinyin: "liú nián",
    definition: "The energy of a specific year and how it interacts with a person's BaZi chart. Used for timing important decisions and predicting yearly influences.",
    category: "bazi",
  },
  {
    term: "Useful God",
    pinyin: "yòng shén",
    definition: "The most favorable element for a BaZi chart — the one that brings balance. Identifying the Useful God is a core skill in BaZi analysis for prescribing remedies and guidance.",
    category: "bazi",
  },
  {
    term: "Sheng Xiao",
    pinyin: "shēng xiào",
    definition: "The Chinese zodiac — a 12-year cycle where each year is associated with an animal sign (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig) that influences personality and destiny.",
    category: "bazi",
  },
  {
    term: "Clash",
    pinyin: "chōng",
    definition: "A conflict relationship between two Earthly Branches six positions apart in the zodiac circle. Clashes indicate tension, change, and dynamism in a chart.",
    category: "bazi",
  },
  {
    term: "Combination",
    pinyin: "hé",
    definition: "A harmonious relationship between Heavenly Stems or Earthly Branches that produces a new element or strengthens existing ones. Combinations are key to chart analysis.",
    category: "bazi",
  },
  {
    term: "Ten Gods",
    pinyin: "shí shén",
    definition: "Ten relationship types derived from the Day Master's interaction with other stems in the chart — including Direct Wealth, Indirect Wealth, Direct Officer, Seven Killings, and more.",
    category: "bazi",
  },
  {
    term: "Self-Penalty",
    pinyin: "zì xíng",
    definition: "A form of disharmony where an Earthly Branch creates internal conflict within itself. Self-penalties suggest inner struggles or self-sabotaging tendencies.",
    category: "bazi",
  },
  {
    term: "Peach Blossom",
    pinyin: "táo huā",
    definition: "A star in BaZi and Zi Wei indicating charisma, social grace, and romantic appeal. Strong Peach Blossom suggests artistic talent and interpersonal magnetism.",
    category: "bazi",
  },

  // === Zi Wei ===
  {
    term: "Zi Wei Dou Shu",
    pinyin: "zǐ wēi dǒu shù",
    definition: "An advanced form of Chinese astrology that maps the positions of 100+ stars across 12 palaces to analyze a person's destiny, personality, relationships, and life path. Often called 'Purple Star Astrology.'",
    category: "ziwei",
  },
  {
    term: "Zi Wei Star",
    pinyin: "zǐ wēi xīng",
    definition: "The Purple Emperor Star — the most important star in Zi Wei Dou Shu, associated with leadership, authority, and dignity. Its palace location sets the tone for the entire chart.",
    category: "ziwei",
  },
  {
    term: "Palace",
    pinyin: "gōng",
    definition: "One of the twelve life areas in a Zi Wei chart, each governing a different domain: Self, Wealth, Career, Siblings, Health, Travel, Friends, and others.",
    category: "ziwei",
  },
  {
    term: "Life Palace",
    pinyin: "mìng gōng",
    definition: "The Self Palace in Zi Wei Dou Shu — the most important of the 12 palaces, representing the person's core character, life direction, and overall fortune pattern.",
    category: "ziwei",
  },
  {
    term: "Tian Fu Star",
    pinyin: "tiān fǔ xīng",
    definition: "The Heavenly Treasury star — a major benefic star in Zi Wei associated with wealth accumulation, stability, and reliability. Often called the Southern Emperor.",
    category: "ziwei",
  },
  {
    term: "Four Transformers",
    pinyin: "sì huà",
    definition: "The four transforming energies in Zi Wei: Hua Lu (Prosperity), Hua Quan (Authority), Hua Ke (Fame), and Hua Ji (Obstacle). They modify the quality of stars they touch.",
    category: "ziwei",
  },

  // === Five Elements ===
  {
    term: "Wu Xing",
    pinyin: "wǔ xíng",
    definition: "The Five Elements or Five Phases — Wood, Fire, Earth, Metal, and Water — that describe the dynamic interactions and relationships between all phenomena in the universe.",
    category: "five-elements",
  },
  {
    term: "Sheng Cycle",
    pinyin: "shēng",
    definition: "The Generating or Nourishing cycle of the Five Elements: Wood feeds Fire, Fire creates Earth, Earth bears Metal, Metal collects Water, Water nourishes Wood. A harmonious flow.",
    category: "five-elements",
  },
  {
    term: "Ke Cycle",
    pinyin: "kè",
    definition: "The Controlling or Restraining cycle of the Five Elements: Wood parts Earth, Earth dams Water, Water extinguishes Fire, Fire melts Metal, Metal chops Wood. A regulatory balance.",
    category: "five-elements",
  },
  {
    term: "Cheng Cycle",
    pinyin: "chéng",
    definition: "The Overacting cycle — when the controlling relationship becomes excessive and damaging. Occurs when the controlling element is too strong and the controlled element is too weak.",
    category: "five-elements",
  },
  {
    term: "Wu Cycle",
    pinyin: "wǔ",
    definition: "The Insulting or Counteracting cycle — when the controlled element reverses the controlling relationship. For example, Water normally controls Fire, but intense Fire can evaporate Water.",
    category: "five-elements",
  },
  {
    term: "Wood Element",
    pinyin: "mù",
    definition: "Represents growth, expansion, creativity, flexibility, and new beginnings. Associated with spring, east, the liver and gallbladder, and the emotions of anger and kindness.",
    category: "five-elements",
  },
  {
    term: "Fire Element",
    pinyin: "huǒ",
    definition: "Represents passion, brightness, transformation, and expressiveness. Associated with summer, south, the heart and small intestine, and the emotions of joy and hate.",
    category: "five-elements",
  },
  {
    term: "Earth Element",
    pinyin: "tǔ",
    definition: "Represents stability, nourishment, reliability, and grounding. Associated with late summer, center, the spleen and stomach, and the emotions of worry and empathy.",
    category: "five-elements",
  },
  {
    term: "Metal Element",
    pinyin: "jīn",
    definition: "Represents structure, precision, righteousness, and clarity. Associated with autumn, west, the lungs and large intestine, and the emotions of grief and courage.",
    category: "five-elements",
  },
  {
    term: "Water Element",
    pinyin: "shuǐ",
    definition: "Represents wisdom, adaptability, introspection, and resourcefulness. Associated with winter, north, the kidneys and bladder, and the emotions of fear and willpower.",
    category: "five-elements",
  },

  // === General ===
  {
    term: "Lunar Calendar",
    pinyin: "nóng lì",
    definition: "The traditional Chinese calendar based on moon phases, used to determine dates for festivals, astrology, and traditional practices. The Chinese New Year begins on the second new moon after the winter solstice.",
    category: "general",
  },
  {
    term: "Solar Terms",
    pinyin: "jié qì",
    definition: "The 24 solar terms that divide the Chinese calendar year according to the sun's position. Important for BaZi because the month pillar is determined by solar terms rather than lunar months.",
    category: "general",
  },
  {
    term: "Li Chun",
    pinyin: "lì chūn",
    definition: "The Beginning of Spring — the first solar term and the astronomical start of the Chinese year. Marks when the sun reaches 315 degrees of celestial longitude (around February 4).",
    category: "general",
  },
  {
    term: "Stem-Branch Cycle",
    pinyin: "gān zhī",
    definition: "The sexagenary (60) cycle formed by pairing the ten Heavenly Stems with the twelve Earthly Branches. This cycle is the basis of the Chinese calendar and BaZi year system.",
    category: "general",
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
