"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/about", label: "О студии" },
  { href: "/services", label: "Услуги" },
  { href: "/cases", label: "Портфолио" },
  { href: "/contact", label: "Контакт" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/brand/logo-white.png"
            alt="Studio 1977"
            width={140}
            height={32}
            className={styles.logoImg}
            priority
          />
        </Link>

        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/studio" className={styles.portal}>
          Панель клиента
        </Link>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/studio" className={styles.mobilePortal} onClick={() => setMenuOpen(false)}>
            Панель клиента
          </Link>
        </div>
      )}
    </nav>
  );
}
