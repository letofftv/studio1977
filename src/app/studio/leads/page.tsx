import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";

export const metadata = {
  title: "Лиды — Студия 1977",
};

export default async function LeadsPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");
  if (!sessionCookie) return null;

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const leads = await client.getLeads();

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>Portal</span>
          <span className={styles.logoText}>Studio 1977</span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/studio">Дашборд</Link>
          <Link href="/studio/projects">Проекты</Link>
          <Link href="/studio/tasks">Задачи</Link>
          <Link href="/studio/clients">Клиенты</Link>
          <Link href="/studio/leads" className={styles.navActive}>Лиды</Link>
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
            <h1>Лиды</h1>
            <p>Входящие запросы / Список</p>
          </div>
        </header>

        <div className={styles.dashContent}>
          <section className={styles.section}>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>ID</span>
                <span>Название / Контакт</span>
                <span>Статус</span>
                <span>Дата создания</span>
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
                    <span className={styles.muted}>{new Date(l.DATE_CREATE).toLocaleDateString()}</span>
                  </div>
                ))
              ) : (
                <div className={styles.empty}>Лидов пока нет.</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
