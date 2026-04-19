import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import StudioPageLayout from "../components/StudioPageLayout";

export const metadata = {
  title: "Проекты — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function ProjectsPage() {
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
  let errorState: string | null = null;

  if (session) {
    projectsData = await client.getProjects();
    if (projectsData.error === "AUTH_EXPIRED") {
      errorState = "AUTH_EXPIRED";
    }
  }

  const projects = Array.isArray(projectsData) ? projectsData : [];

  return (
    <StudioPageLayout session={session} error={errorState} title="Проекты">
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Активные проекты</h2>
          <span className={styles.sectionMeta}>{projects.length} проектов</span>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Проект</span>
            <span>Клиент</span>
            <span>Статус</span>
            <span>Ответственный</span>
            <span>Дата создания</span>
          </div>
          {projects.length > 0 ? (
            projects.map((p: any) => (
              <div key={p.ID} className={styles.tableRow}>
                <span className={styles.projectName}>{p.TITLE}</span>
                <span>{p.COMPANY_TITLE || "—"}</span>
                <span className={styles.badge}>{p.STAGE_ID}</span>
                <span>ID: {p.ASSIGNED_BY_ID}</span>
                <span className={styles.muted}>{new Date(p.DATE_CREATE).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <div className={styles.empty}>Нет активных проектов</div>
          )}
        </div>
      </section>
    </StudioPageLayout>
  );
}
