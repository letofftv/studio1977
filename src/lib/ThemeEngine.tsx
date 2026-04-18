"use client";

import { useEffect } from "react";

type Theme = "day" | "nightshift" | "night";

function getThemeForHour(hour: number): Theme {
  if (hour >= 7 && hour < 19) return "day";
  if (hour >= 19 && hour < 22) return "nightshift";
  return "night";
}

export function ThemeEngine() {
  useEffect(() => {
    function applyTheme() {
      const hour = new Date().getHours();
      const theme = getThemeForHour(hour);
      document.documentElement.setAttribute("data-theme", theme);
    }

    applyTheme();

    // Re-check every minute
    const interval = setInterval(applyTheme, 60_000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
