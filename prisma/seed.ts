import { PrismaClient } from "../src/generated/prisma";
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

  console.log("Seed data created successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
