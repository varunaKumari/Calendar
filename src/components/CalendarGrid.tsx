'use client';

import React, { useState, useEffect } from 'react';
import { isSameMonth, getDate, getMonth } from 'date-fns';
import { dayNames, monthThemeColors } from '@/utils/monthImages';
import { formatDateKey } from '@/utils/calendarHelpers';
import { getHolidayForDate } from '@/utils/holidays';
import { CalendarEvent } from '@/types';
import DayCell from './DayCell';

interface CalendarGridProps {
  days: Date[];
  currentYear: number;
  currentMonth: number;
  selectedDate: string | null;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  isDark: boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  currentYear,
  currentMonth,
  selectedDate,
  events,
  onDateClick,
  isDark,
}) => {
  const monthDate = new Date(currentYear, currentMonth);
  const theme = monthThemeColors[currentMonth] || monthThemeColors[0];

  // ✅ FIX 1: Compute todayKey ONLY on client (avoids UTC vs local mismatch on Vercel)
  const [todayKey, setTodayKey] = useState<string>('');

  useEffect(() => {
    setTodayKey(formatDateKey(new Date()));
  }, []);

  const themeColors = {
    selectStart: theme.selectStart,
    selectEnd: theme.selectEnd,
    selectRange: theme.selectRange,
    selectRangeText: theme.selectRangeText,
    selectStartText: theme.selectStartText,
    todayBg: theme.todayBg,
    hoverBg: theme.hoverBg,
  };

  const getEventsForDay = (date: Date): CalendarEvent[] => {
    const key = formatDateKey(date);
    return events.filter((e) => e.date === key);
  };

  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((name, i) => (
          <div
            key={name}
            className="text-center text-[10px] sm:text-xs font-bold py-2"
            style={{
              color: i >= 5 ? '#EF4444' : isDark ? '#6B7280' : '#9CA3AF',
            }}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {days.map((day) => {
          const dayOfWeek = day.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const dateKey = formatDateKey(day);

          // ✅ FIX 2: Only mark today AFTER client mount (todayKey is '' during SSR)
          const isToday = todayKey !== '' && dateKey === todayKey;
          const isSelected = selectedDate !== null && selectedDate === dateKey;

          const holiday = getHolidayForDate(getMonth(day), getDate(day));

          return (
            <DayCell
              // ✅ FIX 3: Use dateKey as key so React doesn't reuse DOM nodes across months
              key={dateKey}
              date={day}
              isCurrentMonth={isSameMonth(day, monthDate)}
              isToday={isToday}
              isSelected={isSelected}
              isInRange={false}
              isRangeStart={false}
              isRangeEnd={false}
              events={getEventsForDay(day)}
              onClick={onDateClick}
              isWeekend={isWeekend}
              holiday={holiday}
              isDark={isDark}
              themeColors={themeColors}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;