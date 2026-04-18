import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../page.module.css"; // Reuse dashboard styles

export const metadata = {
  title: "Мои задачи — Студия 1977",
};

export default async function TasksPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");

  if (!sessionCookie) {
    return (
      <div className={styles.layout}>
        <div className={styles.authError}>
          <h2>Доступ ограничен</h2>
          <Link href="/studio/login" className="btn btn-primary">Войти</Link>
        </div>
      </div>
    );
  }

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);
  const tasks = await client.getTasks(session.userId);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>1977</span>
          <span className={styles.logoText}>Студия</span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/studio">Дашборд</Link>
          <Link href="/studio/projects">Проекты</Link>
          <Link href="/studio/tasks" className={styles.navActive}>Задачи</Link>
          <Link href="/studio/clients">Клиенты</Link>
          <Link href="/studio/leads">Лиды</Link>
          <Link href="/studio/team">Команда</Link>
          <div className={styles.navSpacer} />
          <Link href="/api/auth/logout" className={styles.logoutBtn}>Выйти</Link>
        </nav>
        <Link href="/" className={styles.sidebarBack}>← На сайт</Link>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <p className="section-label">Bitrix24 Sync</p>
            <h1 className={styles.pageTitle}>Мои задачи</h1>
          </div>
        </header>

        <section className={styles.section}>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>ID</span>
              <span>Задача</span>
              <span>Дедлайн</span>
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
                    {t.status === "5" ? "Завершена" : t.status === "2" ? "Ждет" : "В работе"}
                  </span>
                </div>
              ))
            ) : (
              <div className={styles.empty}>У вас пока нет активных задач</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
