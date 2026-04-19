import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";

export const metadata = {
  title: "Проекты — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");
  if (!sessionCookie) return null;

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const projectsData = await client.getProjects();
  const projects = Array.isArray(projectsData) ? projectsData : [];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>1977</span>
          <span className={styles.logoText}>Студия</span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/studio">Дашборд</Link>
          <Link href="/studio/projects" className={styles.navActive}>Проекты</Link>
          <Link href="/studio/tasks">Задачи</Link>
          <Link href="/studio/clients">Клиенты</Link>
          <Link href="/studio/leads">Лиды</Link>
          <Link href="/studio/team">Команда</Link>
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>Проекты</h1>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>{session.userId.charAt(0).toUpperCase()}</span>
            <span>Сотрудник #{session.userId}</span>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Активные проекты</h2>
            <span className={styles.sectionMeta}>{projects.length} проектов</span>
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
      </main>
    </div>
  );
}
