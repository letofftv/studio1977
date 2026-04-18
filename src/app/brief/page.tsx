"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const BITRIX_WEBHOOK = "https://1977likeit.bitrix24.ru/rest/1/bt2z4jtdry36b1m2";

const SERVICE_OPTIONS = [
  "Маркетинговый аудит",
  "Стратегия",
  "Брендинг",
  "Digital-разработка",
  "CRM и автоматизация",
  "AI и боты",
  "SMM и контент",
  "Event-продюсирование",
  "Продакшн",
  "PR и репутация",
  "Бизнес-консалтинг",
];

export default function BriefPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const services = fd.getAll("services") as string[];

    try {
      await fetch(`${BITRIX_WEBHOOK}/crm.lead.add.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            TITLE: `Бриф — ${fd.get("company") || fd.get("name")}`,
            NAME: fd.get("name") as string,
            COMPANY_TITLE: fd.get("company") as string || undefined,
            EMAIL: [{ VALUE: fd.get("email") as string, VALUE_TYPE: "WORK" }],
            PHONE: fd.get("phone") ? [{ VALUE: fd.get("phone") as string, VALUE_TYPE: "WORK" }] : undefined,
            COMMENTS: [
              `Направления: ${services.join(", ")}`,
              `Задача: ${fd.get("task")}`,
              `Бюджет: ${fd.get("budget")}`,
            ].join("\n"),
            SOURCE_ID: "WEB",
            SOURCE_DESCRIPTION: "Бриф studio1977.vercel.app/brief",
          },
        }),
      });
      setSent(true);
    } catch {
      alert("Ошибка. Свяжитесь напрямую: +7 978 85 45 123");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.page}>
          <div className="container">
            <p className="section-label">Начать проект</p>
            <h1 className={styles.title}>Заполните бриф</h1>
            <p className={styles.subtitle}>Расскажите о задаче — мы предложим решение и формат работы.</p>

            {sent ? (
              <div className={styles.success}>
                <h2>Бриф отправлен!</h2>
                <p>Мы свяжемся с вами в ближайшее время для обсуждения.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Имя *</label>
                    <input type="text" name="name" required placeholder="Как к вам обращаться?" />
                  </div>
                  <div className={styles.field}>
                    <label>Компания</label>
                    <input type="text" name="company" placeholder="Название компании" />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Email *</label>
                    <input type="email" name="email" required placeholder="email@company.com" />
                  </div>
                  <div className={styles.field}>
                    <label>Телефон</label>
                    <input type="tel" name="phone" placeholder="+7 ..." />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Направления</label>
                  <div className={styles.checkGrid}>
                    {SERVICE_OPTIONS.map((s) => (
                      <label key={s} className={styles.check}>
                        <input type="checkbox" name="services" value={s} />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Опишите задачу *</label>
                  <textarea name="task" rows={4} required placeholder="Расскажите, что хотите получить..." />
                </div>

                <div className={styles.field}>
                  <label>Примерный бюджет</label>
                  <select name="budget">
                    <option value="">Не определён</option>
                    <option value="до 100 000 ₽">до 100 000 ₽</option>
                    <option value="100 000 – 300 000 ₽">100 000 – 300 000 ₽</option>
                    <option value="300 000 – 500 000 ₽">300 000 – 500 000 ₽</option>
                    <option value="500 000 – 1 000 000 ₽">500 000 – 1 000 000 ₽</option>
                    <option value="1 000 000+ ₽">1 000 000+ ₽</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? "Отправляем..." : "Отправить бриф"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
