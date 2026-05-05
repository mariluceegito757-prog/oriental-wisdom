import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Explore: [
    { href: "/blog", label: "Blog" },
    { href: "/courses", label: "Courses" },
    { href: "/glossary", label: "Glossary" },
    { href: "/consultations", label: "Consultations" },
  ],
  Learn: [
    { href: "/blog?category=bazi", label: "Ba Zi" },
    { href: "/blog?category=ziwei", label: "Zi Wei Dou Shu" },
    { href: "/blog?category=five-elements", label: "Five Elements" },
    { href: "/blog?category=philosophy", label: "Philosophy" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-ink text-paper-dark">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="font-serif text-lg font-bold text-paper no-underline">
              东 Oriental Wisdom
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-paper-dark">
              Bridging East and West through the timeless wisdom of Chinese metaphysics and philosophy.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-paper-dark/60">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper-dark transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="my-8 border-paper-dark/20" />

        <p className="text-center text-xs text-paper-dark/50">
          &copy; {new Date().getFullYear()} Oriental Wisdom. Chinese astrology is provided for educational purposes.
        </p>
      </div>
    </footer>
  );
}
