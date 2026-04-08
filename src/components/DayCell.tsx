'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarEvent } from '@/types';
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
  themeColors,
}) => {
  const dayNumber = format(date, 'd');

  const getCellStyle = (): React.CSSProperties => {
    // Selected start or end dates = fully filled
    if (isRangeStart || isRangeEnd) {
      return {
        backgroundColor: themeColors.selectStart,
        color: themeColors.selectStartText,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      };
    }
    // Dates in between the range = light fill
    if (isInRange) {
      return {
        backgroundColor: themeColors.selectRange,
        color: themeColors.selectRangeText,
      };
    }
    // Single selected date (first click before second click) = fully filled
    if (isSelected) {
      return {
        backgroundColor: themeColors.selectStart,
        color: themeColors.selectStartText,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      };
    }
    // Today = OUTLINE ONLY, not filled
    if (isToday) {
      return {
        backgroundColor: 'transparent',
        border: `2px solid ${themeColors.todayBg}`,
        color: themeColors.todayBg,
      };
    }
    return {};
  };

  const getTextColor = (): string => {
    // If we have custom style, text color is handled by inline style
    if (isRangeStart || isRangeEnd || isSelected) return '';
    if (isToday) return '';
    if (!isCurrentMonth) return 'text-gray-300';
    if (isWeekend) return 'text-red-500';
    return 'text-gray-800';
  };

  const cellStyle = getCellStyle();
  const hasCustomStyle = Object.keys(cellStyle).length > 0;

  return (
    <motion.button
      onClick={() => onClick(date)}
      className={`
        relative flex flex-col items-center justify-start p-1 sm:p-2
        rounded-xl transition-all duration-200 min-h-[44px] sm:min-h-[60px]
        group cursor-pointer
        ${!hasCustomStyle ? 'hover:bg-gray-100' : ''}
        ${!isCurrentMonth ? 'opacity-40' : ''}
      `}
      style={cellStyle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <span
        className={`text-xs sm:text-sm font-bold leading-none ${getTextColor()}`}
        style={hasCustomStyle && cellStyle.color ? { color: cellStyle.color as string } : {}}
      >
        {dayNumber}
      </span>

      {/* Event dots */}
      {events.length > 0 && (
        <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
          {events.slice(0, 3).map((event) => (
            <EventBadge key={event.id} event={event} compact />
          ))}
          {events.length > 3 && (
            <span className="text-[8px] text-gray-400 font-bold">
              +{events.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Hover tooltip for events */}
      {events.length > 0 && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap max-w-[200px]">
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