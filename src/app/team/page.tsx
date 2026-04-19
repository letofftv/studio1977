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
    role: "Основатель и креативный директор",
    bio: "Определяет вектор студии, отвечает за концепции и большие идеи. Видит картину целиком и собирает команду вокруг амбициозных задач.",
    photo: "/images/team/vlad.png",
  },
  {
    name: "Сергей",
    role: "Стратегия и продюсирование",
    bio: "Строит стратегии, ведёт проекты от идеи до результата. Связывает бизнес-задачу клиента с креативным решением.",
    photo: "/images/team/sergey.png",
  },
  {
    name: "Таня",
    role: "Арт-направление и дизайн",
    bio: "Отвечает за визуальный уровень студии. Каждый проект — это продуманная эстетика, типографика и композиция.",
    photo: "/images/team/tanya.png",
  },
  {
    name: "Вика",
    role: "Управление проектами",
    bio: "Держит процессы в порядке, коммуницирует с клиентами и командой. Гарантирует, что всё идёт по плану и в срок.",
    photo: "/images/team/vika.png",
  },
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Команда</p>
            <h1 className={styles.title}>Люди, которые делают</h1>
            <p className={styles.lead}>
              За каждым проектом стоит команда с характером, опытом и вкусом.
            </p>
          </div>
        </section>

        <section className={`section ${styles.grid}`}>
          <div className="container">
            <div className={styles.teamGrid}>
              {TEAM.map((m) => (
                <article key={m.name} className={styles.member}>
                  <div className={styles.photoWrap}>
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={600}
                      height={600}
                      className={styles.photo}
                    />
                    <div className={styles.photoOverlay} />
                  </div>
                  <div className={styles.info}>
                    <h2 className={styles.name}>{m.name}</h2>
                    <p className={styles.role}>{m.role}</p>
                    <p className={styles.bio}>{m.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
