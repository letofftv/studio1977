import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

const SERVICES_DATA: Record<string, {
  title: string; desc: string; icon: string;
  tasks: string[]; steps: string[]; results: string[];
}> = {
  audit: {
    title: "Маркетинговый аудит",
    desc: "Находим, где бизнес теряет внимание, доверие и заявки. Даём понятную карту роста.",
    icon: "🔍",
    tasks: ["Аудит текущего маркетинга", "Анализ конкурентной среды", "Поиск барьеров в воронке", "Проверка упаковки смыслов"],
    steps: ["Сбор данных и артефактов", "Глубинное интервью с командой", "Анализ рынка и конкурентов", "Подготовка карты роста"],
    results: ["Понятный список проблем", "Приоритетные точки роста", "Рекомендации по упаковке", "План первых шагов"],
  },
  branding: {
    title: "Брендинг и упаковка",
    desc: "Делаем бренд понятным, живым и пригодным для продаж. Смыслы, позиционирование и визуал.",
    icon: "🎨",
    tasks: ["Разработка позиционирования", "Создание визуальной системы", "Упаковка смыслов бренда", "Подготовка к продажам"],
    steps: ["Проработка метафоры бренда", "Дизайн визуальных констант", "Верстка носителей стиля", "Создание гайдбука"],
    results: ["Уникальное лицо бренда", "Системный брендбук", "Готовые материалы для работы", "Узнаваемость на рынке"],
  },
  digital: {
    title: "Сайты и digital",
    desc: "Сайт как инструмент продаж: логика, дизайн и техническая реализация.",
    icon: "💻",
    tasks: ["Корпоративные сайты", "Конверсионные лендинги", "Личные кабинеты", "Web-интерфейсы"],
    steps: ["Проектирование логики (UX)", "Дизайн интерфейса (UI)", "Верстка и разработка", "Настройка аналитики"],
    results: ["Быстрый и удобный продукт", "Рост конверсии в заявку", "Автоматизация сбора данных", "SEO-оптимизированный сайт"],
  },
  crm: {
    title: "CRM и автоматизация",
    desc: "Наводим порядок в продажах, задачах и коммуникации. Внедрение Битрикс24.",
    icon: "📈",
    tasks: ["Настройка воронок продаж", "Автоматизация рутины", "Контроль выполнения задач", "Интеграция с каналами связи"],
    steps: ["Аудит текущих процессов", "Проектирование структуры CRM", "Техническая настройка и роботы", "Обучение команды"],
    results: ["Прозрачность в продажах", "Ни одной потерянной заявки", "Автоматические отчеты", "Порядок в документах"],
  },
  strategy: {
    title: "Стратегия и антикризис",
    desc: "Когда нужен не шум, а трезвый план выхода из просадки. Перепаковка и фокус.",
    icon: "🧭",
    tasks: ["Выход из маркетинговой ямы", "Поиск новых каналов роста", "Перепаковка продукта", "Стратегический консалтинг"],
    steps: ["Диагностика текущего кризиса", "Пересборка модели продукта", "Разработка новой стратегии", "Сопровождение внедрения"],
    results: ["Четкий план действий", "Фокус на главном", "Снижение хаотичных трат", "Новая точка старта"],
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
            <p>Возможно, проект перемещен или находится в разработке.</p>
            <Link href="/services" className="btn btn-outline" style={{ marginTop: "1rem" }}>К направлениям</Link>
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
            <p className="section-label">Направление</p>
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
                <h2 className="section-title">Что решаем</h2>
                <ul className={styles.list}>
                  {service.tasks.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <div>
                <p className="section-label">Результат</p>
                <h2 className="section-title">Итог работы</h2>
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
            <h2 className="section-title">Как это происходит</h2>
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
            <p>Заполните бриф — мы предложим системное решение и понятную стоимость.</p>
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
