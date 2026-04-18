import type { Metadata } from "next";
import { ThemeEngine } from "@/lib/ThemeEngine";
import "./globals.css";

export const metadata: Metadata = {
  title: "Студия 1977 — Креативное агентство",
  description:
    "Маркетинг, event-продюсирование, брендинг, digital-разработка. Создаём проекты, которые работают.",
  openGraph: {
    title: "Студия 1977 — Креативное агентство",
    description:
      "Маркетинг, event-продюсирование, брендинг, digital-разработка.",
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
      <body>
        <ThemeEngine />
        {children}
      </body>
    </html>
  );
}
