import Link from "next/link";
import Sidebar from "./Sidebar";
import styles from "../page.module.css";
import { BitrixSession } from "@/lib/bitrix-api";

interface Props {
  session?: BitrixSession | null;
  error?: string | null;
  title: string;
  children: React.ReactNode;
}

export default function StudioPageLayout({ session, error, title, children }: Props) {
  // 1. No session state
  if (!session) {
    return (
      <div className={styles.layout}>
        <div className={styles.authError}>
          <h2>Доступ ограничен</h2>
          <p>Пожалуйста, авторизуйтесь через корпоративный портал Студии 1977.</p>
          <Link href="/studio/login" className="btn btn-primary" style={{ marginTop: "24px" }}>
            Войти в кабинет
          </Link>
        </div>
      </div>
    );
  }

  // 2. Auth expired state or CRM error
  if (error === "AUTH_EXPIRED" || error === "CRM_ERROR") {
    return (
      <div className={styles.layout}>
        <div className={styles.authError}>
          <h2>Сессия истекла</h2>
          <p>Не получилось получить данные из CRM. Возможно, соединение временно недоступно или требуется повторная авторизация.</p>
          <Link href="/api/auth/logout" className="btn btn-primary" style={{ marginTop: "24px" }}>
            Обновить вход
          </Link>
        </div>
      </div>
    );
  }

  // 3. Main layout
  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <h1 className={styles.pageTitle}>{title}</h1>
          <div className={styles.userBadge}>
            <span className={styles.avatar}>
              {session.userId.charAt(0).toUpperCase()}
            </span>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Сотрудник #{session.userId}</span>
              <span className={styles.userRole}>{session.userId === "1" ? "Администратор" : "Специалист"}</span>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
