import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Oriental Wisdom",
  description:
    "How Oriental Wisdom collects, uses, and protects your personal data in compliance with GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 prose prose-slate">
      <h1 className="font-serif text-4xl font-bold text-ink">Privacy Policy</h1>
      <p className="text-ink-muted mt-2">Last updated: May 5, 2026</p>

      <section className="mt-10">
        <h2 className="font-serif text-xl font-bold text-ink">1. Introduction</h2>
        <p>
          Oriental Wisdom (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy. This policy
          explains what data we collect when you use our website, services, and courses, and how we handle it.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">2. Data We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Account data:</strong> When you register, we collect your name, email address, and authentication provider (Google or email).</li>
          <li><strong>Transaction data:</strong> When you purchase a course or booking, Stripe processes your payment. We receive a transaction ID and order amount — we never see your full credit card number.</li>
          <li><strong>Birth data:</strong> If you use the BaZi calculator, the birth year, month, day, and hour you enter are processed entirely in your browser and are never sent to our servers.</li>
          <li><strong>Usage data:</strong> We may collect anonymous analytics (page views, referrers) through Vercel Analytics to improve the site.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">3. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide access to courses and consultations you have purchased.</li>
          <li>To send transactional emails (booking confirmations, course enrollment receipts).</li>
          <li>To respond to inquiries submitted through the contact form.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">4. Data Sharing</h2>
        <p>
          We do not sell your personal data. We share data only with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Stripe</strong> — for payment processing. Stripe&apos;s privacy policy applies to payment data you submit.</li>
          <li><strong>Resend</strong> — for sending transactional emails.</li>
          <li><strong>Vercel</strong> — our hosting provider, which may process access logs.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">5. Data Retention</h2>
        <p>
          We retain your account data as long as your account is active. Transaction records are retained
          for legal and accounting purposes. You may request deletion of your account and associated data
          by contacting us.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">6. Cookies</h2>
        <p>
          We use essential cookies for authentication sessions (NextAuth.js session cookies).
          We do not use marketing or tracking cookies.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">7. Your Rights (GDPR)</h2>
        <p>
          If you are in the European Economic Area or the UK, you have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Object to or restrict processing of your data.</li>
          <li>Request data portability.</li>
        </ul>
        <p className="mt-4">To exercise these rights, email us at privacy@oriental-wisdom.com.</p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl font-bold text-ink">8. Contact</h2>
        <p>
          For privacy-related inquiries, please contact us at{" "}
          <a href="mailto:privacy@oriental-wisdom.com" className="text-vermilion hover:underline">
            privacy@oriental-wisdom.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
