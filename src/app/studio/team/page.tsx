import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Команда — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function StudioTeamPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");
  if (!sessionCookie) return null;

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const usersData = await client.getUsers();
  const users = Array.isArray(usersData) ? usersData : [];

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>Команда</h1>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>{session.userId.charAt(0).toUpperCase()}</span>
            <span>Сотрудник #{session.userId}</span>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Сотрудники портала</h2>
            <span className={styles.sectionMeta}>{users.length} человек</span>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Имя Фамилия</span>
              <span>Должность</span>
              <span>E-mail</span>
              <span>ID</span>
            </div>
            {users.length > 0 ? (
              users.map((u: any) => (
                <div key={u.ID} className={styles.tableRow}>
                  <span className={styles.projectName}>{u.NAME} {u.LAST_NAME}</span>
                  <span>{u.WORK_POSITION || "Сотрудник"}</span>
                  <span>{u.EMAIL || "—"}</span>
                  <span className={styles.muted}>#{u.ID}</span>
                </div>
              ))
            ) : (
              <div className={styles.empty}>Никто не найден</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
