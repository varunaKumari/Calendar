'use client';

import React from 'react';
import { isSameMonth, isSameDay } from 'date-fns';
import { dayNames, monthThemeColors } from '@/utils/monthImages';
import { formatDateKey } from '@/utils/calendarHelpers';
import { CalendarEvent } from '@/types';
import DayCell from './DayCell';

interface CalendarGridProps {
  days: Date[];
  currentYear: number;
  currentMonth: number;
  selectedDate: string | null;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  currentYear,
  currentMonth,
  selectedDate,
  events,
  onDateClick,
}) => {
  const today = new Date();
  const monthDate = new Date(currentYear, currentMonth);
  const theme = monthThemeColors[currentMonth] || monthThemeColors[0];

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
            className={`text-center text-[10px] sm:text-xs font-bold py-2 ${
              i >= 5 ? 'text-red-400' : 'text-gray-400'
            }`}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {days.map((day, idx) => {
          const dayOfWeek = day.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const dateKey = formatDateKey(day);
          const isSelected = selectedDate !== null && dateKey === selectedDate;

          return (
            <DayCell
              key={idx}
              date={day}
              isCurrentMonth={isSameMonth(day, monthDate)}
              isToday={isSameDay(day, today)}
              isSelected={isSelected}
              isInRange={false}
              isRangeStart={false}
              isRangeEnd={false}
              events={getEventsForDay(day)}
              onClick={onDateClick}
              isWeekend={isWeekend}
              themeColors={themeColors}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;