import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Услуги — Студия 1977",
  description: "Маркетинг, event, брендинг, production, digital, стратегия — полный спектр креативных услуг.",
};

const SERVICES = [
  {
    id: "audit",
    title: "Маркетинговый аудит",
    desc: "Комплексная диагностика бизнеса: рынок, конкуренты, digital, репутация, точки роста.",
    details: ["Аудит бренда", "Анализ конкурентов", "Аудит соцсетей", "Диагностика барьеров роста", "Аудит рекламы"],
    icon: "🔍",
  },
  {
    id: "strategy",
    title: "Стратегия и антикризис",
    desc: "Маркетинговые стратегии, антикризисные планы, воронки привлечения и удержания.",
    details: ["Маркетинговая стратегия", "Антикризис", "Стратегия роста", "Воронки", "Повторные продажи"],
    icon: "🧭",
  },
  {
    id: "branding",
    title: "Брендинг и упаковка",
    desc: "Позиционирование, ребрендинг, смыслы, подача и упаковка бренда под рост.",
    details: ["Позиционирование", "Ребрендинг", "Смыслы бренда", "Упаковка экспертности", "Франшиза"],
    icon: "🎨",
  },
  {
    id: "commercial",
    title: "Коммерческая упаковка",
    desc: "КП, офферы, презентации, тарифы и продуктовые линейки для продаж.",
    details: ["КП под заход", "Офферы", "Презентации", "Прайсы и пакеты", "Партнёрские предложения"],
    icon: "📋",
  },
  {
    id: "smm",
    title: "SMM и контент",
    desc: "Контент-стратегии, ведение соцсетей, Reels, Telegram, сценарии и рубрики.",
    details: ["Контент-стратегия", "Ведение соцсетей", "Reels и сторис", "Telegram и Дзен", "Экспертный контент"],
    icon: "📱",
  },
  {
    id: "digital",
    title: "Сайты и digital",
    desc: "Лендинги, корпоративные сайты, web-app, личные кабинеты, интеграции с CRM.",
    details: ["Лендинги", "Корпоративные сайты", "Web-app", "Личные кабинеты", "Интеграция с CRM"],
    icon: "💻",
  },
  {
    id: "crm",
    title: "CRM и автоматизация",
    desc: "Внедрение Битрикс24, настройка воронок, автоматизация задач и документооборота.",
    details: ["Внедрение Битрикс24", "Настройка воронок", "Автоматизация задач", "Интеграция с сайтом", "Документооборот"],
    icon: "⚙️",
  },
  {
    id: "ai",
    title: "AI и боты",
    desc: "Telegram-боты, AI-ассистенты, автоматизация коммуникаций, интеграция ИИ в процессы.",
    details: ["Telegram-боты", "AI-ассистенты", "Автоматизация на n8n", "Боты-консьержи", "AI-консалтинг"],
    icon: "🤖",
  },
  {
    id: "event",
    title: "Ивенты и спецпроекты",
    desc: "Концепции мероприятий, событийный маркетинг, digital-поддержка и продвижение.",
    details: ["Концепция", "Событийный маркетинг", "Digital-поддержка", "Партнёрская упаковка", "Продвижение"],
    icon: "✨",
  },
  {
    id: "production",
    title: "Контент-продакшн",
    desc: "Сценарии, видео, тексты для сайтов и презентаций, медийная упаковка бренда.",
    details: ["Сценарии видео", "Экспертные ролики", "Тексты для сайтов", "Рубрики и форматы", "Медийная упаковка"],
    icon: "🎬",
  },
  {
    id: "support",
    title: "Сопровождение",
    desc: "Ежемесячное маркетинговое и digital-сопровождение, поддержка CRM и аналитика.",
    details: ["Маркетинг на абонементе", "SMM-сопровождение", "Поддержка сайта", "Поддержка CRM", "Аналитика"],
    icon: "🔄",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Услуги</p>
            <h1 className={styles.title}>Что мы умеем</h1>
            <p className={styles.lead}>
              Полный спектр креативных и стратегических решений. Каждое направление — больше, чем услуга.
            </p>
          </div>
        </section>

        <section className={`section ${styles.list}`}>
          <div className="container">
            {SERVICES.map((s, i) => (
              <Link key={s.id} href={`/services/${s.id}`} className={styles.serviceRow}>
                <div className={styles.serviceLeft}>
                  <span className={styles.serviceIcon}>{s.icon}</span>
                  <div>
                    <h2 className={styles.serviceTitle}>{s.title}</h2>
                    <p className={styles.serviceDesc}>{s.desc}</p>
                  </div>
                </div>
                <div className={styles.serviceTags}>
                  {s.details.map((d) => (
                    <span key={d} className={styles.tag}>{d}</span>
                  ))}
                </div>
                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`section ${styles.ctaSection}`}>
          <div className={`container ${styles.ctaInner}`}>
            <h2>Не нашли нужную услугу?</h2>
            <p className={styles.ctaSub}>Опишите задачу — мы предложим формат и решение.</p>
            <Link href="/brief" className="btn btn-primary">Заполнить бриф</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
