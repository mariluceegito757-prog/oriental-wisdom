import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Oriental Wisdom",
  description:
    "Educational and entertainment disclaimer for Oriental Wisdom's Chinese metaphysics content, courses, and consultations.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 prose prose-slate">
      <h1 className="font-serif text-4xl font-bold text-ink">Disclaimer</h1>
      <p className="text-ink-muted mt-2">Last updated: May 5, 2026</p>

      <section className="mt-10">
        <h2 className="font-serif text-xl font-bold text-ink">Educational &amp; Entertainment Purposes</h2>
        <p>
          All content, courses, consultations, and tools provided by Oriental Wisdom — including but not
          limited to Ba Zi (Four Pillars) astrology, Zi Wei Dou Shu (Purple Star Astrology), Five Elements
          (Wu Xing) philosophy, I Ching divination, Feng Shui, and the BaZi Calculator — are offered
          strictly for <strong>educational and entertainment purposes</strong>.
        </p>
        <p className="mt-4">
          Chinese metaphysics is a traditional cultural practice. It is not a science, and its
          methods have not been validated by modern scientific research. The information provided
          on this Site should not be used as a substitute for:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Professional medical advice, diagnosis, or treatment</li>
          <li>Licensed psychological or mental health counseling</li>
          <li>Financial, investment, or business advice from qualified professionals</li>
          <li>Legal counsel or legal decision-making</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">No Predictions or Guarantees</h2>
        <p>
          Our consultations and automated tools (including the free BaZi Calculator) provide
          interpretations based on traditional Chinese metaphysical frameworks. These interpretations
          are not predictions, guarantees, or certainties about your future, health, finances,
          relationships, or any other aspect of your life. You should always exercise your own
          judgment and seek appropriate professional advice before making significant life decisions.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">Consultation Practitioners</h2>
        <p>
          Practitioners who provide consultations through Oriental Wisdom are knowledgeable in Chinese
          metaphysical traditions but are not licensed medical practitioners, psychologists, financial
          advisors, or legal professionals unless explicitly stated. Their guidance is based on
          traditional frameworks and should be treated as cultural and educational commentary.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">BaZi Calculator &amp; Automated Tools</h2>
        <p>
          Our free BaZi Calculator and any other automated tools on this Site compute symbolic
          charts based on traditional Chinese calendrical systems. The calculations are algorithmic
          approximations and should not be considered as scientifically validated personal assessments.
          No birth data entered into the calculator is stored on our servers.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">No Professional Relationship</h2>
        <p>
          Use of this Site, enrollment in a course, or participation in a consultation does not
          create a professional-client relationship (medical, legal, financial, or therapeutic).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Oriental Wisdom and its practitioners shall not be
          liable for any direct, indirect, incidental, consequential, or special damages arising from
          your use of or reliance on any content, course, consultation, or tool provided through this Site.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">Contact</h2>
        <p>
          If you have questions about this disclaimer, please contact us at{" "}
          <a href="mailto:support@oriental-wisdom.com" className="text-vermilion hover:underline">
            support@oriental-wisdom.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
