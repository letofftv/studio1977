import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";

export const metadata = {
  title: "Лиды — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function LeadsPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");
  if (!sessionCookie) return null;

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const leadsData = await client.getLeads();
  const leads = Array.isArray(leadsData) ? leadsData : [];

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
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>Лиды</h1>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>{session.userId.charAt(0).toUpperCase()}</span>
            <span>Сотрудник #{session.userId}</span>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Входящие лиды</h2>
            <span className={styles.sectionMeta}>{leads.length} записей</span>
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
              <div className={styles.empty}>Нет лидов</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
