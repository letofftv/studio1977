import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Вход в панель — Студия 1977",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <div className={styles.loginContainer}>
        <div className={styles.logoRow}>
          <Link href="/" className={styles.backLink}>← На сайт</Link>
          <div className={styles.logo}>
            <span className={styles.logoMark}>Portal</span>
            <span className={styles.logoText}>Studio 1977</span>
          </div>
        </div>
        
        <section className={styles.loginSection}>
          <div className={styles.card}>
            <p className={styles.label}>Авторизация</p>
            <h1 className={styles.title}>Фабрика 1977</h1>
            <p className={styles.subtitle}>
              Войдите под своим корпоративным аккаунтом Битрикс24, чтобы получить доступ к своим задачам и проектам.
            </p>
            
            <Link href="/api/auth/login" className={`${styles.loginBtn} btn btn-primary`}>
              Войти через Битрикс24
            </Link>
            
            <div className={styles.hint}>
              Забыли пароль? Восстановите его в своём портале Bitrix24.
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          © 1977 STUDIO. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </main>
  );
}
