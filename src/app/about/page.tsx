import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "О студии — Студия 1977",
  description: "Мы не создаём шум. Мы курируем присутствие.",
};

const PROCESS = [
  { num: "01", title: "Глубокое погружение", desc: "Извлекаем суть бренда, убирая поверхностные желания и находя монолитную правду." },
  { num: "02", title: "Тональное картирование", desc: "Определяем палитру атмосферы, материала и веса." },
  { num: "03", title: "Архитектурная сборка", desc: "Строим цифровую структуру с архитектурной точностью." },
  { num: "04", title: "Раскрытие", desc: "Кованая цифровая реальность с бескомпромиссной точностью." },
];

const VALUES = [
  { title: "Вечное над трендовым", desc: "Мы проектируем на десятилетие, а не на сезон." },
  { title: "Абсолютная точность", desc: "Точность — наша эмпатия. Каждый пиксель, каждый материал осознан." },
  { title: "Невидимый интерфейс", desc: "Лучший дизайн ощущается, не замечается." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>
              The Silent<br /> Curator.
            </h1>
            <p className={styles.heroSub}>
              Мы не создаем шум. Мы курируем присутствие. Студия 1977 — пространство для архитектурной идентичности.
            </p>
          </div>
        </section>

        {/* Manifesto */}
        <section className={`${styles.manifesto} bg-surface-low`}>
          <div className="container">
            <div className={styles.manifGrid}>
              <div>
                <p className="section-label">Манифест</p>
                <blockquote className={styles.manifQuote}>
                  &ldquo;Дизайн — это искусство знать, что убрать. Мы строим монументы сдержанности в эпоху цифрового шума.&rdquo;
                </blockquote>
              </div>
              <div>
                <p className={styles.manifText}>
                  В Студии 1977 мы верим, что роскошь обнаруживается в пустоте — в пространстве между линиями. Наша философия The Silent Curator диктует: каждый пиксель, каждый выбор материала, каждая тень должны оправдать своё существование.
                </p>
                <p className={styles.manifText}>
                  Мы отвергаем эфемерные тренды рынка. Мы преследуем атмосферный обсидиан вечного мастерства.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className={styles.process}>
          <div className="container">
            <p className="section-label">Процесс 1977</p>
            <div className={styles.processGrid}>
              {PROCESS.map((step) => (
                <div key={step.num} className={styles.processCard}>
                  <span className={styles.processNum}>{step.num}</span>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={`${styles.values} bg-surface-low`}>
          <div className="container">
            <h2 className="section-title">Наша позиция</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valuesList}>
                {VALUES.map((v) => (
                  <div key={v.title} className={styles.valueItem}>
                    <h3 className={styles.valueTitle}>{v.title}</h3>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                ))}
              </div>
              <div className={styles.valuesCta}>
                <div className={styles.valuesCtaInner}>
                  <h3 className={styles.valuesCtaTitle}>Присоединяйтесь</h3>
                  <p className={styles.valuesCtaText}>Ищем партнёрства с теми, кто ценит вес тишины.</p>
                  <a href="/contact" className="btn btn-primary">Связаться</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
