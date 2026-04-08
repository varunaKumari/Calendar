'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-colors"
      style={{
        backgroundColor: isDark ? '#374151' : '#FFFFFF',
        border: isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
      }}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon size={20} className="text-yellow-400" />
        ) : (
          <Sun size={20} className="text-orange-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;