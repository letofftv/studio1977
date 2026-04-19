import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "./page.module.css";

export const metadata = {
  title: "Панель студии — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function StudioDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");

  if (!sessionCookie) {
    return (
      <div className={styles.layout}>
        <div className={styles.authError}>
          <h2>Доступ ограничен</h2>
          <p>Пожалуйста, авторизуйтесь через корпоративный портал.</p>
          <Link href="/studio/login" className="btn btn-primary" style={{ marginTop: "24px" }}>Войти</Link>
        </div>
      </div>
    );
  }

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);

  const [projectsData, leadsData, tasksData] = await Promise.all([
    client.getProjects(),
    client.getLeads(),
    client.getTasks(session.userId),
  ]);

  // Handle expired token
  if (projectsData.error === "AUTH_EXPIRED") {
    return (
      <div className={styles.layout}>
        <div className={styles.authError}>
          <h2>Сессия истекла</h2>
          <p>Ваш токен Битрикс24 больше не действителен.</p>
          <Link href="/api/auth/logout" className="btn btn-primary" style={{ marginTop: "24px" }}>Обновить сессию</Link>
        </div>
      </div>
    );
  }

  const projects = Array.isArray(projectsData) ? projectsData : [];
  const leads = Array.isArray(leadsData) ? leadsData : [];
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>1977</span>
          <span className={styles.logoText}>Студия</span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/studio" className={styles.navActive}>Дашборд</Link>
          <Link href="/studio/projects">Проекты</Link>
          <Link href="/studio/tasks">Задачи</Link>
          <Link href="/studio/clients">Клиенты</Link>
          <Link href="/studio/leads">Лиды</Link>
          <Link href="/studio/team">Команда</Link>
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>Панель студии</h1>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>{session.userId.charAt(0).toUpperCase()}</span>
            <span>Сотрудник #{session.userId}</span>
          </div>
        </header>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{projects.length}</span>
            <span className={styles.statLabel}>Проектов в работе</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{leads.length}</span>
            <span className={styles.statLabel}>Новых лидов</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{tasks.length}</span>
            <span className={styles.statLabel}>Задач</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum} style={{ color: "var(--color-warning)" }}>
              {tasks.filter((t: any) => t.deadline && new Date(t.deadline) < new Date()).length}
            </span>
            <span className={styles.statLabel}>Просроченных</span>
          </div>
        </div>

        {/* Projects */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Проекты</h2>
            <span className={styles.sectionMeta}>{projects.length} активных</span>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Проект</span>
              <span>Клиент</span>
              <span>Статус</span>
              <span>Ответственный</span>
              <span>Дата создания</span>
            </div>
            {projects.length > 0 ? (
              projects.map((p: any) => (
                <div key={p.ID} className={styles.tableRow}>
                  <span className={styles.projectName}>{p.TITLE}</span>
                  <span>{p.COMPANY_TITLE || "—"}</span>
                  <span className={styles.badge}>{p.STAGE_ID}</span>
                  <span>ID: {p.ASSIGNED_BY_ID}</span>
                  <span className={styles.muted}>{new Date(p.DATE_CREATE).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <div className={styles.empty}>Нет активных проектов</div>
            )}
          </div>
        </section>

        {/* Leads */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Последние лиды</h2>
            <span className={styles.sectionMeta}>{leads.length} новых</span>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Имя</span>
              <span>Компания</span>
              <span>Направление</span>
              <span>Дата</span>
              <span>Статус</span>
            </div>
            {leads.length > 0 ? (
              leads.map((l: any) => (
                <div key={l.ID} className={styles.tableRow}>
                  <span className={styles.projectName}>{l.NAME} {l.LAST_NAME}</span>
                  <span>{l.COMPANY_TITLE || "—"}</span>
                  <span>{l.TITLE}</span>
                  <span className={styles.muted}>{new Date(l.DATE_CREATE).toLocaleDateString()}</span>
                  <span className={styles.badge}>{l.STATUS_ID}</span>
                </div>
              ))
            ) : (
              <div className={styles.empty}>Нет новых лидов</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
