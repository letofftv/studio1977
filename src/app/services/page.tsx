import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Направления работы — Studio 1977",
  description: "Маркетинговый аудит, брендинг, сайты, CRM, лайк IT и антикризисная стратегия для бизнеса.",
};

const SERVICES = [
  {
    num: "01",
    id: "audit",
    title: "Маркетинговый аудит",
    desc: "Находим, где бизнес теряет внимание, доверие и заявки. Даём понятную карту роста.",
    tags: ["Аудит бренда", "Анализ конкурентов", "Точки касания", "Диагностика воронки"],
  },
  {
    num: "02",
    id: "branding",
    title: "Брендинг и упаковка",
    desc: "Делаем бренд понятным, живым и пригодным для продаж. Смыслы и визуальная система.",
    tags: ["Позиционирование", "Tone of Voice", "Фирменный стиль", "Упаковка смыслов"],
  },
  {
    num: "03",
    id: "digital",
    title: "Сайты и digital",
    desc: "Проектируем лендинги и кабинеты с учётом логики клиента и интеграций.",
    tags: ["Лендинги", "Корпоративные сайты", "Web-app", "Личные кабинеты"],
  },
  {
    num: "04",
    id: "crm",
    title: "CRM и автоматизация",
    desc: "Наводим порядок в продажах и задачах. Внедрение Битрикс24 под реальные процессы.",
    tags: ["Внедрение CRM", "Настройка воронок", "Автоматизация", "Контроль сроков"],
  },
  {
    num: "05",
    id: "like-it",
    title: "лайк IT",
    desc: "ИИ-ассистенты, боты и автоматизация рутины без магического тумана.",
    tags: ["Чат-боты", "AI-агенты", "RAG-системы", "Интеграции"],
  },
  {
    num: "06",
    id: "strategy",
    title: "Стратегия и антикризис",
    desc: "Трезвый план выхода из просадки. Разбираем продукт и пересобираем коммуникацию.",
    tags: ["Разбор продукта", "Антикризис", "План действий", "Перезапуск"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Компетенции</p>
            <h1 className={styles.heroTitle}>
              Собираем не отдельные куски,<br />
              а <span className="bronze-text">внятную систему.</span>
            </h1>
            <p className={styles.heroSub}>
              Мультидисциплинарный подход: от аудита смыслов до внедрения ИИ-инструментов и CRM.
            </p>
          </div>
        </section>

        <section className={styles.list}>
          <div className="container-wide">
            {SERVICES.map((service, i) => (
              <Link
                key={service.id}
                href={service.id === "like-it" ? "/partners/like-it" : `/services/${service.id}`}
                className={`${styles.serviceItem} ${i % 2 === 0 ? "bg-surface-low" : ""}`}
              >
                <div className={styles.serviceLeft}>
                  <span className={styles.serviceNum}>{service.num}</span>
                  <div>
                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                    <p className={styles.serviceDesc}>{service.desc}</p>
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

        <section className={styles.cta}>
          <div className="container" style={{ textAlign: "center" }}>
            <h2 className={styles.ctaTitle}>Есть задача?<br />Обсудим её.</h2>
            <Link href="/brief" className="btn btn-primary">Заполнить бриф</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
