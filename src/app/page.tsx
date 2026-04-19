import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

const IconAudit = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const IconBranding = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

const IconDigital = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
  </svg>
);

const IconCRM = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconAI = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
  </svg>
);

const IconStrategy = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);

const SERVICES = [
  {
    id: "audit",
    title: "Маркетинговый аудит",
    desc: "Комплексная диагностика бизнеса: рынок, конкуренты, digital, репутация и точки роста.",
    icon: <IconAudit />,
  },
  {
    id: "branding",
    title: "Брендинг и упаковка",
    desc: "Позиционирование, ребрендинг, смыслы и подача бренда для роста доверия.",
    icon: <IconBranding />,
  },
  {
    id: "digital",
    title: "Сайты и digital",
    desc: "Лендинги, корпоративные сайты, web-app, личные кабинеты и интеграции.",
    icon: <IconDigital />,
  },
  {
    id: "crm",
    title: "CRM и автоматизация",
    desc: "Внедрение Битрикс24, настройка воронок, автоматизация задач и продаж.",
    icon: <IconCRM />,
  },
  {
    id: "ai",
    title: "AI и боты",
    desc: "Telegram-боты, AI-ассистенты, автоматизация коммуникаций и интеграция ИИ.",
    icon: <IconAI />,
  },
  {
    id: "strategy",
    title: "Стратегия и антикризис",
    desc: "Маркетинговые стратегии, антикризисные планы и воронки привлечения.",
    icon: <IconStrategy />,
  },
];

const CASES = [
  {
    slug: "atlas-festival",
    title: "Atlas Festival 2024",
    category: "Event · Production",
    image: null,
  },
  {
    slug: "nova-brand",
    title: "Nova — запуск бренда",
    category: "Брендинг · Маркетинг",
    image: null,
  },
  {
    slug: "echo-digital",
    title: "Echo Digital Platform",
    category: "Digital · Стратегия",
    image: null,
  },
];

const TEAM = [
  { name: "Влад", role: "Фаундер & Креативный директор", photo: "/images/team/vlad.png" },
  { name: "Сергей", role: "Стратегия & Продюсирование", photo: "/images/team/sergey.png" },
  { name: "Таня", role: "Арт-дирекшн & Дизайн", photo: "/images/team/tanya.png" },
  { name: "Вика", role: "Управление проектами", photo: "/images/team/vika.png" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Знакомство", desc: "Обсуждаем задачу, изучаем контекст, формируем понимание." },
  { num: "02", title: "Стратегия", desc: "Разрабатываем подход, собираем бриф, определяем формат." },
  { num: "03", title: "Реализация", desc: "Работаем в прозрачном процессе с контролем этапов." },
  { num: "04", title: "Результат", desc: "Сдаём проект и обеспечиваем сопровождение." },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ====== HERO ====== */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <div className={styles.heroOrb1} />
            <div className={styles.heroOrb2} />
            <div className={styles.heroGrid} />
          </div>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.heroLabel}>Креативное агентство полного цикла</p>
            <h1 className={styles.heroTitle}>
              Создаём проекты,
              <br />
              которые <span className="text-accent">запоминаются</span>
            </h1>
            <p className={styles.heroSub}>
              Маркетинг · Event · Брендинг · Production · Digital
            </p>
            <div className={styles.heroCta}>
              <Link href="/brief" className="btn btn-primary">
                Обсудить проект
              </Link>
              <Link href="/cases" className="btn btn-outline">
                Смотреть кейсы
              </Link>
            </div>
          </div>
        </section>

        {/* ====== SERVICES ====== */}
        <section className={`section ${styles.services}`} id="services">
          <div className="container">
            <p className="section-label">Направления</p>
            <h2 className="section-title">Чем мы занимаемся</h2>
            <p className="section-subtitle">
              Полный спектр креативных и стратегических услуг для бизнеса, брендов и продуктов.
            </p>
            <div className={`${styles.serviceGrid} stagger`}>
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className={`card ${styles.serviceCard} animate-fade-up`}
                >
                  <span className={styles.serviceIcon}>{s.icon}</span>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                  <span className={styles.serviceArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CASES ====== */}
        <section className={`section ${styles.cases}`} id="cases">
          <div className="container">
            <div className={styles.casesHeader}>
              <div>
                <p className="section-label">Портфолио</p>
                <h2 className="section-title">Избранные кейсы</h2>
              </div>
              <Link href="/cases" className="btn btn-outline">
                Все проекты
              </Link>
            </div>
            <div className={styles.casesGrid}>
              {CASES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cases/${c.slug}`}
                  className={styles.caseCard}
                >
                  <div className={styles.caseImage}>
                    <div className={styles.casePlaceholder}>
                      <span>{c.title.charAt(0)}</span>
                    </div>
                  </div>
                  <div className={styles.caseMeta}>
                    <span className={styles.caseCategory}>{c.category}</span>
                    <h3 className={styles.caseTitle}>{c.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROCESS ====== */}
        <section className={`section ${styles.process}`} id="process">
          <div className="container">
            <p className="section-label">Подход</p>
            <h2 className="section-title">Как мы работаем</h2>
            <p className="section-subtitle">
              Прозрачный и управляемый процесс, выстроенный вокруг вашего результата.
            </p>
            <div className={styles.processGrid}>
              {PROCESS_STEPS.map((s) => (
                <div key={s.num} className={styles.processStep}>
                  <span className={styles.processNum}>{s.num}</span>
                  <h3 className={styles.processTitle}>{s.title}</h3>
                  <p className={styles.processDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== TEAM ====== */}
        <section className={`section ${styles.team}`} id="team">
          <div className="container">
            <p className="section-label">Команда</p>
            <h2 className="section-title">Лица проекта</h2>
            <div className={styles.teamGrid}>
              {TEAM.map((t) => (
                <div key={t.name} className={styles.teamCard}>
                  <div className={styles.teamPhoto}>
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={400}
                      height={400}
                      className={styles.teamImg}
                    />
                  </div>
                  <h3 className={styles.teamName}>{t.name}</h3>
                  <p className={styles.teamRole}>{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className={`section ${styles.cta}`}>
          <div className={styles.ctaBg}>
            <div className={styles.ctaOrb} />
          </div>
          <div className={`container ${styles.ctaInner}`}>
            <h2 className={styles.ctaTitle}>
              Готовы обсудить
              <br />
              ваш проект?
            </h2>
            <p className={styles.ctaSub}>
              Расскажите нам о задаче — мы предложим решение и формат сотрудничества.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/brief" className="btn btn-primary">
                Заполнить бриф
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Связаться с нами
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
