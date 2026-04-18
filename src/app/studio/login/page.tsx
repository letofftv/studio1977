import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Вход в панель — Студия 1977",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.loginSection}>
          <div className={styles.card}>
            <p className="section-label">Авторизация</p>
            <h1 className={styles.title}>Studio Factory</h1>
            <p className={styles.subtitle}>Войдите под своим корпоративным аккаунтом Битрикс24, чтобы получить доступ к задачам и проектам.</p>
            
            <button className={`${styles.loginBtn} btn btn-primary`}>
              Войти через Битрикс24
            </button>
            
            <div className={styles.hint}>
              Забыли пароль? Восстановите его в своём портале Bitrix24.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
