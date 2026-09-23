import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { MotionProvider } from "./_components/Motion";
import { CONTACT_EMAIL, GITHUB_URL, SITE_URL, X_URL } from "./content";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const title = "DevEntro Studio | Software Development by Aliameen Fatunbi";
const description =
  "Websites, custom platforms, APIs and AI-enabled software built for ambitious businesses. Based in Lagos, working worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  authors: [{ name: "Aliameen Fatunbi", url: GITHUB_URL }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DevEntro Studio",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@olamiltechlife",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e2d28",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DevEntro Studio",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description,
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  founder: { "@type": "Person", name: "Aliameen Fatunbi" },
  sameAs: [GITHUB_URL, X_URL],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
