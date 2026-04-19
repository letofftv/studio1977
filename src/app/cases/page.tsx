import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Кейсы — Студия 1977",
  description: "Портфолио проектов Студии 1977: маркетинг, event, брендинг, digital.",
};

const CASES = [
  { slug: "atlas-festival", title: "Atlas Festival 2024", category: "Event · Production", year: "2024", color: "#c8a45a" },
  { slug: "nova-brand", title: "Nova — запуск бренда", category: "Брендинг · Маркетинг", year: "2024", color: "#7b68ee" },
  { slug: "echo-digital", title: "Echo Digital Platform", category: "Digital · Стратегия", year: "2023", color: "#4ecdc4" },
  { slug: "rhythm-event", title: "Rhythm Night Series", category: "Event · Маркетинг", year: "2023", color: "#ff6b6b" },
  { slug: "forma-rebrand", title: "Forma — ребрендинг", category: "Брендинг · Digital", year: "2023", color: "#f7b267" },
  { slug: "pulse-content", title: "Pulse Content Strategy", category: "Маркетинг · Production", year: "2022", color: "#a8e6cf" },
];

export default function CasesPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Портфолио</p>
            <h1 className={styles.title}>Наши кейсы</h1>
            <p className={styles.lead}>
              Проекты, которыми мы гордимся. Каждый — результат погружения в задачу клиента.
            </p>
          </div>
        </section>

        <section className={`section ${styles.grid}`}>
          <div className="container">
            <div className={styles.casesGrid}>
              {CASES.map((c) => (
                <Link key={c.slug} href={`/cases/${c.slug}`} className={styles.caseCard}>
                  <div className={styles.caseImage} style={{ background: `linear-gradient(135deg, ${c.color}22, ${c.color}08)` }}>
                    <span className={styles.caseLetter} style={{ color: c.color }}>{c.title.charAt(0)}</span>
                  </div>
                  <div className={styles.caseInfo}>
                    <div className={styles.caseMeta}>
                      <span className={styles.caseCategory}>{c.category}</span>
                      <span className={styles.caseYear}>{c.year}</span>
                    </div>
                    <h2 className={styles.caseTitle}>{c.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
