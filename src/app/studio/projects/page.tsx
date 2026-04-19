import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import StudioPageLayout from "../components/StudioPageLayout";

export const metadata = {
  title: "Все проекты — Студия 1977",
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
    <StudioPageLayout session={session} error={errorState} title="Все проекты">
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Проекты в CRM</h2>
            <p className={styles.sectionSub}>Список всех сделок и активностей из CRM. Здесь можно отследить статус, ответственных и дату обновления.</p>
          </div>
          <span className={styles.sectionMeta}>{projects.length} проектов</span>
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
            <div className={styles.empty}>Проектов пока нет. Как только в CRM появятся сделки, они отобразятся в этом списке.</div>
          )}
        </div>
      </section>
    </StudioPageLayout>
  );
}
