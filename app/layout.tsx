import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevEntro Studio | Software Development by Aliameen Fatunbi",
  description:
    "Websites, custom platforms, APIs and AI-enabled software built for ambitious businesses.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
