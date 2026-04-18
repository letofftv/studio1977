import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";

export const metadata = {
  title: "Tasks — Studio 1977",
};

export default async function TasksPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");

  if (!sessionCookie) return null;

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const tasks = await client.getTasks(session.userId);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>Portal</span>
          <span className={styles.logoText}>Studio 1977</span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/studio">Dashboard</Link>
          <Link href="/studio/projects">Projects</Link>
          <Link href="/studio/tasks" className={styles.navActive}>Tasks</Link>
          <Link href="/studio/clients">Clients</Link>
          <Link href="/studio/leads">Leads</Link>
          <Link href="/studio/team">Team</Link>
        </nav>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>USR</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>User #{session.userId}</div>
            <div className={styles.userRole}>1977 Premium Partner</div>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h1>Tasks</h1>
            <p>Project Pipeline / Duties</p>
          </div>
        </header>

        <div className={styles.dashContent}>
          <section className={styles.section}>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>ID</span>
                <span>Task Description</span>
                <span>Deadline</span>
                <span>Status</span>
              </div>
              {tasks.length > 0 ? (
                tasks.map((t: any) => (
                  <div key={t.id} className={styles.tableRow}>
                    <span className={styles.muted}>#{t.id}</span>
                    <span className={styles.projectName}>{t.title}</span>
                    <span className={t.deadline ? "" : styles.muted}>
                      {t.deadline ? new Date(t.deadline).toLocaleDateString() : "Pending"}
                    </span>
                    <span className={styles.badge}>
                      {t.status === "5" ? "Closed" : "Active"}
                    </span>
                  </div>
                ))
              ) : (
                <div className={styles.empty}>No active tasks found.</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
