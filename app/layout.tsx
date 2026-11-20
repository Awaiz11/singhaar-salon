import type { Metadata, Viewport } from "next";
import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/500.css";
import "@fontsource/bodoni-moda/400-italic.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Singhaar Salon — Bridal Makeup & Mehndi, Model Town Lahore",
  description:
    "Women-only salon in Model Town, Lahore. Bridal makeup, hair, mehndi, facials and nails, with a trial for every bride. Book on WhatsApp.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Singhaar Salon — Model Town, Lahore",
    description: "A bridal look that lasts from nikah to rukhsati. Book a trial on WhatsApp.",
    images: ["https://images.unsplash.com/photo-1721324807083-e9ddaa99310e?auto=format&fit=crop&w=1200&h=630&q=75"],
  },
};

export const viewport: Viewport = { themeColor: "#2e1430" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
