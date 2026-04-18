import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Кейсы — Студия 1977",
  description: "Портфолио проектов Студии 1977: маркетинг, event, брендинг, digital.",
};

const CASES = [
  { slug: "atlas-festival", title: "Atlas Festival 2024", category: "Event · Production", year: "2024", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop" },
  { slug: "nova-brand", title: "Nova — запуск бренда", category: "Брендинг · Маркетинг", year: "2024", image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop" },
  { slug: "echo-digital", title: "Echo Digital Platform", category: "Digital · Стратегия", year: "2023", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" },
  { slug: "rhythm-event", title: "Rhythm Night Series", category: "Event · Маркетинг", year: "2023", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" },
  { slug: "forma-rebrand", title: "Forma — ребрендинг", category: "Брендинг · Digital", year: "2023", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" },
  { slug: "pulse-content", title: "Pulse Content Strategy", category: "Маркетинг · Production", year: "2022", image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2064&auto=format&fit=crop" },
];

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Архив 1977</p>
            <h1 className={styles.title}>
              Selected<br />
              <span className="bronze-text">Works.</span>
            </h1>
            <p className={styles.lead}>
              Мы верим в материальность результата. Каждый кейс — это дистиллированная стратегия, воплощенная в форму.
            </p>
          </div>
        </section>

        <section className={styles.gridSection}>
          <div className="container-wide">
            <div className={styles.casesGrid}>
              {CASES.map((c, i) => (
                <Link 
                  key={c.slug} 
                  href={`/cases/${c.slug}`} 
                  className={`${styles.caseCard} ${i % 3 === 0 ? styles.wide : ""}`}
                >
                  <div className={styles.imageWrap}>
                    <img
                      src={c.image}
                      alt={c.title}
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      <div className={styles.meta}>
                        <span className={styles.category}>{c.category}</span>
                        <span className={styles.year}>{c.year}</span>
                      </div>
                      <h2 className={styles.caseTitle}>{c.title}</h2>
                      <div className={styles.viewMore}>
                        <span className={styles.viewText}>Смотреть кейс</span>
                        <span className={styles.arrow}>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaBox}>
              <h2 className={styles.ctaTitle}>Готовы создать нечто особенное?</h2>
              <Link href="/brief" className="btn btn-primary">Начать проект</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
