import type { Metadata } from "next";
import { ThemeEngine } from "@/lib/ThemeEngine";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Студия 1977: маркетинг, сайты, CRM, события и автоматизация для бизнеса",
    template: "%s — Студия 1977",
  },
  description:
    "Студия 1977 помогает бизнесу в Крыму и за его пределами с маркетингом, брендингом, сайтами, CRM, ИИ-ботами, событиями и антикризисной упаковкой.",
  openGraph: {
    title: "Студия 1977",
    description:
      "Соединяем маркетинг, брендинг, сайты и CRM в одну рабочую систему.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-theme="night" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <ThemeEngine />
        {children}
      </body>
    </html>
  );
}
