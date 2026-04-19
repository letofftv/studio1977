"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Обзор", href: "/studio" },
    { label: "Проекты", href: "/studio/projects" },
    { label: "Задачи", href: "/studio/tasks" },
    { label: "Клиенты", href: "/studio/clients" },
    { label: "Лиды", href: "/studio/leads" },
    { label: "Команда", href: "/studio/team" },
  ];

  return (
    <aside className={styles.sidebar}>
        <Link href="/studio" className={styles.logo}>
          <span className={styles.logoText}>Студия</span>
          <span className={styles.logoMark}>1977</span>
        </Link>
      
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={isActive ? styles.navActive : ""}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <a href="/api/auth/logout" className={styles.sidebarLogout}>
          Выйти из системы
        </a>
        <Link href="/" className={styles.sidebarBack}>
          ← На сайт
        </Link>
      </div>
    </aside>
  );
}
