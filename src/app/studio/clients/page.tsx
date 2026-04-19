import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "Клиенты — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function ClientsPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");
  if (!sessionCookie) return null;

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const companiesData = await client.getCompanies();
  const companies = Array.isArray(companiesData) ? companiesData : [];

  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>Клиенты</h1>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>{session.userId.charAt(0).toUpperCase()}</span>
            <span>Сотрудник #{session.userId}</span>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>База контрагентов</h2>
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
              <div className={styles.empty}>Список компаний пуст</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
