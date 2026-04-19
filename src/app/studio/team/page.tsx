import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import StudioPageLayout from "../components/StudioPageLayout";

export const metadata = {
  title: "Команда портала — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function StudioTeamPage() {
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
  let usersData: any = [];
  let errorState: string | null = null;

  if (session) {
    usersData = await client.getUsers();
    if (usersData.error === "AUTH_EXPIRED") {
      errorState = "AUTH_EXPIRED";
    }
  }

  const users = Array.isArray(usersData) ? usersData : [];

  return (
    <StudioPageLayout session={session} error={errorState} title="Команда портала">
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Сотрудники пространства</h2>
            <p className={styles.sectionSub}>Сотрудники, у которых есть доступ к CRM и рабочему пространству Studio 1977.</p>
          </div>
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
            <div className={styles.empty}>Список сотрудников пуст или недоступен.</div>
          )}
        </div>
      </section>
    </StudioPageLayout>
  );
}
