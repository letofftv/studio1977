import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";
import { fixTypography } from "@/utils/typography";

export const metadata = {
  title: "Услуги — Студия 1977",
  description: "Маркетинговый аудит, стратегия, брендинг, digital, CRM, AI и event-продюсирование.",
};

const SERVICES = [
  {
    num: "01",
    id: "audit",
    title: "Маркетинговый аудит",
    desc: "Комплексная диагностика бизнеса: рынок, конкуренты, digital, репутация, точки роста.",
    tags: ["Аудит бренда", "Анализ конкурентов", "Аудит соцсетей", "Диагностика барьеров роста", "Аудит рекламы"],
  },
  {
    num: "02",
    id: "strategy",
    title: "Маркетинговая стратегия",
    desc: "Воронки привлечения, антикризисное планирование и стратегическое позиционирование.",
    tags: ["Стратегия бренда", "Воронки привлечения", "Антикризисный маркетинг", "Стратегия в соцсетях"],
  },
  {
    num: "03",
    id: "branding",
    title: "Брендинг и айдентика",
    desc: "Позиционирование, визуальный язык и подача, которая выделяет.",
    tags: ["Фирменный стиль", "Нейминг", "Брендбук", "Логотип", "Ребрендинг"],
  },
  {
    num: "04",
    id: "digital",
    title: "Digital-разработка",
    desc: "Лендинги, корпоративные сайты, web-app и интеграции.",
    tags: ["Лендинги", "Корпоративные сайты", "Web-app", "E-commerce", "Интеграции"],
  },
  {
    num: "05",
    id: "crm",
    title: "CRM и автоматизация",
    desc: "Внедрение Битрикс24, настройка воронок, автоматизация процессов.",
    tags: ["Внедрение CRM", "Настройка воронок", "Автоматизация", "Интеграции с CRM"],
  },
  {
    num: "06",
    id: "ai",
    title: "AI и боты",
    desc: "Telegram-боты, AI-ассистенты, RAG-системы и автоматизация коммуникаций.",
    tags: ["Чат-боты", "AI-агенты", "RAG-системы", "Голосовые ассистенты"],
  },
  {
    num: "07",
    id: "smm",
    title: "SMM и контент",
    desc: "Ведение соцсетей, контент-стратегия, Reels, фото и видеопродакшн.",
    tags: ["Контент-план", "Ведение соцсетей", "Reels и Stories", "Фото и видео"],
  },
  {
    num: "08",
    id: "events",
    title: "Event-продюсирование",
    desc: "Иммерсивные мероприятия: от концепции до реализации.",
    tags: ["Корпоративы", "Презентации", "Фестивали", "Деловые мероприятия"],
  },
  {
    num: "09",
    id: "production",
    title: "Продакшн",
    desc: "Фото, видео, монтаж и пост-продакшн высочайшего уровня.",
    tags: ["Видеосъёмка", "Фотосъёмка", "Монтаж", "Motion-дизайн"],
  },
  {
    num: "10",
    id: "pr",
    title: "PR и репутация",
    desc: "Работа с репутацией, публикации в СМИ, лидерство мнений.",
    tags: ["PR-кампании", "Публикации", "ORM", "Инфлюенс-маркетинг"],
  },
  {
    num: "11",
    id: "consulting",
    title: "Бизнес-консалтинг",
    desc: "Аналитика, unit-экономика, операционные процессы и масштабирование.",
    tags: ["Бизнес-аналитика", "Unit-экономика", "Операционка", "Масштабирование"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Наши компетенции</p>
            <h1 className={styles.heroTitle}>
              Создаём<br />
              <span className="bronze-text">исключительное.</span>
            </h1>
            <p className={styles.heroSub}>
              {fixTypography("Мультидисциплинарная практика на пересечении стратегии, дизайна и технологий.")}
            </p>
          </div>
        </section>

        <section className={styles.list}>
          <div className="container-wide">
            {SERVICES.map((service, i) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className={`${styles.serviceItem} ${i % 2 === 0 ? "bg-surface-low" : ""}`}
              >
                <div className={styles.serviceLeft}>
                  <span className={styles.serviceNum}>{service.num}</span>
                  <div>
                    <h2 className={styles.serviceTitle}>{fixTypography(service.title)}</h2>
                    <p className={styles.serviceDesc}>{fixTypography(service.desc)}</p>
                  </div>
                </div>
                <div className={styles.serviceTags}>
                  {service.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.quote}>
          <div className="container">
            <div className={styles.quoteInner}>
              <blockquote className={styles.quoteText}>
                &ldquo;Дизайн — это не декоративная оболочка. Это артикуляция смысла через материал и пустоту.&rdquo;
              </blockquote>
              <p className={styles.quoteSrc}>Студия 1977 — Архитектура бренда</p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container" style={{ textAlign: "center" }}>
            <h2 className={styles.ctaTitle}>Обсудим ваш<br />проект.</h2>
            <Link href="/brief" className="btn btn-primary">Заполнить бриф</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
