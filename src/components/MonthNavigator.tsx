'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { monthNames } from '@/utils/monthImages';

interface MonthNavigatorProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  year,
  month,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-between px-2 py-3">
      <motion.button
        onClick={onPrev}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous month"
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </motion.button>

      <motion.div
        key={`${year}-${month}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          {monthNames[month]}
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium">{year}</p>
      </motion.div>

      <motion.button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next month"
      >
        <ChevronRight size={20} className="text-gray-600" />
      </motion.button>
    </div>
  );
};

export default MonthNavigator;