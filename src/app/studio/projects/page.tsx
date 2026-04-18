import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";

export const metadata = {
  title: "Проекты — Студия 1977",
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
          <span className={styles.logoMark}>Portal</span>
          <span className={styles.logoText}>Studio 1977</span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/studio">Дашборд</Link>
          <Link href="/studio/projects" className={styles.navActive}>Проекты</Link>
          <Link href="/studio/tasks">Задачи</Link>
          <Link href="/studio/clients">Клиенты</Link>
          <Link href="/studio/leads">Лиды</Link>
          <Link href="/studio/team">Команда</Link>
        </nav>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>ID</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Сотрудник #{session.userId}</div>
            <div className={styles.userRole}>Команда 1977</div>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h1>Проекты</h1>
            <p>Активные сделки / Обзор</p>
          </div>
        </header>

        <div className={styles.dashContent}>
          <section className={styles.section}>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>ID</span>
                <span>Название проекта</span>
                <span>Компания</span>
                <span>Стадия сделки</span>
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
                <div className={styles.empty}>Активных проектов не найдено.</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
