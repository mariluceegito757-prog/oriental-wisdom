import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { OrganizationSchema, WebSiteSchema } from "@/components/chinese-culture/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oriental Wisdom — Discover Chinese Metaphysics & Philosophy",
    template: "%s | Oriental Wisdom",
  },
  description:
    "Explore the depths of Chinese traditional wisdom — Ba Zi astrology, Zi Wei Dou Shu, Five Elements, I Ching, and ancient philosophy. Courses, consultations, and insights for the modern seeker.",
  keywords: [
    "Chinese metaphysics",
    "Ba Zi",
    "Zi Wei Dou Shu",
    "Five Elements",
    "I Ching",
    "Feng Shui",
    "Chinese astrology",
    "Chinese philosophy",
    "Daoism",
    "Oriental wisdom",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Oriental Wisdom",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SkipToContent />
        <OrganizationSchema />
        <WebSiteSchema />
        {children}
      </body>
    </html>
  );
}
