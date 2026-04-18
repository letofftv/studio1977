import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "О студии — Студия 1977",
  description: "Философия, история и принципы работы креативного агентства Студия 1977.",
};

const PRINCIPLES = [
  { title: "Авторский подход", desc: "Каждый проект — уникальная история, а не шаблон." },
  { title: "Прозрачный процесс", desc: "Клиент всегда знает, что происходит и что будет дальше." },
  { title: "Результат как мерило", desc: "Мы оцениваем работу по реальному результату, а не по количеству слайдов." },
  { title: "Команда = продукт", desc: "Мы инвестируем в людей, потому что сильный проект делают сильные люди." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">О студии</p>
            <h1 className={styles.title}>
              Мы — <span className="text-accent">Студия 1977</span>
            </h1>
            <p className={styles.lead}>
              Креативное агентство полного цикла. Мы не просто делаем проекты — мы создаём
              опыт, который двигает бренды вперёд.
            </p>
          </div>
        </section>

        {/* Manifesto */}
        <section className={`section ${styles.manifesto}`}>
          <div className="container">
            <div className={styles.manifestoGrid}>
              <div>
                <p className="section-label">Манифест</p>
                <h2 className="section-title">Почему 1977?</h2>
              </div>
              <div className={styles.manifestoText}>
                <p>
                  1977 — это не дата основания. Это символ. Год, когда всё самое интересное
                  только начиналось: панк, новая волна кинематографа, дерзость в дизайне.
                </p>
                <p>
                  Мы взяли этот дух — создавать что-то настоящее, нешаблонное, с характером.
                  Студия работает на стыке маркетинга, event-индустрии, брендинга и digital.
                  Мы не разделяем эти дисциплины — мы соединяем их в целостный продукт для клиента.
                </p>
                <p>
                  Наш подход: думать стратегически, делать красиво, закрывать результатом.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className={`section ${styles.principles}`}>
          <div className="container">
            <p className="section-label">Принципы</p>
            <h2 className="section-title">Как мы устроены</h2>
            <div className={styles.principleGrid}>
              {PRINCIPLES.map((p, i) => (
                <div key={i} className={`card ${styles.principleCard}`}>
                  <span className={styles.principleNum}>0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`section ${styles.ctaSection}`}>
          <div className={`container ${styles.ctaInner}`}>
            <h2 className={styles.ctaTitle}>Хотите узнать нас лучше?</h2>
            <p className={styles.ctaSub}>Запишитесь на знакомство — расскажем, как устроена наша работа.</p>
            <a href="/contact" className="btn btn-primary">Связаться</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
