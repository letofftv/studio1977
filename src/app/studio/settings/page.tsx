import { cookies } from "next/headers";
import { BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css";
import StudioPageLayout from "../components/StudioPageLayout";

export const metadata = {
  title: "Настройки — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function SettingsPage() {
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

  return (
    <StudioPageLayout session={session} title="Настройки">
      <p className={styles.pageSubtitle}>Основные параметры рабочего пространства, интеграций и уведомлений.</p>

      <div className={styles.settingsGrid} style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", marginTop: "32px" }}>
        <section className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "12px", color: "var(--color-accent)" }}>Профиль</h3>
          <p className={styles.muted}>Имя, email, роль, аватар и контактные данные пользователя.</p>
        </section>

        <section className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "12px", color: "var(--color-accent)" }}>Рабочее пространство</h3>
          <p className={styles.muted}>Название студии, логотип, часовой пояс и базовые данные компании.</p>
        </section>

        <section className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "12px", color: "var(--color-accent)" }}>Интеграции</h3>
          <div className={styles.empty} style={{ padding: "12px 0" }}>Интеграции пока не подключены. После подключения данные начнут подтягиваться автоматически.</div>
        </section>

        <section className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "12px", color: "var(--color-accent)" }}>Уведомления</h3>
          <p className={styles.muted}>Настройка уведомлений о новых лидах, просроченных задачах и изменениях в проектах.</p>
        </section>

        <section className="card" style={{ padding: "24px" }}>
          <h3 style={{ marginBottom: "12px", color: "var(--color-accent)" }}>Доступы</h3>
          <p className={styles.muted}>Роли пользователей, права просмотра и редактирования разделов.</p>
        </section>
      </div>
    </StudioPageLayout>
  );
}
