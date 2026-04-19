import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Top row */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoText}>Студия</span>
              <span className={styles.logoMark}>1977</span>
            </div>
            <p className={styles.tagline}>
              Креативное агентство полного цикла.
              <br />
              Маркетинг · Event · Брендинг · Цифровые решения
            </p>
          </div>

          <div className={styles.columns}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Навигация</h4>
              <Link href="/about">О студии</Link>
              <Link href="/services">Услуги</Link>
              <Link href="/cases">Кейсы</Link>
              <Link href="/team">Команда</Link>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Клиентам</h4>
              <Link href="/process">Как работаем</Link>
              <Link href="/brief">Бриф</Link>
              <Link href="/contact">Контакты</Link>
              <Link href="/app">Личный кабинет</Link>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Партнёры</h4>
              <Link href="/partners/like-it">
                <span style={{ color: 'var(--color-primary)' }}>лайк IT</span><br />
                <span style={{ fontSize: '0.85em', color: 'var(--color-text-muted)' }}>ИИ и автоматизация</span>
              </Link>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Контакты</h4>
              <a href="mailto:hello@studio1977.ru">hello@studio1977.ru</a>
              <a href="tel:+79788545123">+7 978 85 45 123</a>
              <span>Республика Крым</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Студия 1977. Все права защищены.</span>
          <div className={styles.links}>
            <Link href="/legal/privacy">Политика конфиденциальности</Link>
            <Link href="/legal/terms">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
