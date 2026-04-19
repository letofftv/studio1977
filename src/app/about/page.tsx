import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Link from "next/link";
import { fixTypography } from "@/utils/typography";

export const metadata = {
  title: "О студии — Студия 1977",
  description: "Мы делаем маркетинг, цифровые решения, события, упаковку и автоматизацию для бизнеса.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>
              {fixTypography("1977: студия для проектов, которым нужен характер и порядок")}
            </h1>
            <p className={styles.lead}>
              {fixTypography("Мы делаем маркетинг, цифровые решения, события, упаковку и автоматизацию для бизнеса, который хочет выглядеть убедительно и работать спокойнее. Нам близки проекты с живой историей и осознанным желанием расти.")}
            </p>
          </div>
        </section>

        {/* Manifesto */}
        <section className={`section ${styles.manifesto}`}>
          <div className="container">
            <div className={styles.manifestoGrid}>
              <div className={styles.manifestoContent}>
                <p className="section-label">Манифест</p>
                <h2 className="section-title">Почему 1977</h2>
                <p className={styles.text}>
                  {fixTypography("1977 для нас не просто число. Это ощущение времени, когда многое менялось: музыка становилась резче, визуальный язык смелее, культура свободнее, а привычные формы начинали трещать по швам.")}
                </p>
                <p className={styles.text}>
                  {fixTypography("Мы берём из этой энергии не шум ради шума, а способность смотреть иначе. Не бояться пересобрать старое. Не делать «как принято», если это уже не работает. Не превращать бренд в стерильную презентацию, где всё красиво, но ничего не чувствуется.")}
                </p>
                <p className={styles.text}>
                  {fixTypography("1977 для нас про характер, честность и движение. Про проекты, у которых есть лицо. Про бизнес, который можно упаковать современно, но без потери живого смысла.")}
                </p>
              </div>
              <div className={styles.manifestoVisual}>
                <div className={styles.yearBig}>1977</div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className={`section ${styles.whoWeAre} bg-surface-low`}>
          <div className="container text-center">
            <h2 className="section-title">{fixTypography("Мы не классическое агентство с витриной одинаковых услуг")}</h2>
            <p className={styles.whoLead}>
              {fixTypography("Студия 1977 работает как гибкая команда. Под задачу собирается нужная связка людей и инструментов: стратегия, тексты, дизайн, сайт, CRM, ИИ, события и производство.")}
            </p>
            <p className={styles.whoText}>
              {fixTypography("Мы не продаём всё подряд. Мы смотрим, что действительно поможет в конкретной ситуации. Иногда это полная перепаковка, а иногда — просто навести порядок в процессах.")}
            </p>
          </div>
        </section>

        {/* Approach */}
        <section className={`section ${styles.approach}`}>
          <div className="container">
            <p className="section-label">Метод</p>
            <h2 className="section-title">Наш подход</h2>
            <div className={styles.approachGrid}>
              <div className={styles.approachStep}>
                <span className={styles.stepNum}>01</span>
                <div>
                  <h3 className={styles.stepTitle}>Сначала смысл</h3>
                  <p className={styles.stepDesc}>{fixTypography("Без смысла любой дизайн быстро превращается в декор. Мы выясняем, что за продукт и почему клиент должен выбрать именно его.")}</p>
                </div>
              </div>
              <div className={styles.approachStep}>
                <span className={styles.stepNum}>02</span>
                <div>
                  <h3 className={styles.stepTitle}>Потом структура</h3>
                  <p className={styles.stepDesc}>{fixTypography("Разкладываем проект на составляющие: сайт, воронка, CRM, сценарии и роли команды. Хорошая структура снижает хаос.")}</p>
                </div>
              </div>
              <div className={styles.approachStep}>
                <span className={styles.stepNum}>03</span>
                <div>
                  <h3 className={styles.stepTitle}>Потом форма</h3>
                  <p className={styles.stepDesc}>{fixTypography("Дизайн, тексты и мероприятия должны работать на одну идею. Красиво, но не пусто. Ярко, но не мимо задачи.")}</p>
                </div>
              </div>
              <div className={styles.approachStep}>
                <span className={styles.stepNum}>04</span>
                <div>
                  <h3 className={styles.stepTitle}>Потом внедрение</h3>
                  <p className={styles.stepDesc}>{fixTypography("Проект готов не тогда, когда файл отправлен, а когда ваша команда понимает, как этим пользоваться в работе.")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className={`section ${styles.principles} bg-surface-low`}>
          <div className="container">
            <h2 className="section-title">Принципы</h2>
            <div className={styles.principlesGrid}>
              <div className={styles.principleCard}>
                <h3>Авторский подход</h3>
                <p>{fixTypography("Мы не любим шаблонные решения. У каждого бизнеса свой контекст: люди, рынок, регион и амбиции.")}</p>
              </div>
              <div className={styles.principleCard}>
                <h3>Честный разбор</h3>
                <p>{fixTypography("Если проблема не в логотипе, мы так и скажем. Нам важнее рабочее решение, чем раздутый чек.")}</p>
              </div>
              <div className={styles.principleCard}>
                <h3>Практическая польза</h3>
                <p>{fixTypography("Итог работы можно использовать сразу: отправить клиенту, запустить в рекламу или встроить в CRM.")}</p>
              </div>
              <div className={styles.principleCard}>
                <h3>Команда как продукт</h3>
                <p>{fixTypography("Результат рождается на стыке стратегии, дизайна, технологии и организации.")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`section ${styles.cta}`}>
          <div className="container text-center">
            <h2 className="section-title">{fixTypography("Мы за проекты, которые можно объяснить простыми словами")}</h2>
            <p className={styles.lead} style={{ maxWidth: "700px", margin: "1.5rem auto" }}>
              {fixTypography("Если бизнес невозможно понятно объяснить, его сложно продавать. Мы поможем собрать форму, в которой ваш ответ начнет работать.")}
            </p>
            <Link href="/brief" className="btn btn-primary">
              Обсудить задачу
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
