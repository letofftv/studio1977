import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "О Студии 1977: студия маркетинга, digital и событий",
  description: "1977 объединяет стратегию, брендинг, сайты, CRM, ИИ-инструменты, события и продакшн, чтобы помогать бизнесу выглядеть сильнее и работать понятнее.",
};

const PRINCIPLES = [
  { title: "Авторский подход", desc: "Даже если задача типовая, бизнес всегда имеет свой контекст: люди, рынок, ограничения." },
  { title: "Честный разбор", desc: "Если проблема не в логотипе, мы так и скажем. Нам важнее рабочее решение, чем раздутый чек." },
  { title: "Практическая польза", desc: "Итог работы должен быть пригоден к использованию: в рекламе, в CRM или в переговорах." },
  { title: "Команда как продукт", desc: "Сильный проект появляется там, где стратегия, дизайн и технология работают вместе." },
];

const APPROACH = [
  { step: "1", title: "Сначала смысл", desc: "Без смысла любой дизайн быстро превращается в декор. Мы выясняем всё о силе вашего продукта." },
  { step: "2", title: "Потом структура", desc: "Разбиваем смысл на инструменты: сайт, воронка, CRM, сценарии и роли команды." },
  { step: "3", title: "Потом форма", desc: "Дизайн, тексты и интерфейс работают на одну идею. Красиво, но не пусто." },
  { step: "4", title: "Потом внедрение", desc: "Проект готов не когда файл отправлен, а когда команда понимает, как этим пользоваться." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>1977: студия для проектов, которым нужен характер и порядок</h1>
            <p className={styles.lead}>
              Мы делаем маркетинг, digital, события и автоматизацию для бизнеса, который хочет выглядеть убедительно и работать спокойнее.
            </p>
          </div>
        </section>

        {/* Manifesto */}
        <section className={`section ${styles.manifesto}`}>
          <div className="container">
            <div className={styles.manifestoInner}>
              <h2 className={styles.manifestoTitle}>Почему 1977</h2>
              <div className={styles.manifestoText}>
                <p>
                  1977 для нас не просто число. Это ощущение времени, когда многое менялось: музыка становилась резче, визуальный язык смелее, культура свободнее.
                </p>
                <p>
                  Мы берём из этой энергии способность смотреть иначе. Не бояться пересобрать старое. Не делать “как принято”, если это уже не работает. 1977 для нас про характер, честность и движение. Про проекты, у которых есть лицо.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className={`section ${styles.approach} bg-surface-low`}>
          <div className="container">
            <h2 className="section-title">Наш подход</h2>
            <div className={styles.approachGrid}>
              {APPROACH.map((a) => (
                <div key={a.step} className={styles.approachItem}>
                  <span className={styles.approachStep}>{a.step}</span>
                  <h3 className={styles.approachTitle}>{a.title}</h3>
                  <p className={styles.approachDesc}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className={`section ${styles.principles}`}>
          <div className="container">
            <h2 className="section-title">Принципы</h2>
            <div className={styles.principlesGrid}>
              {PRINCIPLES.map((p) => (
                <div key={p.title} className={styles.principleCard}>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Block */}
        <section className={`section ${styles.final}`}>
          <div className="container">
            <div className={styles.finalBox}>
              <h2>Мы за проекты, которые можно объяснить простыми словами</h2>
              <p>
                Если бизнес невозможно понятно объяснить, его сложно продавать. Наша работа начинается с вопроса: что вы делаете, для кого и почему это важно? А дальше мы собираем форму, в которой этот ответ начинает работать.
              </p>
              <button className="btn btn-primary" style={{ marginTop: "32px" }}>Обсудить задачу</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
