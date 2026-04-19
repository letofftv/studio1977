"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "О студии", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Кейсы", href: "/cases" },
  { label: "Команда", href: "/team" },
  { label: "Контакты", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>1977</span>
          <span className={styles.logoText}>СТУДИЯ</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/brief"
            className={`btn btn-primary ${styles.navCta}`}
            onClick={() => setMenuOpen(false)}
          >
            Обсудить проект
          </Link>
        </nav>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
