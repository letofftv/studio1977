import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

const CASES_DATA: Record<string, {
  title: string; category: string; year: string; color: string;
  context: string; task: string; solution: string; result: string;
}> = {
  "atlas-festival": {
    title: "Atlas Festival 2024", category: "Event · Производство", year: "2024", color: "#c8a45a",
    context: "Крупный музыкальный фестиваль с аудиторией 15 000+ человек. Продюсирование полного цикла.",
    task: "Организовать фестиваль с нуля: от концепции до проведения, включая техническое продюсирование и контент-покрытие.",
    solution: "Разработали концепцию, подобрали площадку, собрали техническую команду, запустили маркетинг и обеспечили полное медиа-покрытие.",
    result: "15 000+ посетителей, 200+ единиц контента, 0 инцидентов, NPS 92.",
  },
  "nova-brand": {
    title: "Nova — запуск бренда", category: "Брендинг · Маркетинг", year: "2024", color: "#7b68ee",
    context: "Стартап в сфере wellness. Требовался полный запуск бренда на рынок.",
    task: "Создать бренд от нейминга до визуальной системы и стратегии выхода на рынок.",
    solution: "Исследование аудитории, нейминг, айдентика, брендбук, стратегия коммуникаций и запуск каналов.",
    result: "Узнаваемый бренд с первого дня, 500+ заявок за первый месяц.",
  },
  "echo-digital": {
    title: "Echo Digital Platform", category: "Цифровые решения · Стратегия", year: "2023", color: "#4ecdc4",
    context: "B2B-платформа для управления поставками. Нужен был полный редизайн и перезапуск.",
    task: "Переосмыслить UX, обновить интерфейс и повысить конверсию.",
    solution: "UX-исследование, новый дизайн-система, разработка на React, интеграция с CRM клиента.",
    result: "Конверсия +47%, время на задачу −35%, NPS платформы 88.",
  },
  "rhythm-event": {
    title: "Rhythm Night Series", category: "Event · Маркетинг", year: "2023", color: "#ff6b6b",
    context: "Серия камерных вечеров для премиум-аудитории.",
    task: "Создать серию ежемесячных мероприятий с сильной эстетикой и лояльной аудиторией.",
    solution: "Концепция, кураторская программа, визуальная айдентика серии, партнёрская программа.",
    result: "12 мероприятий за год, sold-out каждого, рост community на 3000+.",
  },
  "forma-rebrand": {
    title: "Forma — ребрендинг", category: "Брендинг · Цифровые решения", year: "2023", color: "#f7b267",
    context: "Архитектурная студия с 10-летней историей. Устаревший визуальный язык.",
    task: "Провести ребрендинг, сохранив наследие бренда.",
    solution: "Аудит бренда, обновлённое позиционирование, новая визуальная система, редизайн сайта.",
    result: "Современный бренд, +60% трафика на сайте, положительные отзывы клиентов.",
  },
  "pulse-content": {
    title: "Pulse Content Strategy", category: "Маркетинг · Производство", year: "2022", color: "#a8e6cf",
    context: "Финтех-компания без системного контент-маркетинга.",
    task: "Построить контентную стратегию и обеспечить регулярное производство.",
    solution: "Контент-стратегия, редакционный план, продакшн фото/видео, запуск блога и подкаста.",
    result: "Рост органического трафика x3 за 6 месяцев, 50+ единиц контента в месяц.",
  },
};

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseData = CASES_DATA[slug];

  if (!caseData) {
    return (
      <>
        <Header />
        <main style={{ paddingTop: "calc(var(--header-h) + 4rem)", minHeight: "60vh" }}>
          <div className="container">
            <h1>Кейс не найден</h1>
            <Link href="/cases" className="btn btn-outline" style={{ marginTop: "1rem" }}>К кейсам</Link>
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
        <section className={styles.hero} style={{ background: `linear-gradient(135deg, ${caseData.color}11, var(--color-bg))` }}>
          <div className="container">
            <Link href="/cases" className={styles.back}>← Все кейсы</Link>
            <span className={styles.category}>{caseData.category}</span>
            <h1 className={styles.title}>{caseData.title}</h1>
            <span className={styles.year}>{caseData.year}</span>
          </div>
        </section>

        <section className={styles.cover}>
          <div className="container">
            <div className={styles.coverImage} style={{ background: `linear-gradient(135deg, ${caseData.color}18, ${caseData.color}06)` }}>
              <span className={styles.coverLetter} style={{ color: caseData.color }}>{caseData.title.charAt(0)}</span>
            </div>
          </div>
        </section>

        <section className={`section ${styles.details}`}>
          <div className="container">
            <div className={styles.detailsGrid}>
              <div className={styles.block}>
                <h3 className={styles.blockLabel}>Контекст</h3>
                <p>{caseData.context}</p>
              </div>
              <div className={styles.block}>
                <h3 className={styles.blockLabel}>Задача</h3>
                <p>{caseData.task}</p>
              </div>
              <div className={styles.block}>
                <h3 className={styles.blockLabel}>Решение</h3>
                <p>{caseData.solution}</p>
              </div>
              <div className={styles.block}>
                <h3 className={styles.blockLabel}>Результат</h3>
                <p>{caseData.result}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.ctaSection}`}>
          <div className={`container ${styles.ctaInner}`}>
            <h2>Хотите похожий проект?</h2>
            <p>Расскажите о задаче — мы предложим решение.</p>
            <Link href="/brief" className="btn btn-primary">Обсудить проект</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(CASES_DATA).map((slug) => ({ slug }));
}
