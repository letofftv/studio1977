import { cookies } from "next/headers";
import Link from "next/link";
import styles from "../page.module.css";

export default async function ClientsPage() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>1977</span>
          <span className={styles.logoText}>Студия</span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/studio">Дашборд</Link>
          <Link href="/studio/projects">Проекты</Link>
          <Link href="/studio/tasks">Задачи</Link>
          <Link href="/studio/clients" className={styles.navActive}>Клиенты</Link>
          <Link href="/studio/leads">Лиды</Link>
          <Link href="/studio/team">Команда</Link>
          <div className={styles.navSpacer} />
          <Link href="/api/auth/logout" className={styles.logoutBtn}>Выйти</Link>
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>
      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <p className="section-label">Database</p>
            <h1 className={styles.pageTitle}>Клиенты</h1>
          </div>
        </header>
        <section className={styles.section}>
          <div className={styles.empty}>Раздел «Клиенты» находится в разработке. Данные будут синхронизированы из Контрагентов Битрикс24.</div>
        </section>
      </main>
    </div>
  );
}
