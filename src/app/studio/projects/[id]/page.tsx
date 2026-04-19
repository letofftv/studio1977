import { cookies } from "next/headers";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "../../page.module.css";
import StudioPageLayout from "../../components/StudioPageLayout";
import Link from "next/link";

export const metadata = {
  title: "Детали проекта — Студия 1977",
  robots: "noindex, nofollow",
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
  let project: any = null;
  let errorState: string | null = null;

  if (session) {
    const data = await client.getProjectById(id);
    if (data && data.error === "AUTH_EXPIRED") {
      errorState = "AUTH_EXPIRED";
    } else {
      project = data;
    }
  }

  return (
    <StudioPageLayout session={session} error={errorState} title={project?.TITLE || "Проект"}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/studio/projects" className="btn btn-outline" style={{ display: 'inline-block', padding: '8px 16px', fontSize: '0.9rem' }}>
          ← Назад к списку
        </Link>
      </div>

      {!project ? (
        <section className={styles.section}>
          <div className={styles.empty}>Проект не найден или у вас нет доступа</div>
        </section>
      ) : (
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Общая информация</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <strong style={{ color: 'var(--color-text-muted)' }}>ID в системе:</strong> {project.ID}
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-muted)' }}>Стадия (воронка):</strong> <span className={styles.badge}>{project.STAGE_ID}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-muted)' }}>Дата старта:</strong> {new Date(project.DATE_CREATE).toLocaleDateString()}
              </div>
              {project.COMPANY_ID && (
                <div>
                  <strong style={{ color: 'var(--color-text-muted)' }}>ID Клиента:</strong> {project.COMPANY_ID}
                </div>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Финансы и Ответственность</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <strong style={{ color: 'var(--color-text-muted)' }}>Бюджет:</strong> {project.OPPORTUNITY ? `${project.OPPORTUNITY} ${project.CURRENCY_ID}` : "Не указан"}
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-muted)' }}>Ответственный ID:</strong> {project.ASSIGNED_BY_ID}
              </div>
            </div>
          </section>
        </div>
      )}
    </StudioPageLayout>
  );
}
