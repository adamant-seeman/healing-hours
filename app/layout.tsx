import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Healing Hour | Counselling Psychology",
  description:
    "A premium counselling psychology practice offering a safe space to heal, express, and grow."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
