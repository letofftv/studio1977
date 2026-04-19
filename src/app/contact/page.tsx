import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Контакты Студии 1977",
  description: "Свяжитесь со Студией 1977, чтобы обсудить маркетинг, сайт, CRM, автоматизацию, брендинг, событие или перезапуск проекта.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>Давайте обсудим, что нужно вашему проекту</h1>
            <p className={styles.lead}>
              Можно прийти с готовым ТЗ, а можно с коротким сообщением в духе «у нас всё есть, но ничего не работает как надо».
            </p>
          </div>
        </section>

        <section className={`section ${styles.content}`}>
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.info}>
                <div className={styles.block}>
                  <h3>Написать</h3>
                  <a href="mailto:hello@studio1977.ru" className={styles.contactValue}>hello@studio1977.ru</a>
                  <p className={styles.subtext}>Подходит для запросов, брифов, материалов и документов.</p>
                </div>

                <div className={styles.block}>
                  <h3>Позвонить</h3>
                  <a href="tel:+79001234567" className={styles.contactValue}>+7 900 123-45-67</a>
                  <p className={styles.subtext}>Если нужно быстро понять, можем ли быть полезны.</p>
                </div>

                <div className={styles.block}>
                  <h3>Где работаем</h3>
                  <p className={styles.contactValue}>Республика Крым</p>
                  <p className={styles.subtext}>Работаем с крымскими проектами и задачами за пределами региона удалённо.</p>
                </div>

                <div className={styles.messengers}>
                  <div className={styles.messengerButtons}>
                    <a href="https://t.me/letoff_tv" className="btn btn-outline">Написать в Telegram</a>
                    <a href="#" className="btn btn-outline">Написать в WhatsApp</a>
                  </div>
                  <p className={styles.subtext} style={{ marginTop: "16px" }}>
                    Для первого контакта достаточно пары предложений о задаче.
                  </p>
                </div>
              </div>

              <div className={styles.helpBox}>
                <h3>Что лучше написать сразу</h3>
                <ul className={styles.helpList}>
                  <li>чем занимается ваш бизнес или проект</li>
                  <li>что сейчас не устраивает</li>
                  <li>какой результат хотите получить</li>
                  <li>есть ли сроки</li>
                  <li>есть ли сайт, соцсети или CRM</li>
                </ul>
                <p className={styles.helpFoot}>
                  Не страшно, если пока нет точной формулировки. Задача часто становится понятной только после первого разговора.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
