import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Личный кабинет — Студия 1977",
  robots: "noindex, nofollow",
};

const MOCK_PROJECTS = [
  { id: "1", name: "Ребрендинг «Волна»", status: "В работе", stage: "Дизайн", deadline: "15.05.2026" },
  { id: "2", name: "Event Q3 2026", status: "Согласование", stage: "Концепция", deadline: "01.07.2026" },
];

export default function ClientDashboard() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>1977</span>
          <span className={styles.logoText}>Кабинет</span>
        </div>
        <nav className={styles.sidebarNav}>
          <a href="/app" className={styles.navActive}>Дашборд</a>
          <a href="/app/projects">Проекты</a>
          <a href="/app/files">Файлы</a>
          <a href="/app/documents">Документы</a>
          <a href="/app/profile">Профиль</a>
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>Дашборд</h1>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>К</span>
            <span>Клиент</span>
          </div>
        </header>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statNum}>2</span>
            <span className={styles.statLabel}>Активных проекта</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>1</span>
            <span className={styles.statLabel}>На согласовании</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>4</span>
            <span className={styles.statLabel}>Новых файла</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>0</span>
            <span className={styles.statLabel}>Уведомлений</span>
          </div>
        </div>

        {/* Projects */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Мои проекты</h2>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Проект</span>
              <span>Статус</span>
              <span>Этап</span>
              <span>Дедлайн</span>
            </div>
            {MOCK_PROJECTS.map((p) => (
              <div key={p.id} className={styles.tableRow}>
                <span className={styles.projectName}>{p.name}</span>
                <span className={styles.badge}>{p.status}</span>
                <span>{p.stage}</span>
                <span className={styles.muted}>{p.deadline}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
