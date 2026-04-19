import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import StudioPageLayout from "../components/StudioPageLayout";

export const metadata = {
  title: "База клиентов — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function ClientsPage() {
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
  let companiesData: any = [];
  let errorState: string | null = null;

  if (session) {
    companiesData = await client.getCompanies();
    if (companiesData.error === "AUTH_EXPIRED") {
      errorState = "AUTH_EXPIRED";
    }
  }

  const companies = Array.isArray(companiesData) ? companiesData : [];

  return (
    <StudioPageLayout session={session} error={errorState} title="База клиентов">
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Компании и контрагенты</h2>
            <p className={styles.sectionSub}>Список компаний, сохранённых в CRM. Здесь хранится история ваших отношений с бизнесом.</p>
          </div>
          <span className={styles.sectionMeta}>{companies.length} компаний</span>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Название</span>
            <span>Тип</span>
            <span>Оборот (годовой)</span>
            <span>Дата регистрации</span>
          </div>
          {companies.length > 0 ? (
            companies.map((c: any) => (
              <div key={c.ID} className={styles.tableRow}>
                <span className={styles.projectName}>{c.TITLE}</span>
                <span>{c.COMPANY_TYPE || "Клиент"}</span>
                <span>{c.REVENUE ? `${Number(c.REVENUE).toLocaleString()} ₽` : "—"}</span>
                <span className={styles.muted}>{new Date(c.DATE_CREATE).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <div className={styles.empty}>Список клиентов пуст. Пора добавить первую компанию в CRM.</div>
          )}
        </div>
      </section>
    </StudioPageLayout>
  );
}
