import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Link from "next/link";

const EXPERTISE = [
  { id: "audit", title: "Маркетинговый аудит", desc: "Комплексная диагностика бизнеса — рынок, конкуренты, digital, точки роста.", size: "sm" },
  { id: "strategy", title: "Стратегия", desc: "Маркетинговые стратегии, воронки привлечения и антикризисные планы.", size: "lg" },
  { id: "branding", title: "Брендинг", desc: "Позиционирование, смыслы и подача бренда.", size: "wide" },
  { id: "digital", title: "Digital", desc: "Лендинги, корпоративные сайты, web-app и интеграции.", size: "sm" },
  { id: "crm", title: "CRM и автоматизация", desc: "Внедрение Битрикс24, настройка воронок, автоматизация.", size: "sm" },
  { id: "ai", title: "AI и боты", desc: "Telegram-боты, AI-ассистенты и автоматизация коммуникаций.", size: "lg" },
];

const METHODOLOGY = [
  { num: "01", title: "Наблюдение", desc: "Изучаем бизнес, рынок и контекст. Находим то, что другие упускают." },
  { num: "02", title: "Дистилляция", desc: "Убираем лишнее. Оставляем суть, смысл и материальную правду." },
  { num: "03", title: "Реализация", desc: "Строим с точностью, используя проверенные подходы и технологии." },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ====== HERO ====== */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.heroLabel}>Креативное агентство полного цикла</p>
            <h1 className={styles.heroTitle}>
              Создаём проекты,<br />
              которые <span className="bronze-text">запоминаются</span>
            </h1>
            <p className={styles.heroSub}>
              Мы не просто строим — мы дистиллируем. Тихое движение в мире дизайна, маркетинга и продакшна.
            </p>
          </div>
          <div className={styles.heroScroll}>
            <div className={styles.scrollLine} />
            <span className={styles.scrollText}>Листайте</span>
          </div>
        </section>

        {/* ====== EXPERTISE (Bento Grid) ====== */}
        <section className={`${styles.expertise} bg-surface-low`}>
          <div className="container-wide">
            <div className={styles.expertiseHeader}>
              <h2 className="section-title">Экспертиза</h2>
              <p className="section-subtitle">
                Архитектура влияния. Мы работаем на пересечении реальности и цифрового присутствия.
              </p>
            </div>
            <div className={styles.bentoGrid}>
              {EXPERTISE.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className={`${styles.bentoCard} ${styles[`bento_${item.size}`]}`}
                >
                  <h3 className={styles.bentoTitle}>{item.title}</h3>
                  <p className={styles.bentoDesc}>{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ====== METHODOLOGY ====== */}
        <section className={`${styles.methodology} bg-surface-lowest`}>
          <div className="container">
            <h2 className={styles.methTitle}>Методология</h2>
            <div className={styles.methGrid}>
              {METHODOLOGY.map((step) => (
                <div key={step.num} className={styles.methStep}>
                  <span className={styles.methNum}>{step.num}</span>
                  <div>
                    <h3 className={styles.methStepTitle}>{step.title}</h3>
                    <p className={styles.methStepDesc}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PARTNER: Ai лайк iT ====== */}
        <section className={`${styles.partner} bg-surface-low`}>
          <div className="container">
            <div className={styles.partnerGrid}>
              <div className={styles.partnerInfo}>
                <p className="section-label">IT-партнёр</p>
                <h2 className={styles.partnerTitle}>Ai лайк iT</h2>
                <p className={styles.partnerDesc}>
                  Студия умных решений и ИИ-сотрудников. Чат-боты, голосовые ассистенты, RAG-системы, интеграции с CRM и автоматизация рутины.
                </p>
                <div className={styles.partnerActions}>
                  <Link href="/partners/ailikeit" className="btn btn-primary">Подробнее</Link>
                  <a href="https://ailikeit.ru" target="_blank" rel="noopener noreferrer" className="btn btn-outline">ailikeit.ru</a>
                </div>
              </div>
              <div className={styles.partnerVisual}>
                <div className={styles.partnerBadge}>
                  <span className={styles.partnerBadgeText}>Ai лайк iT</span>
                  <span className={styles.partnerBadgeSub}>Студия умных решений</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className={styles.cta}>
          <div className="container">
            <h2 className={styles.ctaTitle}>Обсудим<br />ваш проект.</h2>
            <p className={styles.ctaSub}>Расскажите о задаче — мы предложим решение и формат.</p>
            <div className={styles.ctaActions}>
              <Link href="/brief" className="btn btn-primary">Заполнить бриф</Link>
              <Link href="/contact" className="btn btn-outline">Связаться</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
