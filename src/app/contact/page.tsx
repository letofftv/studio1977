"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

const BITRIX_WEBHOOK = "https://1977likeit.bitrix24.ru/rest/1/bt2z4jtdry36b1m2";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    try {
      await fetch(`${BITRIX_WEBHOOK}/crm.lead.add.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            TITLE: `Контакт — ${fd.get("name")}`,
            NAME: fd.get("name") as string,
            EMAIL: [{ VALUE: fd.get("email") as string, VALUE_TYPE: "WORK" }],
            COMMENTS: fd.get("brief") as string,
            SOURCE_ID: "WEB",
            SOURCE_DESCRIPTION: "Форма контактов studio1977.vercel.app",
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
          <div className={styles.grid}>
            <div className={styles.left}>
              <h1 className={styles.title}>
                Создадим<br />
                <span className="bronze-text">будущее</span><br />
                вместе.
              </h1>
              <p className={styles.subtitle}>
                Расскажите о задаче — мы предложим формат и решение.
              </p>
              <div className={styles.office}>
                <p className={styles.officeLabel}>Контакты</p>
                <p className={styles.officeAddr}>+7 978 85 45 123</p>
                <a href="https://t.me/letoff_tv" className={styles.officeLink}>@letoff_tv в Telegram</a>
              </div>
            </div>

            <div className={styles.right}>
              {sent ? (
                <div className={styles.success}>
                  <h2>Заявка отправлена</h2>
                  <p>Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <div className={styles.formCard}>
                  <h2 className={styles.formTitle}>Прямой запрос</h2>
                  <p className={styles.formSub}>Конфиденциально</p>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formRow}>
                      <div className={styles.field}>
                        <label>Имя</label>
                        <input type="text" name="name" required placeholder="Как к вам обращаться?" />
                      </div>
                      <div className={styles.field}>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="email@company.com" />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Расскажите о задаче</label>
                      <textarea name="brief" rows={4} placeholder="Опишите проект..." />
                    </div>
                    <div className={styles.formActions}>
                      <button type="submit" className="btn btn-primary" disabled={sending}>
                        {sending ? "Отправляем..." : "Отправить"}
                      </button>
                      <span className={styles.hint}>Ответ в течение 24 часов</span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
