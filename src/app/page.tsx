import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Collapsible from "@/components/Collapsible";
import { fixTypography } from "@/utils/typography";

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
    short: "Находим, где бизнес теряет внимание, доверие и заявки.",
    desc: "Разбираем, как бизнес выглядит на рынке: сайт, соцсети, репутация, конкуренты, офферы, точки касания, слабые места в продажах. На выходе даём не отчёт для полки, а понятную карту: что чинить сначала, где можно вырасти и какие действия дадут эффект быстрее.",
    icon: <IconAudit />,
  },
  {
    id: "branding",
    title: "Брендинг и упаковка",
    short: "Делаем бренд понятным, живым и пригодным для продаж.",
    desc: "Помогаем сформулировать, кто вы, для кого вы и почему вам должны доверять. Собираем позиционирование, tone of voice, названия, смыслы, структуру предложения, визуальные ориентиры и тексты. Это нужно не только для красоты, а чтобы команда говорила о продукте одинаково и убедительно.",
    icon: <IconBranding />,
  },
  {
    id: "digital",
    title: "Сайты и цифровые решения",
    short: "Сайт как инструмент продаж, а не просто страница в интернете.",
    desc: "Проектируем лендинги, сайты компаний, промостраницы, каталоги, web-app и личные кабинеты. Учитываем не только дизайн, но и логику клиента: откуда он пришёл, что должен понять, где оставить заявку и как заявка попадёт в работу.",
    icon: <IconDigital />,
  },
  {
    id: "crm",
    title: "CRM и автоматизация",
    short: "Наводим порядок в продажах, задачах и коммуникации.",
    desc: "Настраиваем CRM под реальные процессы: лиды, сделки, задачи, ответственных, воронки, уведомления, статусы, контроль сроков и отчёты. Помогаем убрать ручной хаос, когда заявки лежат в переписках, задачи держатся в голове, а руководитель узнаёт о проблемах слишком поздно.",
    icon: <IconCRM />,
  },
  {
    id: "ai",
    title: "ИИ и умные помощники",
    short: "Автоматизируем рутину там, где люди тратят время впустую.",
    desc: "Создаём ботов, ИИ-ассистентов, сценарии автоматических ответов, помощников для обработки заявок, документов, клиентских вопросов и внутренней рутины. ИИ не заменяет бизнес, но хорошо снимает лишнюю нагрузку с команды, если правильно встроить его в процесс.",
    icon: <IconAI />,
  },
  {
    id: "strategy",
    title: "Стратегия и антикризис",
    short: "Когда нужен не шум, а трезвый план выхода из просадки.",
    desc: "Помогаем, когда «что-то не работает», но непонятно что именно. Разбираем продукт, маркетинг, продажи, коммуникацию и операционные провалы. Собираем план действий: что остановить, что усилить, что перепаковать и куда направить ресурсы.",
    icon: <IconStrategy />,
  },
];

const AUDIENCES = [
  { title: "Локальный бизнес", desc: "Заведения, услуги, магазины, салоны, сервисы, производители. Помогаем стать заметнее, понятнее и сильнее на своём рынке." },
  { title: "Девелопмент и недвижимость", desc: "Сайты жилых комплексов, каталоги объектов, интеграции с CRM, рекламные посадочные страницы и упаковка предложений для покупателей." },
  { title: "Event и культурные проекты", desc: "Концепции мероприятий, партнёрские предложения, айдентика, контент, страницы регистрации, сопровождение и коммуникация с аудиторией." },
  { title: "Производство и B2B", desc: "Упаковка сложных услуг, коммерческие предложения, структура продаж, CRM, автоматизация задач и нормальная подача для клиентов." },
  { title: "Проекты на этапе перезапуска", desc: "Когда бренд устал, коммуникация рассыпалась, маркетинг буксует, а команде нужна новая точка сборки." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Знакомство", desc: "Слушаем задачу, задаём неудобные, но полезные вопросы. Понимаем, что происходит сейчас." },
  { num: "02", title: "Разбор", desc: "Изучаем рынок, конкурентов, материалы и клиентский путь. На этом этапе появляется реальная картина." },
  { num: "03", title: "Сборка решения", desc: "Предлагаем формат работы: аудит, сайт, CRM или связку направлений. Фиксируем этапы и результат." },
  { num: "04", title: "Реализация", desc: "Делаем проект в понятном процессе. Показываем промежуточные решения, объясняем логику." },
  { num: "05", title: "Запуск", desc: "Передаём материалы, помогаем внедрить, объясняем команде, как этим пользоваться." },
];

const EXPERTISE = [
  { title: "Исследования рынков", desc: "Изучаем присутствие бренда в интернете, конкурентов, репутацию и слабые места." },
  { title: "Коммерческие предложения", desc: "Пишем КП, которые показывают боль клиента, выгоду и цену без лишнего тумана." },
  { title: "Сайты с CRM-логикой", desc: "Проектируем сайты, где заявка попадает в понятный процесс внутри CRM." },
  { title: "Рабочие процессы", desc: "Настраиваем воронки, задачи, роли и автоматизацию под конкретную команду." },
  { title: "ИИ-продукты и боты", desc: "Разрабатываем ассистентов для обработки обращений, документов и внутренней рутины." },
  { title: "Медиа и события", desc: "Умеем работать с подачей, вниманием аудитории, сценарием и атмосферой." },
];

const TEAM = [
  { name: "Сергей", role: "Стратегия, тексты и CRM", desc: "Помогает разложить сложную задачу на понятную систему: что говорим, кому говорим и как это связано с продажами.", photo: "/images/team/sergey.png" },
  { name: "Влад", role: "Идеология и концепция", desc: "Держит смысловую рамку студии, помогает видеть проект шире одной услуги и собирать вокруг него атмосферу.", photo: "/images/team/vlad.png" },
  { name: "Вика", role: "Маркетинг и координация", desc: "Помогает переводить идеи в действия: коммуникации, материалы, задачи и работу с партнёрами.", photo: "/images/team/vika.png" },
  { name: "Таня", role: "Арт-дирекшн и дизайн", desc: "Смотрит на проект через качество исполнения, визуальную систему и практическую применимость.", photo: "/images/team/tanya.png" },
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
            <p className={styles.heroLabel}>Креативная студия полного цикла</p>
            <h1 className={styles.heroTitle}>
              {fixTypography("Студия 1977 помогает бизнесу выглядеть сильнее, работать понятнее и продавать увереннее")}
            </h1>
            <p className={styles.heroSub}>
              {fixTypography("Мы соединяем маркетинг, события, брендинг, сайты, CRM и ИИ-инструменты в одну рабочую систему.")}
            </p>
            <div className={styles.heroCta}>
              <Link href="/brief" className="btn btn-primary">
                Обсудить проект
              </Link>
              <Link href="/services" className="btn btn-outline">
                Смотреть направления
              </Link>
            </div>
            <p className={styles.heroFootnote}>
              {fixTypography("Работаем с локальными брендами, девелоперами, производством и проектами, которым пора навести порядок в продвижении.")}
            </p>
          </div>
        </section>

        {/* ====== SERVICES ====== */}
        <section className={`section ${styles.services}`} id="services">
          <div className="container">
            <p className="section-label">Принципы</p>
            <h2 className="section-title">{fixTypography("Собираем не отдельные куски, а внятную систему")}</h2>
            <p className="section-subtitle">
              {fixTypography("Бизнесу редко нужен просто сайт или логотип. Обычно проблема глубже: нет понятной упаковки, хаос в заявках и непонятно, где теряются деньги.")}
            </p>
            <div className={`${styles.serviceGrid} stagger`}>
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  className={`card ${styles.serviceCard} animate-fade-up`}
                >
                  <span className={styles.serviceIcon}>{s.icon}</span>
                  <h3 className={styles.serviceTitle}>{fixTypography(s.title)}</h3>
                  <p className={styles.serviceShort}>{fixTypography(s.short)}</p>
                  <Collapsible>
                    <p className={styles.serviceDesc}>{fixTypography(s.desc)}</p>
                  </Collapsible>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== AUDIENCE (NEW) ====== */}
        <section className={`section ${styles.audience}`}>
          <div className="container">
            <p className="section-label">Для кого мы полезны</p>
            <h2 className="section-title">{fixTypography("К нам приходят, когда пора собрать всё в систему")}</h2>
            <div className={styles.audienceGrid}>
              {AUDIENCES.map((a) => (
                <div key={a.title} className={styles.audienceCard}>
                  <h3 className={styles.audienceTitle}>{fixTypography(a.title)}</h3>
                  <p className={styles.audienceDesc}>{fixTypography(a.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROCESS ====== */}
        <section className={`section ${styles.process}`} id="process">
          <div className="container">
            <p className="section-label">Подход</p>
            <h2 className="section-title">{fixTypography("Сначала разбираемся, потом делаем")}</h2>
            <p className="section-subtitle">
              {fixTypography("Хороший результат появляется, когда понятно, что именно болит и каким должен быть следующий шаг.")}
            </p>
            <div className={styles.processGrid}>
              {PROCESS_STEPS.map((s) => (
                <div key={s.num} className={styles.processStep}>
                  <span className={styles.processNum}>{s.num}</span>
                  <div>
                    <h3 className={styles.processTitle}>{fixTypography(s.title)}</h3>
                    <p className={styles.processDesc}>{fixTypography(s.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== EXPERTISE (NEW) ====== */}
        <section className={`section ${styles.expertise}`}>
          <div className="container">
            <p className="section-label">Практика</p>
            <h2 className="section-title">{fixTypography("Наш опыт не из презентаций")}</h2>
            <div className={styles.expertiseGrid}>
              {EXPERTISE.map((e) => (
                <div key={e.title} className={styles.expertiseCard}>
                  <h3 className={styles.expertiseTitle}>{fixTypography(e.title)}</h3>
                  <p className={styles.expertiseDesc}>{fixTypography(e.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== TEAM ====== */}
        <section className={`section ${styles.team}`} id="team">
          <div className="container">
            <p className="section-label">Команда</p>
            <h2 className="section-title">Лица Студии 1977</h2>
            <div className={styles.teamGrid}>
              {TEAM.map((t) => (
                <div key={t.name} className={styles.teamCard}>
                  <div className={styles.teamPhoto}>
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={400}
                      height={400}
                      className={styles.teamImg}
                    />
                  </div>
                  <h3 className={styles.teamName}>{fixTypography(t.name)}</h3>
                  <p className={styles.teamRole}>{fixTypography(t.role)}</p>
                  <p className={styles.teamDesc}>{fixTypography(t.desc)}</p>
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
              Есть задача, но пока
              <br />
              нет понятной формы?
            </h2>
            <p className={styles.ctaSub}>
              {fixTypography("Мы поможем разложить это на конкретные шаги. Ответим на вопросы и предложим, с чего начать.")}
            </p>
            <div className={styles.ctaActions}>
              <Link href="/brief" className="btn btn-primary">
                Заполнить бриф
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Связаться с нами
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
