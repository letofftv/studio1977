import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import StudioPageLayout from "../components/StudioPageLayout";

export const metadata = {
  title: "Задачи — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function TasksPage() {
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
  let tasksData: any = [];
  let errorState: string | null = null;

  if (session) {
    tasksData = await client.getTasks(session.userId);
    if (tasksData.error === "AUTH_EXPIRED") {
      errorState = "AUTH_EXPIRED";
    }
  }

  const tasks = Array.isArray(tasksData) ? tasksData : [];

  return (
    <StudioPageLayout session={session} error={errorState} title="Задачи">
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Мои задачи</h2>
          <span className={styles.sectionMeta}>{tasks.length} активных</span>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>ID</span>
            <span>Описание</span>
            <span>Крайний срок</span>
            <span>Статус</span>
          </div>
          {tasks.length > 0 ? (
            tasks.map((t: any) => (
              <div key={t.id} className={styles.tableRow}>
                <span className={styles.muted}>#{t.id}</span>
                <span className={styles.projectName}>{t.title}</span>
                <span className={t.deadline ? "" : styles.muted}>
                  {t.deadline ? new Date(t.deadline).toLocaleDateString() : "Не задан"}
                </span>
                <span className={styles.badge}>
                  {t.status === "5" ? "Завершена" : "Активна"}
                </span>
              </div>
            ))
          ) : (
            <div className={styles.empty}>Нет активных задач</div>
          )}
        </div>
      </section>
    </StudioPageLayout>
  );
}
