"use client";

import { useState } from "react";
import { calculateBaZi, type BaZiChart, type Pillar, BRANCH_ANIMALS_LIST } from "@/lib/bazi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ELEMENT_COLORS: Record<string, string> = {
  Wood: "#4a7c59",
  Fire: "#c41e3a",
  Earth: "#8b6508",
  Metal: "#9a8b3b",
  Water: "#1a3a5c",
};

function PillarCard({ pillar, label }: { pillar: Pillar; label: string }) {
  return (
    <Card className="p-5 flex flex-col items-center text-center gap-2">
      <Badge variant="default" className="text-xs">
        {label}
      </Badge>
      <div className="flex items-center gap-3 mt-2">
        <div>
          <div
            className="text-3xl font-serif font-bold"
            style={{ color: ELEMENT_COLORS[pillar.element] ?? "#1a1a1a" }}
          >
            {pillar.stem}
          </div>
          <div className="text-xs text-ink-muted mt-1">
            {pillar.stemName} ({pillar.yinYang} {pillar.element})
          </div>
        </div>
        <div>
          <div
            className="text-3xl font-serif font-bold"
            style={{ color: ELEMENT_COLORS[pillar.element] ?? "#1a1a1a" }}
          >
            {pillar.branch}
          </div>
          <div className="text-xs text-ink-muted mt-1">
            {pillar.branchName} · {pillar.branchAnimal}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function BaZiForm() {
  const [chart, setChart] = useState<BaZiChart | null>(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("12");

  const handleCalculate = () => {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const h = parseInt(hour, 10);

    if (!y || !m || !d || isNaN(h) || m < 1 || m > 12 || d < 1 || d > 31 || h < 0 || h > 23) {
      return;
    }

    const result = calculateBaZi(y, m, d, h);
    setChart(result);
  };

  const isValid =
    year && month && day &&
    parseInt(year) > 1900 && parseInt(year) < 2100 &&
    parseInt(month) >= 1 && parseInt(month) <= 12 &&
    parseInt(day) >= 1 && parseInt(day) <= 31 &&
    parseInt(hour) >= 0 && parseInt(hour) <= 23;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-10">
      {/* Input Form */}
      <Card className="p-6 max-w-xl mx-auto">
        <h2 className="font-serif text-lg font-bold text-ink mb-4">
          Enter Your Birth Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-ink mb-1">
              Year
            </label>
            <input
              id="year"
              type="number"
              placeholder="1985"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm bg-paper focus:outline-none focus:border-vermilion/50"
            />
          </div>
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-ink mb-1">
              Month
            </label>
            <input
              id="month"
              type="number"
              placeholder="6"
              min={1}
              max={12}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm bg-paper focus:outline-none focus:border-vermilion/50"
            />
          </div>
          <div>
            <label htmlFor="day" className="block text-sm font-medium text-ink mb-1">
              Day
            </label>
            <input
              id="day"
              type="number"
              placeholder="15"
              min={1}
              max={31}
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm bg-paper focus:outline-none focus:border-vermilion/50"
            />
          </div>
          <div>
            <label htmlFor="hour" className="block text-sm font-medium text-ink mb-1">
              Hour of Birth
            </label>
            <select
              id="hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm bg-paper focus:outline-none focus:border-vermilion/50"
            >
              <option value="0">12:00 AM (midnight)</option>
              <option value="1">1:00 AM</option>
              <option value="2">2:00 AM</option>
              <option value="3">3:00 AM</option>
              <option value="4">4:00 AM</option>
              <option value="5">5:00 AM</option>
              <option value="6">6:00 AM</option>
              <option value="7">7:00 AM</option>
              <option value="8">8:00 AM</option>
              <option value="9">9:00 AM</option>
              <option value="10">10:00 AM</option>
              <option value="11">11:00 AM</option>
              <option value="12">12:00 PM (noon)</option>
              <option value="13">1:00 PM</option>
              <option value="14">2:00 PM</option>
              <option value="15">3:00 PM</option>
              <option value="16">4:00 PM</option>
              <option value="17">5:00 PM</option>
              <option value="18">6:00 PM</option>
              <option value="19">7:00 PM</option>
              <option value="20">8:00 PM</option>
              <option value="21">9:00 PM</option>
              <option value="22">10:00 PM</option>
              <option value="23">11:00 PM</option>
            </select>
          </div>
        </div>

        <Button
          variant="vermilion"
          className="w-full mt-6"
          onClick={handleCalculate}
          disabled={!isValid}
        >
          Calculate My BaZi Chart
        </Button>
        <p className="text-xs text-ink-muted text-center mt-2">
          Your birth data is processed in the browser and never stored.
        </p>
      </Card>

      {/* Results */}
      {chart && (
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Day Master */}
          <Card className="p-6 text-center">
            <p className="text-sm text-ink-muted mb-2">Your Day Master</p>
            <div>
              <span
                className="text-6xl font-serif font-bold"
                style={{ color: ELEMENT_COLORS[chart.dayMasterElement] ?? "#1a1a1a" }}
              >
                {chart.dayPillar.stem}
              </span>
            </div>
            <p className="mt-2 text-lg font-semibold">
              {chart.dayPillar.stemName}{" "}
              <span style={{ color: ELEMENT_COLORS[chart.dayMasterElement] ?? "#1a1a1a" }}>
                ({chart.dayMasterElement})
              </span>
            </p>
            <p className="text-sm text-ink-muted mt-1">
              {chart.dayPillar.yinYang} Day Master — your core self in the BaZi chart
            </p>
            <div className="mt-4">
              <a
                href="/consultations/bazi-reading"
                className="inline-block text-sm text-vermilion hover:underline font-medium"
              >
                Get a professional reading &rarr;
              </a>
            </div>
          </Card>

          {/* Four Pillars */}
          <div>
            <h2 className="font-serif text-xl font-bold text-ink mb-4 text-center">
              Your Four Pillars
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <PillarCard pillar={chart.hourPillar} label="Hour Pillar 时柱" />
              <PillarCard pillar={chart.dayPillar} label="Day Pillar 日柱" />
              <PillarCard pillar={chart.monthPillar} label="Month Pillar 月柱" />
              <PillarCard pillar={chart.yearPillar} label="Year Pillar 年柱" />
            </div>
          </div>

          {/* Element Summary */}
          <Card className="p-6">
            <h3 className="font-serif font-bold text-ink mb-3">Elemental Summary</h3>
            <div className="grid grid-cols-5 gap-3 text-center text-sm">
              {(["Wood", "Fire", "Earth", "Metal", "Water"] as const).map((el) => {
                const pillars = [
                  chart.yearPillar,
                  chart.monthPillar,
                  chart.dayPillar,
                  chart.hourPillar,
                ];
                const count = pillars.filter((p) => p.element === el).length;
                return (
                  <div key={el}>
                    <div
                      className="text-2xl font-serif font-bold"
                      style={{ color: ELEMENT_COLORS[el] }}
                    >
                      {count}
                    </div>
                    <div className="text-xs text-ink-muted">{el}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center p-8 bg-paper rounded-xl border border-ink/5">
            <h3 className="font-serif text-xl font-bold text-ink mb-2">
              Want a full chart interpretation?
            </h3>
            <p className="text-ink-muted mb-4">
              A professional reading reveals your career path, relationships, health,
              and the best timing for important life decisions.
            </p>
            <a href="/consultations">
              <Button variant="vermilion">Book a Consultation</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
