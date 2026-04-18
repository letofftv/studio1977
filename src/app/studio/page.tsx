import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "./page.module.css";

export const metadata = {
  title: "Дашборд — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function StudioDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");

  if (!sessionCookie) {
    // Redirect to login if no session
    return (
      <div className={styles.layout}>
        <div className={styles.authError}>
          <h2>Требуется авторизация</h2>
          <p>Войдите в систему, чтобы получить доступ к панели управления.</p>
          <Link href="/studio/login" className="btn btn-primary">Перейти ко входу</Link>
        </div>
      </div>
    );
  }

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);

  // Fetch real data
  const [projects, leads, tasks] = await Promise.all([
    client.getProjects(),
    client.getLeads(),
    client.getTasks(session.userId),
  ]);

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
          <div className={styles.navSpacer} />
          <Link href="/api/auth/logout" className={styles.logoutBtn}>Выйти</Link>
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <p className="section-label">Studio Factory</p>
            <h1 className={styles.pageTitle}>Дашборд</h1>
          </div>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>ID</span>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Пользователь #{session.userId}</span>
              <span className={styles.userRole}>Команда 1977</span>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{projects.length}</span>
            <span className={styles.statLabel}>Активных проектов</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{leads.length}</span>
            <span className={styles.statLabel}>Свежих лидов</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{tasks.length}</span>
            <span className={styles.statLabel}>Ваших задач</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum} style={{ color: "var(--color-primary)" }}>Online</span>
            <span className={styles.statLabel}>Статус CRM</span>
          </div>
        </div>

        {/* Projects */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Активные проекты</h2>
            <Link href="/studio/projects" className={styles.moreLink}>Все проекты →</Link>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>ID</span>
              <span>Название проекта</span>
              <span>Клиент</span>
              <span>Стадия</span>
              <span>Дата</span>
            </div>
            {projects.length > 0 ? (
              projects.map((p: any) => (
                <div key={p.ID} className={styles.tableRow}>
                  <span className={styles.muted}>#{p.ID}</span>
                  <span className={styles.projectName}>{p.TITLE}</span>
                  <span>{p.COMPANY_TITLE || "—"}</span>
                  <span className={styles.badge}>{p.STAGE_ID}</span>
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
            <Link href="/studio/leads" className={styles.moreLink}>Все лиды →</Link>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>ID</span>
              <span>Лид / Компания</span>
              <span>Статус</span>
              <span>Источник</span>
              <span>Дата</span>
            </div>
            {leads.length > 0 ? (
              leads.map((l: any) => (
                <div key={l.ID} className={styles.tableRow}>
                  <span className={styles.muted}>#{l.ID}</span>
                  <div>
                    <div className={styles.projectName}>{l.TITLE}</div>
                    <div className={styles.muted} style={{ fontSize: "0.75rem" }}>{l.NAME} {l.LAST_NAME}</div>
                  </div>
                  <span className={styles.badge}>{l.STATUS_ID}</span>
                  <span className={styles.muted}>CRM</span>
                  <span className={styles.muted}>{new Date(l.DATE_CREATE).toLocaleDateString()}</span>
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
