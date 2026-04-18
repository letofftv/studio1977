import { cookies } from "next/headers";
import Link from "next/link";
import { BitrixClient, BitrixSession } from "@/lib/bitrix-api";
import styles from "./page.module.css";

export const metadata = {
  title: "Workspace — Studio 1977",
  robots: "noindex, nofollow",
};

export default async function StudioDashboard() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("bitrix_session");

  if (!sessionCookie) {
    return (
      <div className={styles.layout}>
        <div className={styles.authError}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>Доступ ограничен</h2>
          <p style={{ fontFamily: "var(--font-heading)", opacity: 0.6 }}>Пожалуйста, авторизуйтесь через корпоративный портал.</p>
          <Link href="/studio/login" className="btn btn-primary" style={{ marginTop: "24px" }}>Войти в Workspace</Link>
        </div>
      </div>
    );
  }

  const session: BitrixSession = JSON.parse(sessionCookie.value);
  const client = new BitrixClient(session);

  // Fetch real data for context
  const [projects, leads, tasks] = await Promise.all([
    client.getProjects(),
    client.getLeads(),
    client.getTasks(session.userId),
  ]);

  const activeProject = projects[0] || { TITLE: "Проект не выбран", STAGE_ID: "Подготовка" };
  const completionPercent = projects[0] ? 64 : 0; // Mock percent for design, link to Bitrix fields if available

  return (
    <div className={styles.layout}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoMark}>Portal</span>
          <span className={styles.logoText}>Studio 1977</span>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/studio" className={styles.navActive}>
            <span>Dashboard</span>
          </Link>
          <Link href="/studio/projects">
            <span>Projects</span>
          </Link>
          <Link href="/studio/tasks">
            <span>Tasks</span>
          </Link>
          <Link href="/studio/clients">
            <span>Clients</span>
          </Link>
          <Link href="/studio/leads">
            <span>Leads</span>
          </Link>
          <Link href="/studio/team">
            <span>Team</span>
          </Link>
        </nav>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>USR</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>User #{session.userId}</div>
            <div className={styles.userRole}>1977 Premium Partner</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h1>Workspace</h1>
            <p>{activeProject.TITLE} / Overview</p>
          </div>
          <div className={styles.headerActions}>
            <Link href="/contact" className="btn btn-outline" style={{ border: "1px solid rgba(155, 143, 131, 0.2)", fontSize: "0.75rem" }}>
              Support
            </Link>
            <Link href="/brief" className="btn btn-primary" style={{ fontSize: "0.75rem", background: "linear-gradient(135deg, #e6c093 0%, #8C6D46 100%)" }}>
              New Project
            </Link>
          </div>
        </header>

        <div className={styles.dashContent}>
          <div className={styles.grid}>
            {/* Left Column */}
            <section className={styles.milestoneCard}>
              <div className={styles.milestoneHeader}>
                <div>
                  <h2 className={styles.milestoneTitle}>{activeProject.TITLE}</h2>
                  <p className={styles.milestoneSub}>Этап: {activeProject.STAGE_ID}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className={styles.progressValue}>{completionPercent}%</div>
                  <div className={styles.progressLabel}>Completion</div>
                </div>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${completionPercent}%` }} />
              </div>
              <div className={styles.progressMeta}>
                <span>Phase 02: Execution</span>
                <span>Phase 03: Delivery</span>
              </div>
            </section>

            {/* Right Column: Quick Actions */}
            <aside className={styles.sideSection}>
              <div className={styles.actionPanel}>
                <span className={styles.actionLabel}>Quick Actions</span>
                <Link href="/studio/tasks" className={styles.actionBtn}>
                  <div className={styles.actionInfo}>
                    <span className={styles.actionText}>Задачи ({tasks.length})</span>
                  </div>
                  <span style={{ opacity: 0.3 }}>→</span>
                </Link>
                <Link href="/studio/leads" className={styles.actionBtn}>
                  <div className={styles.actionInfo}>
                    <span className={styles.actionText}>Лиды ({leads.length})</span>
                  </div>
                  <span style={{ opacity: 0.3 }}>→</span>
                </Link>
                <Link href="https://t.me/letoff_tv" target="_blank" className={styles.actionBtn}>
                  <div className={styles.actionInfo}>
                    <span className={styles.actionText}>Связаться в TG</span>
                  </div>
                  <span style={{ opacity: 0.3 }}>→</span>
                </Link>
              </div>
            </aside>

            {/* Bento Gallery (Lower Left) */}
            <section className={styles.bentoSection}>
              <div className={styles.bentoHeader}>
                <h3 className={styles.bentoTitle}>Latest Renders & Assets</h3>
                <Link href="/cases" className={styles.progressLabel} style={{ textDecoration: "underline" }}>View Gallery</Link>
              </div>
              <div className={styles.bentoGrid}>
                <div className={styles.bentoMain}>
                  <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" className={styles.bentoImg} alt="Render 1" />
                  <div className={styles.bentoOverlay} />
                </div>
                <div className={styles.bentoSide}>
                  <div className={styles.bentoItem}>
                    <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2070&auto=format&fit=crop" className={styles.bentoImg} alt="Render 2" />
                    <div className={styles.bentoOverlay} />
                  </div>
                  <div className={styles.bentoItem}>
                    <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop" className={styles.bentoImg} alt="Render 3" />
                    <div className={styles.bentoOverlay} />
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Activity (Lower Right) */}
            <aside className={styles.sideSection}>
              <div className={styles.feedPanel}>
                <span className={styles.actionLabel}>Recent Activity</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "16px" }}>
                  {leads.slice(0, 3).map((l: any) => (
                    <div key={l.ID} className={styles.feedItem}>
                      <div className={styles.feedDot} />
                      <div>
                        <p className={styles.feedText}>Новый лид: {l.TITLE}</p>
                        <p className={styles.feedTime}>{new Date(l.DATE_CREATE).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                  {tasks.slice(0, 1).map((t: any) => (
                    <div key={t.id} className={styles.feedItem}>
                      <div className={`${styles.feedDot} ${styles.muted}`} />
                      <div>
                        <p className={styles.feedText}>Задача: {t.title}</p>
                        <p className={styles.feedTime}>Status: New</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Philosophy Quote */}
          <section className={styles.quoteSection}>
            <div className={styles.quoteWrap}>
              <blockquote className={styles.quoteText}>
                &ldquo;Design is not just what it looks like and feels like. Design is how it works, and how it persists through time.&rdquo;
              </blockquote>
              <cite className={styles.quoteCite}>Studio Philosophy No. 04</cite>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
