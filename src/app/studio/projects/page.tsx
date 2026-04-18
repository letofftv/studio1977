import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";

export const metadata = {
  title: "Активные проекты — Студия 1977",
};

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");

  if (!sessionCookie) return null;

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const projects = await client.getProjects();

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
          <div className={styles.navSpacer} />
          <Link href="/api/auth/logout" className={styles.logoutBtn}>Выйти</Link>
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <p className="section-label">Deals Pipeline</p>
            <h1 className={styles.pageTitle}>Активные проекты</h1>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>ID</span>
              <span>Название проекта</span>
              <span>Компания</span>
              <span>Стадия</span>
            </div>
            {projects.length > 0 ? (
              projects.map((p: any) => (
                <div key={p.ID} className={styles.tableRow}>
                  <span className={styles.muted}>#{p.ID}</span>
                  <span className={styles.projectName}>{p.TITLE}</span>
                  <span>{p.COMPANY_TITLE || "—"}</span>
                  <span className={styles.badge}>{p.STAGE_ID}</span>
                </div>
              ))
            ) : (
              <div className={styles.empty}>Активных проектов нет</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
