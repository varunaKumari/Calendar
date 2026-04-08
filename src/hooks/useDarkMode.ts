'use client';

import { useState, useEffect, useCallback } from 'react';

export function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('calendar-dark-mode');
      if (saved === 'true') {
        setIsDark(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem('calendar-dark-mode', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return [isDark, toggle];
}