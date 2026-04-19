import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Вход в панель — Студия 1977",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>1977</span>
          <span className={styles.logoText}>Студия</span>
        </Link>
      </header>
      
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardHero}>
            <h1 className={styles.title}>Вход в кабинет</h1>
            <p className={styles.subtitle}>
              Используйте ваш корпоративный Bitrix24 для авторизации
            </p>
          </div>
          
          <div className={styles.actions}>
            <a href="/api/auth/login" className="btn btn-primary" style={{ width: '100%' }}>
              Войти через Битрикс24
            </a>
          </div>
          
          <div className={styles.footer}>
            <p className={styles.hint}>
              Доступ только для сотрудников и партнёров Студия 1977
            </p>
            <Link href="/" className={styles.backLink}>
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
