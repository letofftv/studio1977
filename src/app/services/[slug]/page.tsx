import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

const SERVICES_DATA: Record<string, {
  title: string; desc: string; icon: string;
  tasks: string[]; steps: string[]; results: string[];
}> = {
  marketing: {
    title: "Маркетинг",
    desc: "Стратегии продвижения, контент, перфоманс, аналитика и рост вашего бизнеса.",
    icon: "📊",
    tasks: ["Увеличение продаж", "Выход на новую аудиторию", "Построение системного маркетинга", "Повышение узнаваемости"],
    steps: ["Аудит текущей ситуации", "Разработка стратегии", "Запуск каналов", "Аналитика и оптимизация"],
    results: ["Рост лидов", "Снижение CAC", "Понятная unit-экономика", "Управляемый маркетинг"],
  },
  event: {
    title: "Event-продюсирование",
    desc: "Мероприятия любого формата — от камерных вечеров до масштабных фестивалей.",
    icon: "✨",
    tasks: ["Корпоративное мероприятие", "Фестиваль или конференция", "Презентация продукта", "Частное событие"],
    steps: ["Концепция и сценарий", "Площадка и техника", "Продакшн и логистика", "Проведение и покрытие"],
    results: ["Запоминающийся опыт", "Медийный контент", "Чёткая организация", "Wow-эффект"],
  },
  branding: {
    title: "Брендинг",
    desc: "Создание, ребрендинг и упаковка — от позиционирования до гайдлайна.",
    icon: "🎨",
    tasks: ["Запуск нового бренда", "Ребрендинг", "Разработка фирменного стиля", "Упаковка продукта"],
    steps: ["Исследование и стратегия", "Нейминг и позиционирование", "Визуальная система", "Гайдлайн и внедрение"],
    results: ["Уникальная идентичность", "Системный брендбук", "Узнаваемость", "Готовность к масштабированию"],
  },
  production: {
    title: "Production",
    desc: "Фото, видео, подкасты и визуальные истории для бренда.",
    icon: "🎬",
    tasks: ["Рекламный ролик", "Контент для соцсетей", "Фотосессия продукта", "Подкаст"],
    steps: ["Концепция и мудборд", "Планирование съёмки", "Продакшн", "Постпродакшн и delivery"],
    results: ["Премиальный визуал", "Контент-план на месяцы", "Единый стиль", "Готовые форматы"],
  },
  digital: {
    title: "Digital",
    desc: "Сайты, лендинги, web-приложения и цифровые продукты.",
    icon: "💻",
    tasks: ["Корпоративный сайт", "Лендинг", "Web-приложение", "Интеграция с CRM"],
    steps: ["Проектирование UX", "Дизайн UI", "Разработка", "Тестирование и запуск"],
    results: ["Быстрый и красивый сайт", "Конверсия в заявки", "Удобство для команды", "SEO-ready продукт"],
  },
  strategy: {
    title: "Стратегия и консалтинг",
    desc: "Исследования, аудиты, коммуникационные стратегии.",
    icon: "🧭",
    tasks: ["Аудит маркетинга", "Стратегия коммуникаций", "Конкурентный анализ", "CJM и исследования"],
    steps: ["Сбор данных", "Анализ и выводы", "Стратегия и план", "Реализация и контроль"],
    results: ["Понятный план действий", "Приоритеты", "Конкретные шаги", "Измеримые KPI"],
  },
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return (
      <>
        <Header />
        <main style={{ paddingTop: "calc(var(--header-h) + 4rem)", minHeight: "60vh" }}>
          <div className="container">
            <h1>Услуга не найдена</h1>
            <Link href="/services" className="btn btn-outline" style={{ marginTop: "1rem" }}>К услугам</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Услуга</p>
            <div className={styles.heroTop}>
              <span className={styles.icon}>{service.icon}</span>
              <h1 className={styles.title}>{service.title}</h1>
            </div>
            <p className={styles.lead}>{service.desc}</p>
          </div>
        </section>

        <section className={`section ${styles.tasks}`}>
          <div className="container">
            <div className={styles.columns}>
              <div>
                <p className="section-label">Задачи</p>
                <h2 className="section-title">Что решает</h2>
                <ul className={styles.list}>
                  {service.tasks.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <div>
                <p className="section-label">Результат</p>
                <h2 className="section-title">Что вы получите</h2>
                <ul className={styles.list}>
                  {service.results.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.stepsSection}`}>
          <div className="container">
            <p className="section-label">Процесс</p>
            <h2 className="section-title">Этапы работы</h2>
            <div className={styles.stepsGrid}>
              {service.steps.map((s, i) => (
                <div key={i} className={styles.step}>
                  <span className={styles.stepNum}>0{i + 1}</span>
                  <p>{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles.ctaSection}`}>
          <div className={`container ${styles.ctaInner}`}>
            <h2>Хотите обсудить {service.title.toLowerCase()}?</h2>
            <p>Заполните бриф — мы предложим решение и оценку.</p>
            <Link href="/brief" className="btn btn-primary">Заполнить бриф</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({ slug }));
}
