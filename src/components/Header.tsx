"use client";
import { useState, useEffect, useRef } from "react";
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
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      // Don't hide header when mobile menu is open
      if (!menuOpen) {
        if (currentY > lastScrollY.current && currentY > 120) {
          setHidden(true); // scrolling down past 120px → hide
        } else {
          setHidden(false); // scrolling up → show
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${hidden ? styles.hidden : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Студия</span>
          <span className={styles.logoMark}>1977</span>
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
