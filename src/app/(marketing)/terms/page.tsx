import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Oriental Wisdom",
  description:
    "Terms and conditions governing the use of Oriental Wisdom's website, courses, and consultation services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 prose prose-slate">
      <h1 className="font-serif text-4xl font-bold text-ink">Terms of Service</h1>
      <p className="text-ink-muted mt-2">Last updated: May 5, 2026</p>

      <section className="mt-10">
        <h2 className="font-serif text-xl font-bold text-ink">1. Acceptance of Terms</h2>
        <p>
          By accessing or using <strong>oriental-wisdom.vercel.app</strong> (the &ldquo;Site&rdquo;), you agree
          to be bound by these Terms of Service. If you do not agree, please do not use the Site.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">2. Services</h2>
        <p>
          Oriental Wisdom provides educational content, online courses, and personal consultations
          related to Chinese metaphysics, including Ba Zi, Zi Wei Dou Shu, Five Elements, I Ching, and
          related topics. All services are provided for <strong>educational and entertainment purposes</strong>{" "}
          only.
        </p>
        <p className="mt-3">
          See our <a href="/disclaimer" className="text-vermilion hover:underline">Disclaimer</a>{" "}
          for important limitations on the use of our content and services.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">3. Accounts</h2>
        <p>
          When you create an account, you are responsible for maintaining the confidentiality of your
          login credentials. You must provide accurate and complete information. We reserve the right
          to suspend accounts that violate these terms.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">4. Purchases and Refunds</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Courses:</strong> All course sales are final. If you encounter technical issues preventing access, contact us within 7 days of purchase for a resolution or refund.</li>
          <li><strong>Consultations:</strong> Bookings may be cancelled or rescheduled up to 24 hours before the scheduled time. Late cancellations are non-refundable.</li>
          <li><strong>Pricing:</strong> All prices are in USD and are subject to change. The price at the time of purchase is the price you pay.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">5. Intellectual Property</h2>
        <p>
          All content on the Site — including articles, course materials, glossary definitions, graphics,
          and code — is the intellectual property of Oriental Wisdom unless otherwise noted. You may
          not reproduce, distribute, or create derivative works without written permission.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">6. User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Site for any unlawful purpose.</li>
          <li>Attempt to gain unauthorized access to any part of the Site.</li>
          <li>Post or transmit harmful, abusive, or spam content.</li>
          <li>Resell or redistribute course content without authorization.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">7. Limitation of Liability</h2>
        <p>
          Oriental Wisdom provides content and services &ldquo;as is&rdquo; without warranties of any kind.
          We are not liable for any decisions you make based on our educational content or consultation
          advice. Consultations are not a substitute for professional medical, legal, or financial advice.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">8. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Material changes will be communicated via email
          or a notice on the Site. Continued use after changes constitutes acceptance.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">9. Termination</h2>
        <p>
          We reserve the right to terminate or suspend access to our services for any reason, including
          breach of these terms, without prior notice or liability.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">10. Governing Law</h2>
        <p>
          These terms are governed by the laws of the United Kingdom. Any disputes shall be resolved
          in the courts of England and Wales.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">11. Contact</h2>
        <p>
          For questions about these terms, email{" "}
          <a href="mailto:legal@oriental-wisdom.com" className="text-vermilion hover:underline">
            legal@oriental-wisdom.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
