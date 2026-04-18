import Link from "next/link";
import styles from "./Footer.module.css";

const FOOTER_LINKS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://t.me/letoff_tv", label: "Telegram" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          © {new Date().getFullYear()} СТУДИЯ 1977. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
        </div>
        <div className={styles.links}>
          {FOOTER_LINKS.map((l) => (
            <a key={l.label} href={l.href} className={styles.link} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
          <Link href="/contact" className={styles.link}>Контакты</Link>
        </div>
      </div>
    </footer>
  );
}
