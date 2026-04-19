"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const SERVICE_OPTIONS = [
  "Аудит", "Стратегия", "Брендинг", "SMM и контент", "Сайты и digital",
  "CRM и автоматизация", "AI и боты", "Ивенты", "Сопровождение", "Другое"
];

const BUDGET_OPTIONS = [
  "до 300 000 ₽", "300 000 — 700 000 ₽", "700 000 — 1 500 000 ₽", "от 1 500 000 ₽", "Обсудим"
];

const BITRIX_WEBHOOK = "https://1977likeit.bitrix24.ru/rest/1/bt2z4jtdry36b1m2";

export default function BriefPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const services = data.getAll("services").join(", ");
    const task = data.get("task") as string;
    const deadline = data.get("deadline") as string;
    const budget = data.get("budget") as string;
    const extra = data.get("extra") as string;

    const comments = [
      services && `Направления: ${services}`,
      task && `Задача: ${task}`,
      deadline && `Сроки: ${deadline}`,
      budget && `Бюджет: ${budget}`,
      extra && `Дополнительно: ${extra}`,
    ].filter(Boolean).join("\n");

    try {
      await fetch(`${BITRIX_WEBHOOK}/crm.lead.add.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            TITLE: `Бриф с сайта: ${company || name}`,
            NAME: name,
            COMPANY_TITLE: company || undefined,
            EMAIL: email ? [{ VALUE: email, VALUE_TYPE: "WORK" }] : undefined,
            PHONE: phone ? [{ VALUE: phone, VALUE_TYPE: "WORK" }] : undefined,
            COMMENTS: comments,
            SOURCE_ID: "WEB",
          },
        }),
      });
      setSent(true);
    } catch {
      alert("Произошла ошибка. Попробуйте ещё раз или свяжитесь с нами напрямую.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <>
        <Header />
        <main>
          <section className={styles.hero}>
            <div className={`container ${styles.successWrap}`}>
              <span className={styles.successIcon}>✓</span>
              <h1 className={styles.title}>Бриф отправлен</h1>
              <p className={styles.lead}>
                Спасибо! Мы изучим вашу задачу и свяжемся в течение 1–2 рабочих дней.
              </p>
              <a href="/" className="btn btn-outline">На главную</a>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Бриф</p>
            <h1 className={styles.title}>Расскажите о проекте</h1>
            <p className={styles.lead}>
              Чем подробнее — тем точнее мы оценим задачу и предложим решение.
            </p>
          </div>
        </section>

        <section className={`section ${styles.formSection}`}>
          <div className="container">
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Contact info */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Контактная информация</legend>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="brief-name">Имя *</label>
                    <input id="brief-name" name="name" type="text" required placeholder="Как к вам обращаться?" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="brief-company">Компания</label>
                    <input id="brief-company" name="company" type="text" placeholder="Название компании" />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="brief-email">Email *</label>
                    <input id="brief-email" name="email" type="email" required placeholder="email@example.com" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="brief-phone">Телефон</label>
                    <input id="brief-phone" name="phone" type="tel" placeholder="+7 ..." />
                  </div>
                </div>
              </fieldset>

              {/* Project details */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>О проекте</legend>
                <div className={styles.field}>
                  <label>Направление</label>
                  <div className={styles.checkboxGroup}>
                    {SERVICE_OPTIONS.map((s) => (
                      <label key={s} className={styles.chip}>
                        <input type="checkbox" name="services" value={s} />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="brief-task">Задача *</label>
                  <textarea id="brief-task" name="task" rows={4} required placeholder="Опишите, какую задачу нужно решить" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="brief-deadline">Сроки</label>
                  <input id="brief-deadline" name="deadline" type="text" placeholder="Есть ли жёсткий дедлайн?" />
                </div>
                <div className={styles.field}>
                  <label>Бюджет</label>
                  <div className={styles.checkboxGroup}>
                    {BUDGET_OPTIONS.map((b) => (
                      <label key={b} className={styles.chip}>
                        <input type="radio" name="budget" value={b} />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="brief-extra">Дополнительно</label>
                  <textarea id="brief-extra" name="extra" rows={3} placeholder="Ссылки, референсы, пожелания" />
                </div>
              </fieldset>

              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? "Отправляем..." : "Отправить бриф"}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
