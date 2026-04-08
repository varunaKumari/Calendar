'use client';

import { useState, useCallback, useMemo } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { getCalendarDays, formatDateKey } from '@/utils/calendarHelpers';
import { MonthData } from '@/types';

const MIN_YEAR = 1000;
const MAX_YEAR = 3000;

export function useCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<MonthData>({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  // Do NOT pre-select today — start with null
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarDays = useMemo(
    () => getCalendarDays(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month]
  );

  const isWithinLimits = (year: number): boolean => {
    return year >= MIN_YEAR && year <= MAX_YEAR;
  };

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const next = addMonths(new Date(prev.year, prev.month), 1);
      if (!isWithinLimits(next.getFullYear())) return prev;
      return { year: next.getFullYear(), month: next.getMonth() };
    });
    setSelectedDate(null);
  }, []);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const next = subMonths(new Date(prev.year, prev.month), 1);
      if (!isWithinLimits(next.getFullYear())) return prev;
      return { year: next.getFullYear(), month: next.getMonth() };
    });
    setSelectedDate(null);
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    // Use formatDateKey for consistent string-based date key
    const todayKey = formatDateKey(now);
    setCurrentMonth({ year: now.getFullYear(), month: now.getMonth() });
    setSelectedDate(todayKey);
  }, []);

  const goToDate = useCallback(
    (year: number, month: number, dateKey: string): boolean => {
      if (!isWithinLimits(year)) return false;
      setCurrentMonth({ year, month });
      setSelectedDate(dateKey);
      return true;
    },
    []
  );

  const handleDateClick = useCallback(
    (date: Date) => {
      const dateKey = formatDateKey(date);
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

  const canGoNext = currentMonth.year < MAX_YEAR || currentMonth.month < 11;
  const canGoPrev = currentMonth.year > MIN_YEAR || currentMonth.month > 0;

  return {
    currentMonth,
    calendarDays,
    selectedDate,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate,
    handleDateClick,
    clearSelection,
    canGoNext,
    canGoPrev,
    MIN_YEAR,
    MAX_YEAR,
  };
}