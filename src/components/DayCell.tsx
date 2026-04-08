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
  isInRange,
  isRangeStart,
  isRangeEnd,
  events,
  onClick,
  isWeekend,
  holiday,
  isDark,
  themeColors,
}) => {
  const dayNumber = format(date, 'd');

  const getCellStyle = (): React.CSSProperties => {
    if (isRangeStart || isRangeEnd) {
      return {
        backgroundColor: themeColors.selectStart,
        color: themeColors.selectStartText,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      };
    }
    if (isInRange) {
      return {
        backgroundColor: themeColors.selectRange,
        color: themeColors.selectRangeText,
      };
    }
    if (isSelected) {
      return {
        backgroundColor: themeColors.selectStart,
        color: themeColors.selectStartText,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      };
    }
    if (isToday) {
      return {
        backgroundColor: 'transparent',
        border: `2px solid ${themeColors.todayBg}`,
        color: themeColors.todayBg,
      };
    }
    return {};
  };

  const getTextColor = (): string | undefined => {
    if (isRangeStart || isRangeEnd || isSelected || isToday) return undefined;
    if (!isCurrentMonth) return isDark ? '#4B5563' : '#D1D5DB';
    if (isWeekend) return '#EF4444';
    return isDark ? '#E5E7EB' : '#1F2937';
  };

  const getHolidayTextColor = (): string => {
    if (isSelected || isRangeStart || isRangeEnd) return 'rgba(255,255,255,0.75)';
    if (isToday) return themeColors.todayBg;
    return isDark ? '#FCD34D' : '#B45309';
  };

  const cellStyle = getCellStyle();
  const hasCustomStyle = Object.keys(cellStyle).length > 0;
  const textColor = getTextColor();

  return (
    <motion.button
      onClick={() => onClick(date)}
      className={`
        relative flex flex-col items-center justify-start p-1 sm:p-1.5
        rounded-xl transition-all duration-200
        min-h-[50px] sm:min-h-[68px]
        group cursor-pointer
        ${!isCurrentMonth ? 'opacity-40' : ''}
      `}
      style={cellStyle}
      whileHover={{
        scale: 1.05,
        backgroundColor: hasCustomStyle ? undefined : isDark ? '#374151' : '#F3F4F6',
      }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Date number */}
      <span
        className="text-xs sm:text-sm font-bold leading-none"
        style={{
          color: hasCustomStyle ? (cellStyle.color as string) : textColor,
        }}
      >
        {dayNumber}
      </span>

      {/* Holiday name written inside the cell */}
      {holiday && isCurrentMonth && (
        <span
          className="text-[5px] sm:text-[7px] leading-tight font-semibold text-center w-full px-0.5 mt-0.5 truncate"
          style={{ color: getHolidayTextColor() }}
        >
          {holiday.name}
        </span>
      )}

      {/* Event dots */}
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

      {/* Full holiday name tooltip on hover */}
      {holiday && isCurrentMonth && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-30 pointer-events-none">
          <div
            className="text-[10px] font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap"
            style={{
              backgroundColor: isDark ? '#1F2937' : '#111827',
              color: '#FCD34D',
              border: isDark ? '1px solid #374151' : 'none',
            }}
          >
            {holiday.name}
          </div>
        </div>
      )}

      {/* Event tooltip on hover (only if no holiday) */}
      {events.length > 0 && !holiday && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
          <div
            className="text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap max-w-[200px]"
            style={{
              backgroundColor: isDark ? '#1F2937' : '#111827',
              color: '#FFFFFF',
            }}
          >
            {events.slice(0, 3).map((e) => (
              <div key={e.id} className="flex items-center gap-1.5 py-0.5">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: e.color }}
                />
                <span className="truncate">{e.title}</span>
              </div>
            ))}
            {events.length > 3 && (
              <div className="text-gray-400 text-[10px] mt-1">
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