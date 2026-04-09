'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
} from 'date-fns';
import { monthNames } from '@/utils/monthImages';
import { formatDateKey } from '@/utils/calendarHelpers';

interface MiniCalendarProps {
  year: number;
  month: number;
  isDark: boolean;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ year, month, isDark }) => {
  const monthStart = startOfMonth(new Date(year, month));
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const dayHeaders = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // ✅ FIX: Compute today only on client
  const [todayKey, setTodayKey] = useState<string>('');

  useEffect(() => {
    setTodayKey(formatDateKey(new Date()));
  }, []);

  return (
    <motion.div
      className="p-3 rounded-xl shadow-2xl border w-[180px]"
      style={{
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        borderColor: isDark ? '#374151' : '#E5E7EB',
      }}
      initial={{ opacity: 0, scale: 0.8, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 5 }}
      transition={{ duration: 0.15 }}
    >
      <p
        className="text-xs font-bold text-center mb-2"
        style={{ color: isDark ? '#F3F4F6' : '#111827' }}
      >
        {monthNames[month]} {year}
      </p>

      <div className="grid grid-cols-7 gap-0">
        {dayHeaders.map((d, i) => (
          <div
            key={i}
            className="text-center text-[8px] font-bold pb-1"
            style={{ color: i >= 5 ? '#EF4444' : isDark ? '#9CA3AF' : '#6B7280' }}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0">
        {days.map((day, idx) => {
          const inMonth = isSameMonth(day, monthStart);
          const dayKey = formatDateKey(day);
          const isToday = todayKey !== '' && dayKey === todayKey;
          const dayOfWeek = day.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          return (
            <div
              key={idx}
              className="text-center py-0.5 text-[9px] font-medium"
              style={{
                color: !inMonth
                  ? isDark
                    ? '#4B5563'
                    : '#D1D5DB'
                  : isToday
                  ? '#3B82F6'
                  : isWeekend
                  ? '#EF4444'
                  : isDark
                  ? '#D1D5DB'
                  : '#374151',
                fontWeight: isToday ? 800 : 500,
                textDecoration: isToday ? 'underline' : 'none',
              }}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MiniCalendar;