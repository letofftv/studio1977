"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const SERVICES = [
  { title: "Чат-боты для бизнеса", desc: "Автоматизируют общение с клиентами и внутренние процессы." },
  { title: "Голосовые ассистенты", desc: "Отвечают на звонки, принимают обращения, разгружают операторов." },
  { title: "RAG-системы", desc: "ИИ, который знает ваш бизнес и говорит на вашем языке." },
  { title: "Интеграции с CRM", desc: "Внедрение, настройка и продажа Битрикс24." },
  { title: "Анализ документов", desc: "ИИ читает, проверяет и анализирует документы быстрее человека." },
  { title: "Автоматизация рутины", desc: "ИИ делает то, на что у людей не должно уходить время." },
];

const INDUSTRIES = ["Ритейл", "Финансы", "Логистика", "HR", "Недвижимость", "Образование"];

const BITRIX_WEBHOOK = "https://1977likeit.bitrix24.ru/rest/1/bt2z4jtdry36b1m2";

export default function AiLikeItPage() {
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
            TITLE: `Ai лайк iT — ${company || name}`,
            NAME: name,
            COMPANY_TITLE: company || undefined,
            PHONE: phone ? [{ VALUE: phone, VALUE_TYPE: "WORK" }] : undefined,
            COMMENTS: task ? `Задача: ${task}` : undefined,
            SOURCE_ID: "PARTNER",
            SOURCE_DESCRIPTION: "Мини-лендинг Ai лайк iT на studio1977.vercel.app",
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
            <p className="section-label">IT-партнёр Студии 1977</p>
            <h1 className={styles.heroTitle}>Ai лайк iT</h1>
            <p className={styles.heroSub}>
              ИИ-решения для автоматизации бизнеса. Создаём интеллектуальных агентов, которые закрывают рутину, консультируют клиентов и усиливают команду.
            </p>
            <a href="https://t.me/letoff_tv" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Обсудить проект
            </a>
          </div>
        </section>

        {/* Services */}
        <section className={`${styles.services} bg-surface-low`}>
          <div className="container">
            <h2 className="section-title">Что мы делаем</h2>
            <p className="section-subtitle" style={{ marginBottom: "var(--space-3xl)" }}>
              Полный цикл разработки ИИ-решений для бизнеса
            </p>
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
            <h2 className="section-title">Отрасли</h2>
            <div className={styles.industryTags}>
              {INDUSTRIES.map((i) => (
                <span key={i} className={styles.industryTag}>{i}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className={`${styles.whyUs} bg-surface-low`}>
          <div className="container">
            <div className={styles.whyGrid}>
              <div>
                <h2 className="section-title">Почему мы</h2>
                <p className={styles.whyText}>
                  Мы не просто подключаем ChatGPT. Мы создаём системные решения: от анализа процессов до поддержки после запуска.
                </p>
              </div>
              <ul className={styles.whyList}>
                <li>Работаем с любыми LLM: GPT, Claude, YandexGPT, GigaChat</li>
                <li>Интеграция с вашими системами</li>
                <li>Обучение на ваших данных</li>
                <li>Поддержка и развитие после запуска</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className={styles.contact}>
          <div className="container">
            {sent ? (
              <div className={styles.successWrap}>
                <h2 className="section-title">Заявка отправлена</h2>
                <p className={styles.whyText}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <h2 className="section-title">Начните с консультации</h2>
                <p className="section-subtitle" style={{ marginBottom: "var(--space-xl)" }}>
                  Обсудим задачу, предложим решение и рассчитаем эффект
                </p>
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
                    {sending ? "Отправляем..." : "Отправить заявку"}
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
