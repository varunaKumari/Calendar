'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, subMonths } from 'date-fns';
import { monthNames } from '@/utils/monthImages';
import MiniCalendar from './MiniCalendar';

interface MonthNavigatorProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  isDark: boolean;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  year,
  month,
  onPrev,
  onNext,
  isDark,
}) => {
  const [showPrevPreview, setShowPrevPreview] = useState(false);
  const [showNextPreview, setShowNextPreview] = useState(false);

  const prevDate = subMonths(new Date(year, month), 1);
  const nextDate = addMonths(new Date(year, month), 1);

  return (
    <div className="flex items-center justify-between px-2 py-3">
      {/* Previous button with mini calendar */}
      <div className="relative">
        <motion.button
          onClick={onPrev}
          onMouseEnter={() => setShowPrevPreview(true)}
          onMouseLeave={() => setShowPrevPreview(false)}
          className="p-2 rounded-full transition-colors"
          style={{
            backgroundColor: 'transparent',
          }}
          whileHover={{ scale: 1.1, backgroundColor: isDark ? '#374151' : '#F3F4F6' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} style={{ color: isDark ? '#D1D5DB' : '#4B5563' }} />
        </motion.button>

        {/* Mini calendar preview - previous month */}
        <AnimatePresence>
          {showPrevPreview && (
            <div className="absolute top-full left-0 mt-2 z-40">
              <MiniCalendar
                year={prevDate.getFullYear()}
                month={prevDate.getMonth()}
                isDark={isDark}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Month/Year title */}
      <motion.div
        key={`${year}-${month}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2
          className="text-xl sm:text-2xl font-extrabold tracking-tight"
          style={{ color: isDark ? '#F9FAFB' : '#111827' }}
        >
          {monthNames[month]}
        </h2>
        <p
          className="text-xs sm:text-sm font-medium"
          style={{ color: isDark ? '#6B7280' : '#9CA3AF' }}
        >
          {year}
        </p>
      </motion.div>

      {/* Next button with mini calendar */}
      <div className="relative">
        <motion.button
          onClick={onNext}
          onMouseEnter={() => setShowNextPreview(true)}
          onMouseLeave={() => setShowNextPreview(false)}
          className="p-2 rounded-full transition-colors"
          style={{
            backgroundColor: 'transparent',
          }}
          whileHover={{ scale: 1.1, backgroundColor: isDark ? '#374151' : '#F3F4F6' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next month"
        >
          <ChevronRight size={20} style={{ color: isDark ? '#D1D5DB' : '#4B5563' }} />
        </motion.button>

        {/* Mini calendar preview - next month */}
        <AnimatePresence>
          {showNextPreview && (
            <div className="absolute top-full right-0 mt-2 z-40">
              <MiniCalendar
                year={nextDate.getFullYear()}
                month={nextDate.getMonth()}
                isDark={isDark}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MonthNavigator;