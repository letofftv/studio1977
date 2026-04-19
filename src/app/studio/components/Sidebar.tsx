"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Дашборд", href: "/studio" },
    { label: "Проекты", href: "/studio/projects" },
    { label: "Задачи", href: "/studio/tasks" },
    { label: "Клиенты", href: "/studio/clients" },
    { label: "Лиды", href: "/studio/leads" },
    { label: "Команда", href: "/studio/team" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <span className={styles.logoMark}>1977</span>
        <span className={styles.logoText}>Студия</span>
      </div>
      
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
        <Link href="/api/auth/logout" className={styles.sidebarLogout}>
          Выйти из системы
        </Link>
        <Link href="/" className={styles.sidebarBack}>
          ← На сайт
        </Link>
      </div>
    </aside>
  );
}
