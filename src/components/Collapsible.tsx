"use client";

import { useState } from "react";
import styles from "./Collapsible.module.css";

interface Props {
  title?: string;
  children: React.ReactNode;
  collapsedLabel?: string;
  expandedLabel?: string;
}

export default function Collapsible({ 
  children, 
  collapsedLabel = "Подробнее", 
  expandedLabel = "Свернуть" 
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.content} ${isExpanded ? styles.expanded : ""}`}>
        {children}
      </div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className={styles.trigger}
      >
        {isExpanded ? expandedLabel : collapsedLabel}
        <span className={`${styles.arrow} ${isExpanded ? styles.arrowRotated : ""}`}>↓</span>
      </button>
    </div>
  );
}
