import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact | Oriental Wisdom",
  description: "Get in touch with the Oriental Wisdom team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-ink">Contact Us</h1>
      <p className="mt-3 text-lg text-ink-muted">
        We&apos;d love to hear from you
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-xl font-bold text-ink mb-2">
            General Inquiries
          </h2>
          <p className="text-sm text-ink-muted">
            Questions about our courses, consultations, or content?
          </p>
          <a
            href="mailto:hello@orientalwisdom.com"
            className="mt-3 inline-block text-vermilion hover:underline"
          >
            hello@orientalwisdom.com
          </a>
        </Card>
        <Card>
          <h2 className="font-serif text-xl font-bold text-ink mb-2">
            Consultations
          </h2>
          <p className="text-sm text-ink-muted">
            Ready to book a personal Ba Zi or Zi Wei reading?
          </p>
          <a
            href="mailto:consultations@orientalwisdom.com"
            className="mt-3 inline-block text-vermilion hover:underline"
          >
            consultations@orientalwisdom.com
          </a>
        </Card>
      </div>
    </div>
  );
}
