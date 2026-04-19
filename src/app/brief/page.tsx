"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const SERVICE_OPTIONS = [
  "Маркетинговый аудит", 
  "Стратегия продвижения", 
  "Брендинг и упаковка", 
  "Сайт или лендинг",
  "CRM и автоматизация", 
  "ИИ, бот или помощник", 
  "Event и партнёрские проекты", 
  "Коммерческое предложение", 
  "Пока не знаю, нужна диагностика"
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
      alert("Ошибка отправки. Попробуйте ещё раз или свяжитесь с нами напрямую.");
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
                Спасибо. Задачу получили. Посмотрим вводные и вернёмся с понятным следующим шагом.
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
            <h1 className={styles.title}>Расскажите о задаче, а мы соберём из этого понятный план</h1>
            <p className={styles.lead}>
              Бриф — не экзамен. Нам важно понять контекст, боль и ожидания. Чем честнее вводные, тем точнее будет предложение.
            </p>
          </div>
        </section>

        <section className={`section ${styles.formSection}`}>
          <div className="container">
            <form className={styles.form} onSubmit={handleSubmit}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Контактная информация</legend>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="brief-name">Имя *</label>
                    <input id="brief-name" name="name" type="text" required placeholder="Как к вам обращаться?" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="brief-company">Компания / проект</label>
                    <input id="brief-company" name="company" type="text" placeholder="Название бизнеса, бренда или проекта" />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="brief-email">Email *</label>
                    <input id="brief-email" name="email" type="email" required placeholder="Куда отправить ответ или материалы" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="brief-phone">Телефон</label>
                    <input id="brief-phone" name="phone" type="tel" placeholder="Для быстрой связи" />
                  </div>
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>О задаче</legend>
                <div className={styles.field}>
                  <label>Что сейчас ближе к вашей задаче?</label>
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
                  <textarea id="brief-task" name="task" rows={4} required placeholder="Опишите, что происходит сейчас и какой результат хотите получить. Можно простыми словами." />
                </div>
                <div className={styles.field}>
                  <label htmlFor="brief-deadline">Сроки</label>
                  <input id="brief-deadline" name="deadline" type="text" placeholder="Когда нужно запустить или получить результат?" />
                </div>
                <div className={styles.field}>
                  <label>Бюджет (ориентир)</label>
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
                  <textarea id="brief-extra" name="extra" rows={3} placeholder="Ссылки на сайт, соцсети, референсы или любые важные детали" />
                </div>
              </fieldset>

              <div className={styles.formFooter}>
                <p className={styles.disclaimer}>
                  Мы используем информацию только для подготовки ответа по задаче. Если проект требует NDA, просто укажите это в комментарии.
                </p>
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? "Отправляем..." : "Отправить бриф"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
