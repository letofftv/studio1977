import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import StudioPageLayout from "../components/StudioPageLayout";

export const metadata = {
  title: "Лиды — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function LeadsPage() {
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
  let leadsData: any = [];
  let errorState: string | null = null;

  if (session) {
    leadsData = await client.getLeads();
    if (leadsData.error === "AUTH_EXPIRED") {
      errorState = "AUTH_EXPIRED";
    }
    // Persist refreshed token
    const updatedSession = client.getSession();
    if (updatedSession && updatedSession.accessToken !== session.accessToken) {
      const cookieStore2 = await cookies();
      cookieStore2.set("bitrix_session", JSON.stringify(updatedSession), {
        httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 3600 * 24 * 7,
      });
    }
  }

  const leads = Array.isArray(leadsData) ? leadsData : [];

  return (
    <StudioPageLayout session={session} error={errorState} title="Входящие лиды">
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Входящие лиды</h2>
          <span className={styles.sectionMeta}>{leads.length} записей</span>
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
            <div className={styles.empty}>Нет лидов</div>
          )}
        </div>
      </section>
    </StudioPageLayout>
  );
}
