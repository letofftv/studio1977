"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Обзор", href: "/studio", tooltip: "Обзор работы" },
    { label: "Проекты", href: "/studio/projects", tooltip: "Все проекты" },
    { label: "Задачи", href: "/studio/tasks", tooltip: "Мои задачи" },
    { label: "Клиенты", href: "/studio/clients", tooltip: "База клиентов" },
    { label: "Лиды", href: "/studio/leads", tooltip: "Входящие лиды" },
    { label: "Команда", href: "/studio/team", tooltip: "Команда" },
    { label: "Настройки", href: "/studio/settings", tooltip: "Настройки кабинета" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <span className={styles.logoMark}>1977</span>
        <div className={styles.logoInfo}>
          <span className={styles.logoText}>Студия 1977</span>
          <span className={styles.logoSub}>Рабочее пространство</span>
        </div>
      </div>
      
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={isActive ? styles.navActive : ""}
              title={item.tooltip}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.sidebarMeta}>1977 CRM Workspace</div>
        <Link href="/api/auth/logout" className={styles.sidebarLogout}>
          Выйти
        </Link>
        <Link href="/" className={styles.sidebarBack}>
          ← На сайт
        </Link>
      </div>
    </aside>
  );
}
