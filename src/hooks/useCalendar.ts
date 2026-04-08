'use client';

import { useState, useCallback, useMemo } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { getCalendarDays, formatDateKey } from '@/utils/calendarHelpers';
import { MonthData } from '@/types';

export function useCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<MonthData>({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarDays = useMemo(
    () => getCalendarDays(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month]
  );

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const next = addMonths(new Date(prev.year, prev.month), 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
    setSelectedDate(null);
  }, []);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const next = subMonths(new Date(prev.year, prev.month), 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
    setSelectedDate(null);
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth({ year: now.getFullYear(), month: now.getMonth() });
    setSelectedDate(formatDateKey(now));
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      const dateKey = formatDateKey(date);
      // If same date clicked again, deselect
      if (selectedDate === dateKey) {
        setSelectedDate(null);
      } else {
        setSelectedDate(dateKey);
      }
    },
    [selectedDate]
  );

  const clearSelection = useCallback(() => {
    setSelectedDate(null);
  }, []);

  return {
    currentMonth,
    calendarDays,
    selectedDate,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    handleDateClick,
    clearSelection,
  };
}