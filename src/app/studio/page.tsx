import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "./page.module.css";
import StudioPageLayout from "./components/StudioPageLayout";
import Link from "next/link";

export const metadata = {
  title: "Обзор работы — Студия 1977",
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
      <p className={styles.pageSubtitle}>Короткая сводка по проектам, лидам и задачам. Здесь видно, где всё спокойно, а где пора вмешаться.</p>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{projects.length}</span>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Проектов в работе</span>
            <span className={styles.statDesc}>Активные сделки и проекты в работе.</span>
          </div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{leads.length}</span>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Новых лидов</span>
            <span className={styles.statDesc}>Обращения за выбранный период.</span>
          </div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{tasks.length}</span>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Задач</span>
            <span className={styles.statDesc}>Назначены на вас или вашу команду.</span>
          </div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum} style={{ color: "var(--color-warning)" }}>
            {tasks.filter((t: any) => t.deadline && new Date(t.deadline) < new Date()).length}
          </span>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Просроченных</span>
            <span className={styles.statDesc}>Задачи, у которых прошёл дедлайн.</span>
          </div>
        </div>
      </div>

      {/* Projects */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Последние проекты</h2>
            <p className={styles.sectionSub}>Проекты, по которым недавно были изменения или новые действия.</p>
          </div>
          <Link href="/studio/projects" className="btn btn-outline btn-sm">Все проекты</Link>
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
            projects.slice(0, 5).map((p: any) => (
              <div key={p.ID} className={styles.tableRow}>
                <span className={styles.projectName}>{p.TITLE}</span>
                <span>{p.COMPANY_TITLE || "—"}</span>
                <span className={styles.badge}>{p.STAGE_ID}</span>
                <span>ID: {p.ASSIGNED_BY_ID}</span>
                <span className={styles.muted}>{new Date(p.DATE_MODIFY || p.DATE_CREATE).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <div className={styles.empty}>Пока нет проектов для отображения. Когда появятся сделки в CRM, они будут здесь.</div>
          )}
        </div>
      </section>

      {/* Leads */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Новые лиды</h2>
            <p className={styles.sectionSub}>Входящие обращения, которые нужно разобрать и передать в работу.</p>
          </div>
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
            leads.slice(0, 5).map((l: any) => (
              <div key={l.ID} className={styles.tableRow}>
                <span className={styles.projectName}>{l.NAME} {l.LAST_NAME}</span>
                <span>{l.COMPANY_TITLE || "—"}</span>
                <span>{l.TITLE}</span>
                <span className={styles.muted}>{new Date(l.DATE_CREATE).toLocaleDateString()}</span>
                <span className={styles.badge}>{l.STATUS_ID}</span>
              </div>
            ))
          ) : (
            <div className={styles.empty}>Новых лидов пока нет.</div>
          )}
        </div>
      </section>
    </StudioPageLayout>
  );
}
