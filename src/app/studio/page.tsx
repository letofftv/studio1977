import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "./page.module.css";
import StudioPageLayout from "./components/StudioPageLayout";

export const metadata = {
  title: "Панель студии — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function StudioDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");

  let session: BitrixSession | null = null;
  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie.value);
    } catch (e) {
      console.error("Failed to parse session cookie");
    }
  }

  const client = new BitrixClient(session || undefined);
  
  // Try fetching data if we have a session
  let projectsData: any = [];
  let leadsData: any = [];
  let tasksData: any = [];
  let errorState: string | null = null;

  if (session) {
    const results = await Promise.all([
      client.getProjects(),
      client.getLeads(),
      client.getTasks(session.userId),
    ]);
    projectsData = results[0];
    leadsData = results[1];
    tasksData = results[2];

    if (projectsData.error === "AUTH_EXPIRED") {
      errorState = "AUTH_EXPIRED";
    }

  }

  const projects = Array.isArray(projectsData) ? projectsData : [];
  const leads = Array.isArray(leadsData) ? leadsData : [];
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  return (
    <StudioPageLayout session={session} error={errorState} title="Обзор работы">
      <p className={styles.subtitle}>
        Короткая сводка по проектам, лидам и задачам. Здесь видно, где всё спокойно, а где пора вмешаться.
      </p>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{projects.length}</span>
          <span className={styles.statLabel}>Проектов в работе</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{leads.length}</span>
          <span className={styles.statLabel}>Новых лидов</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{tasks.length}</span>
          <span className={styles.statLabel}>Задач</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum} style={{ color: "var(--color-warning)" }}>
            {tasks.filter((t: any) => t.deadline && new Date(t.deadline) < new Date()).length}
          </span>
          <span className={styles.statLabel}>Просроченных</span>
        </div>
      </div>

      {/* Projects */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Последние проекты</h2>
          <span className={styles.sectionMeta}>{projects.length} активных</span>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Проект</span>
            <span>Клиент</span>
            <span>Статус</span>
            <span>Ответственный</span>
            <span>Обновлено</span>
          </div>
          {projects.length > 0 ? (
            projects.map((p: any) => (
              <div key={p.ID} className={styles.tableRow}>
                <span className={styles.projectName}>{p.TITLE}</span>
                <span>{p.COMPANY_TITLE || "—"}</span>
                <span className={styles.badge}>{p.STAGE_ID}</span>
                <span>ID: {p.ASSIGNED_BY_ID}</span>
                <span className={styles.muted}>{new Date(p.DATE_MODIFY || p.DATE_CREATE).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <div className={styles.empty}>Активных проектов пока нет.</div>
          )}
        </div>
      </section>

      {/* Leads */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Новые лиды</h2>
          <span className={styles.sectionMeta}>{leads.length} новых</span>
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
            <div className={styles.empty}>Новых обращений пока нет. Проверьте формы и каналы входа.</div>
          )}
        </div>
      </section>
    </StudioPageLayout>
  );
}
