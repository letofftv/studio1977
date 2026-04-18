import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";

export const metadata = {
  title: "Projects — Studio 1977",
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
          <Link href="/studio">Dashboard</Link>
          <Link href="/studio/projects" className={styles.navActive}>Projects</Link>
          <Link href="/studio/tasks">Tasks</Link>
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
            <h1>Projects</h1>
            <p>Active Ventures / Overview</p>
          </div>
        </header>

        <div className={styles.dashContent}>
          <section className={styles.section}>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>ID</span>
                <span>Project Name</span>
                <span>Company</span>
                <span>Stage</span>
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
                <div className={styles.empty}>No active projects found.</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
