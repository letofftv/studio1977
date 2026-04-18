import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Панель студии — Студия 1977",
  robots: "noindex, nofollow",
};

const MOCK_PROJECTS = [
  { id: "1", name: "Ребрендинг «Волна»", client: "Волна", status: "В работе", manager: "Вика", deadline: "15.05.2026" },
  { id: "2", name: "Event Q3 2026", client: "ТехноПарк", status: "Согласование", manager: "Сергей", deadline: "01.07.2026" },
  { id: "3", name: "Digital для AURA", client: "AURA", status: "Подготовка", manager: "Влад", deadline: "20.06.2026" },
];

const MOCK_LEADS = [
  { id: "1", name: "Иван Петров", company: "StartX", type: "Маркетинг", date: "08.04.2026", status: "Новый" },
  { id: "2", name: "Ольга Козлова", company: "FitHub", type: "Брендинг", date: "07.04.2026", status: "В обработке" },
];

export default function StudioDashboard() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>1977</span>
          <span className={styles.logoText}>Студия</span>
        </div>
        <nav className={styles.sidebarNav}>
          <a href="/studio" className={styles.navActive}>Дашборд</a>
          <a href="/studio/projects">Проекты</a>
          <a href="/studio/tasks">Задачи</a>
          <a href="/studio/clients">Клиенты</a>
          <a href="/studio/leads">Лиды</a>
          <a href="/studio/team">Команда</a>
          <a href="/studio/settings">Настройки</a>
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>Панель студии</h1>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>В</span>
            <span>Влад</span>
          </div>
        </header>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Проектов в работе</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>2</span>
            <span className={styles.statLabel}>Новых лида</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>5</span>
            <span className={styles.statLabel}>Задач на сегодня</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum} style={{ color: "var(--color-warning)" }}>1</span>
            <span className={styles.statLabel}>Просроченных</span>
          </div>
        </div>

        {/* Projects */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Проекты</h2>
            <span className={styles.sectionMeta}>{MOCK_PROJECTS.length} активных</span>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Проект</span>
              <span>Клиент</span>
              <span>Статус</span>
              <span>Менеджер</span>
              <span>Дедлайн</span>
            </div>
            {MOCK_PROJECTS.map((p) => (
              <div key={p.id} className={styles.tableRow}>
                <span className={styles.projectName}>{p.name}</span>
                <span>{p.client}</span>
                <span className={styles.badge}>{p.status}</span>
                <span>{p.manager}</span>
                <span className={styles.muted}>{p.deadline}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Leads */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Последние лиды</h2>
            <span className={styles.sectionMeta}>{MOCK_LEADS.length} новых</span>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Имя</span>
              <span>Компания</span>
              <span>Направление</span>
              <span>Дата</span>
              <span>Статус</span>
            </div>
            {MOCK_LEADS.map((l) => (
              <div key={l.id} className={styles.tableRow}>
                <span className={styles.projectName}>{l.name}</span>
                <span>{l.company}</span>
                <span>{l.type}</span>
                <span className={styles.muted}>{l.date}</span>
                <span className={styles.badge}>{l.status}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
