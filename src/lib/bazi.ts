// Heavenly Stems and Earthly Branches
const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;
const FIVE_ELEMENTS = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"] as const;
const BRANCH_ELEMENTS = ["Water", "Earth", "Wood", "Wood", "Earth", "Fire", "Fire", "Earth", "Metal", "Metal", "Earth", "Water"] as const;
const STEM_NAMES = ["Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"] as const;
const BRANCH_NAMES = ["Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"] as const;
const BRANCH_ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"] as const;
const ELEMENT_COLORS: Record<string, string> = {
  Wood: "#4a7c59",
  Fire: "#c41e3a",
  Earth: "#8b6508",
  Metal: "#9a8b3b",
  Water: "#1a3a5c",
};
const YIN_YANG = ["Yang", "Yin"] as const; // odd=Yang, even=Yin

export interface Pillar {
  stem: string;    // Chinese character
  stemName: string; // Pinyin/English
  branch: string;   // Chinese character
  branchName: string;
  branchAnimal: string;
  element: string;
  yinYang: string;
}

export interface BaZiChart {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  dayMaster: string;
  dayMasterElement: string;
}

function stemIndex(char: string): number {
  const idx = HEAVENLY_STEMS.indexOf(char as typeof HEAVENLY_STEMS[number]);
  return idx === -1 ? 0 : idx;
}

function makePillar(stemIdx: number, branchIdx: number): Pillar {
  const si = ((stemIdx % 10) + 10) % 10;
  const bi = ((branchIdx % 12) + 12) % 12;
  return {
    stem: HEAVENLY_STEMS[si],
    stemName: STEM_NAMES[si],
    branch: EARTHLY_BRANCHES[bi],
    branchName: BRANCH_NAMES[bi],
    branchAnimal: BRANCH_ANIMALS[bi],
    element: FIVE_ELEMENTS[si],
    yinYang: YIN_YANG[si % 2],
  };
}

// Days from 1900-01-01 to a given date
function daysFrom1900(year: number, month: number, day: number): number {
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let days = 0;
  for (let y = 1900; y < year; y++) {
    days += (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? 366 : 365;
  }
  const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  months[1] = isLeap ? 29 : 28;
  for (let m = 0; m < month - 1; m++) {
    days += months[m];
  }
  days += day - 1;
  return days;
}

// Month stem depends on year stem
// Rule: 甲己之年丙作首 (Jia/Ji years → Bing Yin for month 1 = 立春)
const MONTH_STEM_OFFSET = [
  /* 甲/己 */ 2, /* 乙/庚 */ 4, /* 丙/辛 */ 6, /* 丁/壬 */ 8, /* 戊/癸 */ 0,
];

function monthStemStart(yearStemIdx: number): number {
  // Group index: (甲=0,己=5)→0, (乙=1,庚=6)→1, (丙=2,辛=7)→2, (丁=3,壬=8)→3, (戊=4,癸=9)→4
  const groupIdx = Math.floor(yearStemIdx / 5) === 0 ? yearStemIdx : yearStemIdx - 5;
  return MONTH_STEM_OFFSET[groupIdx] ?? 0;
}

// Hour stem depends on day stem
// Rule: 甲己还加甲 (Jia/Ji day → Jia Zi for hour 0)
const HOUR_STEM_OFFSET = [0, 2, 4, 6, 8] as const;

function hourStemStart(dayStemIdx: number): number {
  return HOUR_STEM_OFFSET[Math.floor(dayStemIdx / 5)] ?? 0;
}

export function calculateBaZi(
  birthYear: number,
  birthMonth: number, // 1-12
  birthDay: number,
  birthHour: number, // 0-23
): BaZiChart {
  // Year Pillar: (year - 4) % 60 → stem, branch
  const yearSexagenary = ((birthYear - 4) % 60 + 60) % 60;
  const yearStemIdx = yearSexagenary % 10;
  const yearBranchIdx = yearSexagenary % 12;

  // Month Pillar: Earth month starts at 寅 (index 2) for month 1 (Feb = 立春 ≈ month 2)
  // Simplified: month branch index = (month + 1) % 12
  const monthBranchIdx = (birthMonth + 1) % 12;
  const msStart = monthStemStart(yearStemIdx);
  const monthStemIdx = (msStart + (monthBranchIdx + 10) % 12) % 10;

  // Day Pillar: days from 1900-01-01
  const days = daysFrom1900(birthYear, birthMonth, birthDay);
  const daySexagenary = ((days + 10) % 60 + 60) % 60;
  const dayStemIdx = daySexagenary % 10;
  const dayBranchIdx = daySexagenary % 12;

  // Hour Pillar: two-hour period
  // 子=23-01 → branch index 0, 丑=01-03 → 1, etc.
  const hourBranchIdx = Math.floor(((birthHour + 1) % 24) / 2);
  const hsStart = hourStemStart(dayStemIdx);
  const hourStemIdx = (hsStart + hourBranchIdx) % 10;

  const yearPillar = makePillar(yearStemIdx, yearBranchIdx);
  const monthPillar = makePillar(monthStemIdx, monthBranchIdx);
  const dayPillar = makePillar(dayStemIdx, dayBranchIdx);
  const hourPillar = makePillar(hourStemIdx, hourBranchIdx);

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster: dayPillar.stem,
    dayMasterElement: dayPillar.element,
  };
}

export const STEMS = HEAVENLY_STEMS;
export const BRANCHES = EARTHLY_BRANCHES;
export const ELEMENTS = FIVE_ELEMENTS;
export const STEM_NAMES_LIST = STEM_NAMES;
export const BRANCH_NAMES_LIST = BRANCH_NAMES;
export const BRANCH_ANIMALS_LIST = BRANCH_ANIMALS;
export const ELEMENT_COLORS_MAP = ELEMENT_COLORS;
