'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarEvent } from '@/types';
import { Holiday } from '@/utils/holidays';
import EventBadge from './EventBadge';

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  events: CalendarEvent[];
  onClick: (date: Date) => void;
  isWeekend: boolean;
  holiday?: Holiday;
  isDark: boolean;
  themeColors: {
    selectStart: string;
    selectEnd: string;
    selectRange: string;
    selectRangeText: string;
    selectStartText: string;
    todayBg: string;
    hoverBg: string;
  };
}

const DayCell: React.FC<DayCellProps> = ({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  events,
  onClick,
  isWeekend,
  holiday,
  isDark,
  themeColors,
}) => {
  const dayNumber = format(date, 'd');

  let cellBg = 'transparent';
  let cellColor = isDark ? '#E5E7EB' : '#1F2937';
  // ✅ FIX: Always keep a 2px border (transparent by default) to prevent layout shifts
  let cellBorder = '2px solid transparent';
  let cellShadow = 'none';

  if (!isCurrentMonth) {
    cellColor = isDark ? '#4B5563' : '#D1D5DB';
  } else if (isSelected) {
    cellBg = themeColors.selectStart;
    cellColor = themeColors.selectStartText;
    cellShadow = '0 2px 6px rgba(0,0,0,0.15)';
  } else if (isToday) {
    cellBg = 'transparent';
    cellColor = themeColors.todayBg;
    cellBorder = `2px solid ${themeColors.todayBg}`;
  } else if (isWeekend) {
    cellColor = '#EF4444';
  }

  const getHolidayTextColor = (): string => {
    if (isSelected) return 'rgba(255,255,255,0.75)';
    if (isToday) return themeColors.todayBg;
    return isDark ? '#FCD34D' : '#B45309';
  };

  const tooltipBg = isDark ? '#1F2937' : '#FFFFFF';
  const tooltipBorder = isDark ? '#374151' : '#E5E7EB';
  const tooltipShadow = isDark
    ? '0 4px 16px rgba(0,0,0,0.4)'
    : '0 4px 16px rgba(0,0,0,0.1)';

  return (
    <motion.button
      onClick={() => onClick(date)}
      className={`
        relative flex flex-col items-center justify-start p-1 sm:p-1.5
        rounded-xl transition-colors duration-200
        min-h-[50px] sm:min-h-[68px]
        group cursor-pointer
        ${!isCurrentMonth ? 'opacity-40' : ''}
      `}
      style={{
        backgroundColor: cellBg,
        color: cellColor,
        border: cellBorder,
        boxShadow: cellShadow,
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: isSelected
          ? themeColors.selectStart
          : isToday
          ? 'transparent'
          : isDark
          ? '#374151'
          : '#F3F4F6',
      }}
      whileTap={{ scale: 0.92 }}
    >
      <span
        className="text-xs sm:text-sm font-bold leading-none"
        style={{ color: cellColor }}
      >
        {dayNumber}
      </span>

      {holiday && isCurrentMonth && (
        <span
          className="text-[5px] sm:text-[7px] leading-tight font-semibold text-center w-full px-0.5 mt-0.5 truncate"
          style={{ color: getHolidayTextColor() }}
        >
          {holiday.name}
        </span>
      )}

      {events.length > 0 && (
        <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
          {events.slice(0, 3).map((event) => (
            <EventBadge key={event.id} event={event} compact />
          ))}
          {events.length > 3 && (
            <span className="text-[7px] text-gray-400 font-bold">
              +{events.length - 3}
            </span>
          )}
        </div>
      )}

      {holiday && isCurrentMonth && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-30 pointer-events-none">
          <div
            className="text-[10px] font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap"
            style={{
              backgroundColor: tooltipBg,
              color: isDark ? '#FCD34D' : '#92400E',
              border: `1px solid ${tooltipBorder}`,
              boxShadow: tooltipShadow,
            }}
          >
            {holiday.name}
          </div>
        </div>
      )}

      {events.length > 0 && !holiday && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
          <div
            className="text-xs rounded-lg px-3 py-2 whitespace-nowrap max-w-[200px]"
            style={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              boxShadow: tooltipShadow,
            }}
          >
            {events.slice(0, 3).map((e) => (
              <div key={e.id} className="flex items-center gap-1.5 py-0.5">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: e.color }}
                />
                <span
                  className="truncate text-[11px] font-medium"
                  style={{ color: isDark ? '#E5E7EB' : '#374151' }}
                >
                  {e.title}
                </span>
              </div>
            ))}
            {events.length > 3 && (
              <div
                className="text-[10px] mt-1"
                style={{ color: isDark ? '#6B7280' : '#9CA3AF' }}
              >
                +{events.length - 3} more
              </div>
            )}
          </div>
        </div>
      )}
    </motion.button>
  );
};

export default DayCell;