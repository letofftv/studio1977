import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";

export const metadata = {
  title: "Leads — Studio 1977",
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
          <Link href="/studio">Dashboard</Link>
          <Link href="/studio/projects">Projects</Link>
          <Link href="/studio/tasks">Tasks</Link>
          <Link href="/studio/clients">Clients</Link>
          <Link href="/studio/leads" className={styles.navActive}>Leads</Link>
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
            <h1>Leads</h1>
            <p>Potential Partnerships / Feed</p>
          </div>
        </header>

        <div className={styles.dashContent}>
          <section className={styles.section}>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>ID</span>
                <span>Title / Contact</span>
                <span>Status</span>
                <span>Created</span>
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
                <div className={styles.empty}>No leads available.</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
