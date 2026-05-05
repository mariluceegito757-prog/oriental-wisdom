import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed courses
  const bazi = await prisma.course.upsert({
    where: { slug: "bazi-foundations" },
    update: {},
    create: {
      slug: "bazi-foundations",
      title: "Ba Zi Foundations",
      subtitle: "Learn to read the Four Pillars of Destiny",
      description:
        "A step-by-step course teaching you how to calculate and interpret a Ba Zi natal chart — from Heavenly Stems and Earthly Branches to the Five Elements balance and the Day Master's personality.",
      price: 14900, // $149.00
      level: "Beginner",
      published: true,
      lessons: {
        create: [
          {
            slug: "what-is-bazi",
            title: "What Is Ba Zi?",
            description: "Overview of the Eight Characters and Four Pillars system.",
            content: `## What Is Ba Zi?\n\nBa Zi is the ancient Chinese system of destiny analysis...`,
            order: 1,
            freePreview: true,
          },
          {
            slug: "heavenly-stems",
            title: "The Ten Heavenly Stems",
            description: "Deep dive into the ten celestial energies.",
            content: `## The Ten Heavenly Stems\n\nEach Stem carries a Yin or Yang polarity and an elemental nature...`,
            order: 2,
            freePreview: false,
          },
          {
            slug: "earthly-branches",
            title: "The Twelve Earthly Branches",
            description: "Understanding the twelve zodiac animal branches.",
            content: `## The Twelve Earthly Branches\n\nThe Earthly Branches correspond to the Chinese zodiac animals...`,
            order: 3,
            freePreview: false,
          },
          {
            slug: "five-elements-in-bazi",
            title: "The Five Elements in Ba Zi",
            description: "How Wu Xing powers chart interpretation.",
            content: `## Five Elements in Ba Zi\n\nEach element's strength and interactions shape the chart...`,
            order: 4,
            freePreview: false,
          },
          {
            slug: "day-master",
            title: "The Day Master",
            description: "Your core self in the Ba Zi chart.",
            content: `## The Day Master\n\nThe Day Master is the Heavenly Stem of the Day Pillar...`,
            order: 5,
            freePreview: false,
          },
          {
            slug: "reading-the-chart",
            title: "Reading the Full Chart",
            description: "Putting it all together — a complete chart reading.",
            content: `## Reading the Full Chart\n\nNow we combine all elements...`,
            order: 6,
            freePreview: false,
          },
          {
            slug: "practical-examples",
            title: "Practical Examples",
            description: "Walk through real Ba Zi charts.",
            content: `## Practical Examples\n\nLet's analyze real charts...`,
            order: 7,
            freePreview: false,
          },
          {
            slug: "annual-luck",
            title: "Understanding Annual Luck",
            description: "How yearly energies interact with your chart.",
            content: `## Annual Luck Pillars\n\nEach decade and each year brings new energies...`,
            order: 8,
            freePreview: false,
          },
        ],
      },
    },
  });

  const wuxing = await prisma.course.upsert({
    where: { slug: "five-elements-masterclass" },
    update: {},
    create: {
      slug: "five-elements-masterclass",
      title: "Wu Xing: The Five Elements Masterclass",
      subtitle: "Deep understanding of the generating and controlling cycles",
      description:
        "Master the Five Elements philosophy that underpins all of Chinese metaphysics — from the Sheng and Ke cycles to practical applications in health, relationships, and destiny analysis.",
      price: 17900,
      level: "All Levels",
      published: true,
      lessons: {
        create: [
          {
            slug: "what-is-wuxing",
            title: "What Is Wu Xing?",
            description: "Beyond the Five Elements — understanding phases of change.",
            content: `## What Is Wu Xing?\n\nWu Xing means "Five Movements" — dynamic phases...`,
            order: 1,
            freePreview: true,
          },
          {
            slug: "wood-element",
            title: "Wood Element Deep Dive",
            description: "Growth, spring, and the energy of new beginnings.",
            content: `## Wood Element\n\nWood represents growth, expansion, and the east...`,
            order: 2,
            freePreview: false,
          },
          {
            slug: "fire-element",
            title: "Fire Element Deep Dive",
            description: "Passion, summer, and transformative energy.",
            content: `## Fire Element\n\nFire represents passion, transformation, and the south...`,
            order: 3,
            freePreview: false,
          },
          {
            slug: "earth-element",
            title: "Earth Element Deep Dive",
            description: "Stability, late summer, and nurturing energy.",
            content: `## Earth Element\n\nEarth represents stability, nourishment, and the center...`,
            order: 4,
            freePreview: false,
          },
          {
            slug: "metal-element",
            title: "Metal Element Deep Dive",
            description: "Structure, autumn, and refining energy.",
            content: `## Metal Element\n\nMetal represents structure, clarity, and the west...`,
            order: 5,
            freePreview: false,
          },
          {
            slug: "water-element",
            title: "Water Element Deep Dive",
            description: "Wisdom, winter, and the source of all potential.",
            content: `## Water Element\n\nWater represents wisdom, adaptability, and the north...`,
            order: 6,
            freePreview: false,
          },
          {
            slug: "sheng-ke-cycles",
            title: "The Generating and Controlling Cycles",
            description: "How the five elements interact and balance each other.",
            content: `## The Sheng and Ke Cycles\n\nThe generating cycle: Wood → Fire → Earth → Metal → Water → Wood...`,
            order: 7,
            freePreview: false,
          },
          {
            slug: "wuxing-health",
            title: "Wu Xing in Health",
            description: "Elements and the body — TCM perspective.",
            content: `## Wu Xing in Health\n\nEach element governs specific organs...`,
            order: 8,
            freePreview: false,
          },
          {
            slug: "wuxing-bazi",
            title: "Wu Xing in Ba Zi",
            description: "Applying Five Elements analysis to natal charts.",
            content: `## Wu Xing in Ba Zi\n\nElemental balance is key to chart interpretation...`,
            order: 9,
            freePreview: false,
          },
          {
            slug: "daily-wuxing",
            title: "Wu Xing in Daily Life",
            description: "Practical applications for modern living.",
            content: `## Wu Xing in Daily Life\n\nUse the five elements framework daily...`,
            order: 10,
            freePreview: false,
          },
        ],
      },
    },
  });

  const iching = await prisma.course.upsert({
    where: { slug: "i-ching-wisdom" },
    update: {},
    create: {
      slug: "i-ching-wisdom",
      title: "I Ching: Wisdom of the Book of Changes",
      subtitle: "Learn to consult and interpret the 64 hexagrams",
      description:
        "Journey through the world's oldest oracle — understand the 64 hexagrams, learn traditional casting methods, and develop the art of interpretation for guidance in love, career, and life decisions.",
      price: 16900,
      level: "Intermediate",
      published: true,
      lessons: {
        create: [
          {
            slug: "what-is-i-ching",
            title: "What Is the I Ching?",
            description: "History, philosophy, and the cosmology of change.",
            content: `## What Is the I Ching?\n\nThe Book of Changes is the world's oldest continuously used oracle...`,
            order: 1,
            freePreview: true,
          },
          {
            slug: "yin-yang-lines",
            title: "Yin, Yang, and the Lines",
            description: "The building blocks of every hexagram.",
            content: `## Yin, Yang, and the Lines\n\nEach line is either solid (Yang) or broken (Yin)...`,
            order: 2,
            freePreview: false,
          },
          {
            slug: "the-eight-trigrams",
            title: "The Eight Trigrams (Ba Gua)",
            description: "The eight fundamental three-line figures.",
            content: `## The Eight Trigrams\n\nQian, Kun, Zhen, Xun, Kan, Li, Gen, Dui...`,
            order: 3,
            freePreview: false,
          },
          {
            slug: "casting-methods",
            title: "Casting Methods",
            description: "Coins, yarrow stalks, and Plum Blossom technique.",
            content: `## Casting Methods\n\nThree coins, fifty yarrow stalks, or Plum Blossom...`,
            order: 4,
            freePreview: false,
          },
          {
            slug: "reading-the-judgment",
            title: "Reading the Judgment",
            description: "The main hexagram text and how to interpret it.",
            content: `## Reading the Judgment\n\nEach of the 64 hexagrams has a Judgment and Image...`,
            order: 5,
            freePreview: false,
          },
          {
            slug: "line-texts",
            title: "Interpreting the Line Texts",
            description: "How changing lines modify the reading.",
            content: `## Interpreting the Line Texts\n\nEach line text speaks to a specific situation...`,
            order: 6,
            freePreview: false,
          },
          {
            slug: "nuclear-hexagrams",
            title: "Nuclear Hexagrams & Transformations",
            description: "The hidden hexagram within every hexagram.",
            content: `## Nuclear Hexagrams\n\nEvery hexagram contains a hidden nuclear hexagram...`,
            order: 7,
            freePreview: false,
          },
          {
            slug: "practical-consultation",
            title: "Practical Consultation",
            description: "Putting it all together — live readings.",
            content: `## Practical Consultation\n\nNow we practice full consultations...`,
            order: 8,
            freePreview: false,
          },
          {
            slug: "i-ching-daily",
            title: "I Ching as a Daily Practice",
            description: "Building a personal relationship with the oracle.",
            content: `## I Ching as a Daily Practice\n\nThe I Ching is not just for crisis moments...`,
            order: 9,
            freePreview: false,
          },
        ],
      },
    },
  });

  const ziwei = await prisma.course.upsert({
    where: { slug: "ziwei-foundations" },
    update: {},
    create: {
      slug: "ziwei-foundations",
      title: "Zi Wei Dou Shu Foundations",
      subtitle: "Chart the stars and read the 12 palaces",
      description:
        "Learn the fundamentals of Purple Star Astrology — charting the 12 palaces, understanding 14 major stars, and interpreting career, wealth, relationships, and health through this sophisticated system.",
      price: 19900,
      level: "Intermediate",
      published: true,
      lessons: {
        create: [
          {
            slug: "what-is-ziwei",
            title: "What Is Zi Wei Dou Shu?",
            description: "History and overview of Purple Star Astrology.",
            content: `## What Is Zi Wei Dou Shu?\n\nZi Wei Dou Shu means "Purple Star Astrology"...`,
            order: 1,
            freePreview: true,
          },
          {
            slug: "the-twelve-palaces",
            title: "The Twelve Palaces",
            description: "Mapping the 12 life areas in a Zi Wei chart.",
            content: `## The Twelve Palaces\n\nEach palace governs a different life domain...`,
            order: 2,
            freePreview: false,
          },
          {
            slug: "major-stars",
            title: "The 14 Major Stars",
            description: "Zi Wei, Tian Fu, Tai Yang, Wu Qu, and more.",
            content: `## The 14 Major Stars\n\nEach major star has a unique character and influence...`,
            order: 3,
            freePreview: false,
          },
          {
            slug: "minor-stars",
            title: "Minor Stars and Transformations",
            description: "Auxiliary stars and how they modify major star energies.",
            content: `## Minor Stars\n\nDozens of minor stars add nuance to the reading...`,
            order: 4,
            freePreview: false,
          },
          {
            slug: "four-transformers",
            title: "The Four Transformers (Si Hua)",
            description: "Hua Lu, Hua Quan, Hua Ke, Hua Ji — the energy modifiers.",
            content: `## The Four Transformers\n\nThese four energies transform the quality of each star they touch...`,
            order: 5,
            freePreview: false,
          },
          {
            slug: "charting-basics",
            title: "Charting the Zi Wei Chart",
            description: "Step-by-step chart construction.",
            content: `## Charting the Zi Wei Chart\n\nStarting from birth data, we place every star...`,
            order: 6,
            freePreview: false,
          },
          {
            slug: "palace-relationships",
            title: "Palace Relationships",
            description: "How palaces interact and influence each other.",
            content: `## Palace Relationships\n\nOpposing palaces, triads, and six-harmonies...`,
            order: 7,
            freePreview: false,
          },
          {
            slug: "reading-career-wealth",
            title: "Reading Career & Wealth",
            description: "Focusing on the career and wealth palaces.",
            content: `## Reading Career & Wealth\n\nThe Career Palace and Wealth Palace reveal professional destiny...`,
            order: 8,
            freePreview: false,
          },
          {
            slug: "reading-relationships",
            title: "Reading Relationships & Health",
            description: "The Spouse, Travel, and Health palaces.",
            content: `## Reading Relationships & Health\n\nLove, marriage, and physical well-being in the chart...`,
            order: 9,
            freePreview: false,
          },
          {
            slug: "full-chart-synthesis",
            title: "Full Chart Synthesis",
            description: "Weaving all elements into a complete reading.",
            content: `## Full Chart Synthesis\n\nThe art is in seeing how all parts interact...`,
            order: 10,
            freePreview: false,
          },
        ],
      },
    },
  });

  // Seed consultation types
  await prisma.consultationType.upsert({
    where: { slug: "bazi-reading" },
    update: {},
    create: {
      slug: "bazi-reading",
      name: "Ba Zi Natal Chart Reading",
      description:
        "A comprehensive analysis of your Four Pillars of Destiny — understand your Day Master, elemental balance, and life path.",
      duration: 60,
      price: 12000,
      published: true,
    },
  });

  await prisma.consultationType.upsert({
    where: { slug: "ziwei-reading" },
    update: {},
    create: {
      slug: "ziwei-reading",
      name: "Zi Wei Dou Shu Chart Reading",
      description:
        "Explore all 12 palaces of your Purple Star chart for detailed insights into career, relationships, wealth, and health.",
      duration: 75,
      price: 15000,
      published: true,
    },
  });

  await prisma.consultationType.upsert({
    where: { slug: "annual-forecast" },
    update: {},
    create: {
      slug: "annual-forecast",
      name: "Annual Luck Forecast",
      description:
        "A focused analysis of your upcoming year — understand the annual energies, favorable months, and key opportunities in your Ba Zi and Zi Wei charts for the year ahead.",
      duration: 45,
      price: 9500,
      published: true,
    },
  });

  console.log("Seed data created successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
