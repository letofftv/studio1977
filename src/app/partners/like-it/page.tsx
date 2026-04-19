"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const SERVICES = [
  { title: "ИИ-ассистенты", desc: "Создаём помощников, которые отвечают на частые вопросы, помогают клиентам и работают по сценариям." },
  { title: "Боты для клиентов", desc: "Telegram-боты и web-интерфейсы для заявок, консультаций, анкет и внутренней рутины." },
  { title: "CRM-интеграции", desc: "Связываем формы, сайты и боты с CRM. Настраиваем статусы и ответственных без ручного копирования." },
  { title: "RAG-системы", desc: "Использование ваших документов и регламентов как основы для ответов ИИ-ассистента." },
  { title: "Анализ документов", desc: "Инструменты для проверки документов, поиска рисков и экономии времени на разборе." },
  { title: "Автоматизация рутины", desc: "Убираем повторяющиеся действия: перенос данных, уведомления, напоминания и отчёты." },
];

const INDUSTRIES = ["Недвижимость", "Гостиницы и туризм", "Ритейл и услуги", "Производство", "Образование", "Юридические сервисы"];

const BITRIX_WEBHOOK = "https://1977likeit.bitrix24.ru/rest/1/bt2z4jtdry36b1m2";

export default function LikeItPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const phone = data.get("phone") as string;
    const task = data.get("task") as string;

    try {
      await fetch(`${BITRIX_WEBHOOK}/crm.lead.add.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            TITLE: `лайк IT — ${company || name}`,
            NAME: name,
            COMPANY_TITLE: company || undefined,
            PHONE: phone ? [{ VALUE: phone, VALUE_TYPE: "WORK" }] : undefined,
            COMMENTS: task ? `Задача: ${task}` : undefined,
            SOURCE_ID: "PARTNER",
            SOURCE_DESCRIPTION: "Мини-лендинг лайк IT на studio1977.vercel.app",
          },
        }),
      });
      setSent(true);
    } catch {
      alert("Ошибка отправки. Свяжитесь напрямую: +7 978 85 45 123");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className="section-label">Технологическое направление Студии 1977</p>
            <h1 className={styles.heroTitle}>лайк IT: ИИ и автоматизация для бизнеса без магического тумана</h1>
            <p className={styles.heroSub}>
              Помогаем компаниям внедрять ботов, ИИ-ассистентов и CRM-интеграции ради конкретной пользы: быстрее отвечать, меньше терять заявки и разгружать сотрудников.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className="btn btn-primary">Обсудить автоматизацию</a>
              <a href="#services" className="btn btn-outline">Посмотреть возможности</a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className={`${styles.services} bg-surface-low`} id="services">
          <div className="container">
            <h2 className="section-title">Что делаем</h2>
            <div className={styles.servicesGrid}>
              {SERVICES.map((s) => (
                <div key={s.title} className={styles.serviceCard}>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className={styles.industries}>
          <div className="container">
            <h2 className="section-title">Для каких отраслей</h2>
            <div className={styles.industryTags}>
              {INDUSTRIES.map((i) => (
                <span key={i} className={styles.industryTag}>{i}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className={`${styles.whyUs} bg-surface-low`}>
          <div className="container">
            <h2 className="section-title">Как внедряем</h2>
            <div className={styles.processGrid}>
              <div className={styles.processItem}>
                <span>01</span>
                <h4>Находим рутину</h4>
                <p>Смотрим, где команда тратит время на повторяющиеся вопросы и ручные напоминания.</p>
              </div>
              <div className={styles.processItem}>
                <span>02</span>
                <h4>Проектируем сценарий</h4>
                <p>Определяем, что должен делать бот, где он берёт данные и когда подключается человек.</p>
              </div>
              <div className={styles.processItem}>
                <span>03</span>
                <h4>Собираем MVP</h4>
                <p>Делаем первую рабочую версию без лишней тяжести. Проверяем на реальных сценариях.</p>
              </div>
              <div className={styles.processItem}>
                <span>04</span>
                <h4>Интеграции</h4>
                <p>Связываем решение с CRM, сайтом, базами знаний и нужными каналами.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className={styles.contact} id="contact">
          <div className="container">
            {sent ? (
              <div className={styles.successWrap}>
                <h2 className="section-title">Заявка отправлена</h2>
                <p>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <h2 className="section-title">Начните с консультации</h2>
                <p className="section-subtitle">ИИ должен не удивлять, а помогать. Давайте обсудим ваши задачи.</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Имя</label>
                      <input type="text" name="name" required placeholder="Как к вам обращаться?" />
                    </div>
                    <div className={styles.formField}>
                      <label>Компания</label>
                      <input type="text" name="company" placeholder="Название компании" />
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label>Телефон</label>
                    <input type="tel" name="phone" placeholder="+7 ..." />
                  </div>
                  <div className={styles.formField}>
                    <label>Задача</label>
                    <textarea name="task" rows={3} placeholder="Опишите, что хотите автоматизировать" />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={sending}>
                    {sending ? "Отправляем..." : "Обсудить внедрение"}
                  </button>
                </form>
              </>
            )}
            <div className={styles.contacts}>
              <a href="tel:+79788545123" className={styles.contactLink}>+7 978 85 45 123</a>
              <a href="https://t.me/letoff_tv" className={styles.contactLink}>@letoff_tv</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
