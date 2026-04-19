import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Задачи — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function TasksPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");
  if (!sessionCookie) return null;

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const tasksData = await client.getTasks(session.userId);
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>Задачи</h1>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>{session.userId.charAt(0).toUpperCase()}</span>
            <span>Сотрудник #{session.userId}</span>
          </div>
        </header>

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
      </main>
    </div>
  );
}
