"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { fixTypography } from "@/utils/typography";

const SERVICES = [
  { title: "ИИ-ассистенты", desc: "Создаём помощников, которые отвечают на частые вопросы и работают по сценариям." },
  { title: "Боты для бизнеса", desc: "Telegram-боты и web-интерфейсы для заявок, записи и внутренних процессов." },
  { title: "CRM-интеграции", desc: "Связываем формы, сайты и боты с CRM для передачи данных без ошибок." },
  { title: "Базы знаний (RAG)", desc: "Используем ваши инструкции и регламенты как основу для ответов ИИ-ассистента." },
  { title: "Анализ документов", desc: "Инструменты для проверки рисков и поиска важных фрагментов в текстах." },
  { title: "Автоматизация рутины", desc: "Убираем повторяющиеся действия: перенос данных, напоминания и отчёты." },
];

const INDUSTRIES = [
  "Недвижимость", "Гостиницы", "Ритейл и услуги", "Производство", "Образование", "Юридические сервисы"
];

const STEPS = [
  { num: "01", title: "Находим рутину", desc: "Смотрим, где команда тратит время на повторяющиеся вопросы и ручной ввод." },
  { num: "02", title: "Проектируем сценарий", desc: "Определяем логику бота: где он берёт данные и когда подключается человек." },
  { num: "03", title: "Сборка первой версии", desc: "Делаем рабочее решение (MVP) для проверки на реальных задачах." },
  { num: "04", title: "Интеграции", desc: "Связываем решение с CRM, сайтом, таблицами и базами знаний." },
  { num: "05", title: "Улучшение", desc: "Смотрим, как пользователи общаются с ИИ, и дорабатываем сценарии." },
];

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
            SOURCE_DESCRIPTION: "Мини-лендинг лайк IT на studio1977.ru",
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
            <div className={styles.heroLogoWrapper}>
                <Image src="/images/like-it-logo.svg" alt="лайк IT логотип" width={240} height={75} />
            </div>
            <p className="section-label">Технологическое направление</p>
            <h1 className={styles.heroTitle}>{fixTypography("ИИ и автоматизация для бизнеса без магического тумана")}</h1>
            <p className={styles.heroSub}>
              {fixTypography("Помогаем внедрять ботов, ИИ-ассистентов, CRM-интеграции и автоматизацию рутины. Не ради моды, а ради конкретной пользы: быстрее отвечать, меньше терять заявки и разгружать сотрудников.")}
            </p>
            <div className={styles.heroCta}>
              <a href="#contact" className="btn btn-primary">
                Обсудить внедрение
              </a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className={`${styles.services} bg-surface-low`}>
          <div className="container">
            <h2 className="section-title">Что мы делаем</h2>
            <div className={styles.servicesGrid}>
              {SERVICES.map((s) => (
                <div key={s.title} className={styles.serviceCard}>
                  <h3 className={styles.serviceTitle}>{fixTypography(s.title)}</h3>
                  <p className={styles.serviceDesc}>{fixTypography(s.desc)}</p>
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

        {/* Steps */}
        <section className={`${styles.steps} bg-surface-low`}>
          <div className="container">
            <h2 className="section-title">Как мы работаем</h2>
            <div className={styles.stepsGrid}>
              {STEPS.map((s) => (
                <div key={s.num} className={styles.stepCard}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <h3 className={styles.stepTitle}>{fixTypography(s.title)}</h3>
                  <p className={styles.stepDesc}>{fixTypography(s.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Form */}
        <section className={styles.contact} id="contact">
          <div className="container">
            {sent ? (
              <div className={styles.successWrap}>
                <h2 className="section-title">Заявка получена</h2>
                <p className={styles.whyText}>Мы свяжемся с вами в течение рабочего дня.</p>
              </div>
            ) : (
              <div className={styles.formSplit}>
                <div className={styles.formText}>
                  <h2 className="section-title">{fixTypography("ИИ должен не удивлять, а помогать")}</h2>
                  <p className={styles.whyText}>
                    {fixTypography("Если автоматизация не экономит время и не снижает хаос — значит она сделана ради галочки. Мы за другой подход: маленькими шагами, с понятной логикой и пользой.")}
                  </p>
                  <div className={styles.contacts}>
                    <a href="tel:+79788545123" className={styles.contactLink}>+7 978 85 45 123</a>
                    <a href="https://t.me/letoff_tv" className={styles.contactLink}>Telegram: @letoff_tv</a>
                  </div>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label>Имя</label>
                      <input type="text" name="name" required placeholder="Как вас зовут?" />
                    </div>
                    <div className={styles.formField}>
                      <label>Компания</label>
                      <input type="text" name="company" placeholder="Ваш бизнес" />
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
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
