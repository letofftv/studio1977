import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Студия 1977: маркетинг, сайты, CRM, события и автоматизация для бизнеса",
  description: "Студия 1977 помогает бизнесу в Крыму и за его пределами с маркетингом, брендингом, сайтами, CRM, ИИ-ботами, событиями и антикризисной упаковкой.",
};

const IconAudit = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const IconBranding = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

const IconDigital = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
  </svg>
);

const IconCRM = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconAI = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
  </svg>
);

const IconStrategy = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);

const SERVICES = [
  {
    id: "audit",
    title: "Маркетинговый аудит",
    desc: "Находим, где бизнес теряет внимание, доверие и заявки. Даём понятную карту роста.",
    icon: <IconAudit />,
  },
  {
    id: "branding",
    title: "Брендинг и упаковка",
    desc: "Делаем бренд понятным, живым и пригодным для продаж. Смыслы, позиционирование и визуал.",
    icon: <IconBranding />,
  },
  {
    id: "digital",
    title: "Сайты и digital",
    desc: "Сайт как инструмент продаж: логика, дизайн и техническая реализация.",
    icon: <IconDigital />,
  },
  {
    id: "crm",
    title: "CRM и автоматизация",
    desc: "Наводим порядок в продажах, задачах и коммуникации. Внедрение Битрикс24.",
    icon: <IconCRM />,
  },
  {
    id: "ai",
    title: "ИИ, боты и помощники",
    desc: "Автоматизируем рутину там, где люди тратят время впустую. Умные ассистенты.",
    icon: <IconAI />,
  },
  {
    id: "strategy",
    title: "Стратегия и антикризис",
    desc: "Когда нужен не шум, а трезвый план выхода из просадки. Перепаковка и фокус.",
    icon: <IconStrategy />,
  },
];

const AUDIENCES = [
  { title: "Локальный бизнес", desc: "Заведения, услуги, магазины, салоны. Становимся заметнее и сильнее на своём рынке." },
  { title: "Девелопмент", desc: "Сайты ЖК, каталоги, интеграции с CRM и упаковка предложений для покупателей." },
  { title: "Event и культура", desc: "Концепции, партнёрские предложения, айдентика и страницы регистрации." },
  { title: "Производство и B2B", desc: "Упаковка сложных услуг, коммерческие предложения и автоматизация продаж." },
  { title: "Проекты Reboot", desc: "Когда бренд устал, а маркетингу нужна новая точка сборки и понятные смыслы." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Знакомство", desc: "Слушаем задачу, задаём неудобные вопросы. Понимаем, что происходит сейчас." },
  { num: "02", title: "Разбор", desc: "Изучаем рынок, конкурентов и процессы. Получаем реальную картину, а не ощущение." },
  { num: "03", title: "Сборка решения", desc: "Предлагаем формат работы и фиксируем этапы, сроки и зоны ответственности." },
  { num: "04", title: "Реализация", desc: "Делаем проект в понятном процессе. Объясняем логику, не прячемся за словами." },
  { num: "05", title: "Запуск", desc: "Помогаем внедрить, обучаем команду и остаёмся рядом для поддержки." },
];

const EXPERIENCE = [
  { title: "Исследования рынков", desc: "Изучаем присутствие бренда, конкурентов и точки входа." },
  { title: "Коммерческие предложения", desc: "Пишем КП, которые показывают выгоду и закрывают вопросы." },
  { title: "Сайты с CRM-логикой", desc: "Где заявка попадает в понятный процесс, а не просто на почту." },
  { title: "Bitrix24 под ключ", desc: "Настраиваем воронки и роботов под конкретную команду." },
  { title: "ИИ-продукты и боты", desc: "Разрабатываем ассистентов для рутины и поддержки сотрудников." },
  { title: "Медиа и события", desc: "Работаем с подачей, вниманием и атмосферой проекта." },
];

const TEAM = [
  { name: "Сергей", role: "Стратегия, тексты, ИИ и упаковка решений", bio: "Помогает разложить сложную задачу на понятную систему: что говорим и кому." },
  { name: "Влад", role: "Идеология и направление проекта", bio: "Держит смысловую рамку 1977, собирает вокруг проекта атмосферу и стиль." },
  { name: "Вика", role: "Маркетинг, контент и координация", bio: "Переводит идеи в действия: коммуникации, материалы и работа с партнёрами." },
  { name: "Таня", role: "Арт-дирекшн и продакшн", bio: "Смотрит на проект через качество исполнения и визуальную систему." },
  { name: "Лаура", role: "Event-направление и организация", bio: "Усиливает проекты, где важны живое впечатление и сценарий события." },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ====== HERO ====== */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <div className={styles.heroOrb1} />
            <div className={styles.heroOrb2} />
            <div className={styles.heroGrid} />
          </div>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.heroLabel}>Студия 1977</p>
            <h1 className={styles.heroTitle}>
              Помогаем бизнесу выглядеть сильнее, работать понятнее и продавать увереннее
            </h1>
            <p className={styles.heroSub}>
              Мы соединяем маркетинг, события, брендинг, сайты, CRM и ИИ-инструменты в одну рабочую систему.
            </p>
            <div className={styles.heroCta}>
              <Link href="/brief" className="btn btn-primary">Обсудить проект</Link>
              <Link href="#services" className="btn btn-outline">Смотреть направления</Link>
            </div>
            <p className={styles.heroFoot}>
              Работаем с бизнесом, локальными брендами, производством и проектами, которым пора навести порядок в продвижении.
            </p>
          </div>
        </section>

        {/* ====== SERVICES ====== */}
        <section className={`section ${styles.services}`} id="services">
          <div className="container">
            <p className="section-label">Комплексный подход</p>
            <h2 className="section-title">Собираем не отдельные куски, а внятную систему</h2>
            <p className="section-subtitle">
              Бизнесу редко нужен просто сайт или логотип. Обычно проблема в отсутствии упаковки или хаосе в заявках. Мы заходим именно туда.
            </p>
            <div className={`${styles.serviceGrid} stagger`}>
              {SERVICES.map((s) => (
                <Link 
                  key={s.id} 
                  href={s.id === "ai" || s.id === "like-it" ? "/partners/like-it" : `/services/${s.id}`} 
                  className={`card ${styles.serviceCard} animate-fade-up`}
                >
                  <span className={styles.serviceIcon}>{s.icon}</span>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                  <span className={styles.serviceArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ====== AUDIENCES ====== */}
        <section className={`section ${styles.audiences}`}>
          <div className="container">
            <p className="section-label">Для кого мы полезны</p>
            <h2 className="section-title">К нам приходят, когда пора собрать всё в систему</h2>
            <div className={styles.audiencesGrid}>
              {AUDIENCES.map((a) => (
                <div key={a.title} className={styles.audienceCard}>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROCESS ====== */}
        <section className={`section ${styles.process}`} id="process">
          <div className="container">
            <p className="section-label">Подход</p>
            <h2 className="section-title">Сначала разбираемся, потом делаем</h2>
            <p className="section-subtitle">
              Хороший результат появляется, когда понятно, что именно болит и каким должен быть следующий шаг.
            </p>
            <div className={styles.processGrid}>
              {PROCESS_STEPS.map((s) => (
                <div key={s.num} className={styles.processStep}>
                  <span className={styles.processNum}>{s.num}</span>
                  <h3 className={styles.processTitle}>{s.title}</h3>
                  <p className={styles.processDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== EXPERIENCE ====== */}
        <section className={`section ${styles.experience} bg-surface-low`}>
          <div className="container">
            <p className="section-label">Практика</p>
            <h2 className="section-title">Наш опыт не из презентаций</h2>
            <div className={styles.experienceGrid}>
              {EXPERIENCE.map((e) => (
                <div key={e.title} className={styles.expCard}>
                  <h3>{e.title}</h3>
                  <p>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== TEAM ====== */}
        <section className={`section ${styles.team}`} id="team">
          <div className="container">
            <p className="section-label">Команда</p>
            <h2 className="section-title">Смотрим на задачи с разных сторон</h2>
            <div className={styles.teamGrid}>
              {TEAM.map((t) => (
                <div key={t.name} className={styles.teamCard}>
                  <h3 className={styles.teamName}>{t.name}</h3>
                  <p className={styles.teamRole}>{t.role}</p>
                  <p className={styles.teamBio}>{t.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className={`section ${styles.cta}`}>
          <div className={styles.ctaBg}>
            <div className={styles.ctaOrb} />
          </div>
          <div className={`container ${styles.ctaInner}`}>
            <h2 className={styles.ctaTitle}>
              Есть задача, но пока нет понятной формы?
            </h2>
            <p className={styles.ctaSub}>
              Это нормальная точка входа. Мы поможем разложить ситуацию на конкретные шаги без лишнего разгона бюджета.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/brief" className="btn btn-primary">Обсудить проект</Link>
              <Link href="/contact" className="btn btn-outline">Связаться с нами</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
