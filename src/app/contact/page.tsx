"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className="section-label">Обратная связь</p>
            <h1 className={styles.title}>Давайте обсудим, что нужно вашему проекту</h1>
            <p className={styles.lead}>
              Можно прийти с готовым ТЗ, а можно с коротким сообщением в духе «у нас всё есть, но ничего не работает как надо». Мы разберёмся и предложим нормальную точку старта.
            </p>
          </div>
        </section>

        <section className={`section ${styles.content}`}>
          <div className="container">
            <div className={styles.grid}>
              {/* Info */}
              <div className={styles.info}>
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Написать</h3>
                  <a href="mailto:hello@studio1977.ru" className={styles.infoValue}>hello@studio1977.ru</a>
                  <p className={styles.infoHint}>Подходит для запросов, брифов, презентаций и документов.</p>
                </div>
                
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Позвонить</h3>
                  <a href="tel:+79001234567" className={styles.infoValue}>+7 900 123-45-67</a>
                  <p className={styles.infoHint}>Если нужно быстро понять, можем ли быть полезны.</p>
                </div>
                
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Где работаем</h3>
                  <p className={styles.infoValue}>Республика Крым</p>
                  <p className={styles.infoHint}>Работаем с крымскими проектами и задачами за пределами региона удалённо.</p>
                </div>
                
                <div className={styles.infoBlock}>
                  <h3 className={styles.infoTitle}>Мессенджеры</h3>
                  <div className={styles.socials}>
                    <a href="https://t.me/letoff_tv" className={styles.socialLink}>Telegram</a>
                    <a href="#" className={styles.socialLink}>WhatsApp</a>
                  </div>
                  <p className={styles.infoHint}>Для первого контакта достаточно пары предложений о задаче.</p>
                </div>
              </div>

              {/* Form & Context */}
              <div className={styles.formWrap}>
                {sent ? (
                  <div className={styles.success}>
                    <span className={styles.successIcon}>✓</span>
                    <h3>Заявка отправлена</h3>
                    <p>Мы свяжемся с вами в течение рабочего дня.</p>
                  </div>
                ) : (
                  <div className={styles.formContainer}>
                    <div className={styles.formHeader}>
                      <h2 className={styles.formTitle}>Что лучше написать сразу</h2>
                      <ul className={styles.contextList}>
                        <li>чем занимается ваш бизнес или проект</li>
                        <li>что сейчас не устраивает</li>
                        <li>какой результат хотите получить</li>
                        <li>есть ли сроки</li>
                        <li>есть ли сайт, соцсети, CRM или текущие материалы</li>
                      </ul>
                      <p className={styles.formHint}>
                        Не страшно, если пока нет точной формулировки. Задача часто становится понятной только после первого разговора.
                      </p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                      <div className={styles.fieldRow}>
                        <div className={styles.field}>
                          <label htmlFor="contact-name">Имя</label>
                          <input id="contact-name" type="text" placeholder="Как к вам обращаться?" required />
                        </div>
                        <div className={styles.field}>
                          <label htmlFor="contact-company">Компания</label>
                          <input id="contact-company" type="text" placeholder="Название компании" />
                        </div>
                      </div>
                      <div className={styles.fieldRow}>
                        <div className={styles.field}>
                          <label htmlFor="contact-email">Email</label>
                          <input id="contact-email" type="email" placeholder="email@example.com" required />
                        </div>
                        <div className={styles.field}>
                          <label htmlFor="contact-phone">Телефон</label>
                          <input id="contact-phone" type="tel" placeholder="+7 ..." />
                        </div>
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="contact-message">Сообщение</label>
                        <textarea id="contact-message" rows={4} placeholder="Расскажите коротко о задаче" required />
                      </div>
                      <button type="submit" className="btn btn-primary">Отправить заявку</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
