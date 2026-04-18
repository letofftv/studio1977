import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";

export const metadata = {
  title: "Все лиды — Студия 1977",
};

export default async function LeadsPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");

  if (!sessionCookie) return null; // Should be handled by layout/sidebar check

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const leads = await client.getLeads();

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
          <Link href="/studio/clients">Клиенты</Link>
          <Link href="/studio/leads" className={styles.navActive}>Лиды</Link>
          <Link href="/studio/team">Команда</Link>
          <div className={styles.navSpacer} />
          <Link href="/api/auth/logout" className={styles.logoutBtn}>Выйти</Link>
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <p className="section-label">Pipeline 1977</p>
            <h1 className={styles.pageTitle}>Все лиды</h1>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>ID</span>
              <span>Лид / Компания</span>
              <span>Статус</span>
              <span>Дата создания</span>
            </div>
            {leads.length > 0 ? (
              leads.map((l: any) => (
                <div key={l.ID} className={styles.tableRow}>
                  <span className={styles.muted}>#{l.ID}</span>
                  <div>
                    <div className={styles.projectName}>{l.TITLE}</div>
                    <div className={styles.muted}>{l.NAME} {l.LAST_NAME}</div>
                  </div>
                  <span className={styles.badge}>{l.STATUS_ID}</span>
                  <span className={styles.muted}>{new Date(l.DATE_CREATE).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <div className={styles.empty}>Лидов пока нет</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
