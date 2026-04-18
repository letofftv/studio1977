import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Команда — Студия 1977",
  description: "Познакомьтесь с командой Студии 1977 — людьми, которые стоят за каждым проектом.",
};

const TEAM = [
  {
    name: "Влад",
    role: "Фаундер & Креативный директор",
    bio: "Определяет вектор студии, отвечает за концепции и большие идеи. Видит картину целиком и собирает команду вокруг амбициозных задач.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop", // Placeholder, will be replaced by real images if available
  },
  {
    name: "Сергей",
    role: "Стратегия & Продюсирование",
    bio: "Строит стратегии, ведёт проекты от идеи до результата. Связывает бизнес-задачу клиента с креативным решением.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Таня",
    role: "Арт-дирекшн & Дизайн",
    bio: "Отвечает за визуальный уровень студии. Каждый проект — это продуманная эстетика, типографика и композиция.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Вика",
    role: "Управление проектами",
    bio: "Держит процессы в порядке, коммуницирует с клиентами и командой. Гарантирует, что всё идёт по плану и в срок.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Команда</p>
            <h1 className={styles.title}>
              The Human<br />
              <span className="bronze-text">Factor.</span>
            </h1>
            <p className={styles.lead}>
              За каждым проектом стоит проектная группа с характером, опытом и безупречным вкусом. Мы не просто исполнители, мы — ваши соавторы.
            </p>
          </div>
        </section>

        <section className={styles.gridSection}>
          <div className="container-wide">
            <div className={styles.teamGrid}>
              {TEAM.map((m) => (
                <div key={m.name} className={styles.memberCard}>
                  <div className={styles.imageWrap}>
                    <img
                      src={m.photo}
                      alt={m.name}
                      className={styles.photo}
                    />
                    <div className={styles.overlay} />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.top}>
                      <h2 className={styles.name}>{m.name}</h2>
                      <p className={styles.role}>{m.role}</p>
                    </div>
                    <p className={styles.bio}>{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.joinSection} bg-surface-low`}>
          <div className="container">
            <div className={styles.joinContent}>
              <h2 className="section-title">Присоединиться к нам</h2>
              <p className={styles.joinLead}>
                Мы всегда ищем талантливых специалистов, которые разделяют наши ценности и стремление к дистилляции смыслов.
              </p>
              <a href="/contact" className="btn btn-primary">Стать частью команды</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
