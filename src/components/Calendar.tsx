'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { useEvents } from '@/hooks/useEvents';
import { useDarkMode } from '@/hooks/useDarkMode';
import { monthThemeColors } from '@/utils/monthImages';
import HeroImage from './HeroImage';
import MonthNavigator from './MonthNavigator';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import AddEventModal from './AddEventModal';
import DarkModeToggle from './DarkModeToggle';

const Calendar: React.FC = () => {
  const {
    currentMonth,
    calendarDays,
    selectedDate,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    handleDateClick,
  } = useCalendar();

  const {
    addEvent,
    deleteEvent,
    getEventsForMonth,
    addNote,
    deleteNote,
    getAllNotesForMonth,
  } = useEvents();

  const [isDark, toggleDark] = useDarkMode();
  const [showAddEvent, setShowAddEvent] = useState(false);

  const monthEvents = useMemo(
    () => getEventsForMonth(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month, getEventsForMonth]
  );

  const monthKey = `general-${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, '0')}`;

  const allMonthNotes = useMemo(
    () => getAllNotesForMonth(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month, getAllNotesForMonth]
  );

  const defaultEventDate =
    selectedDate ||
    `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, '0')}-01`;

  const theme = monthThemeColors[currentMonth.month] || monthThemeColors[0];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
          : 'linear-gradient(135deg, #F1F5F9 0%, #EFF6FF 50%, #E0E7FF 100%)',
      }}
    >
      {/* Dark Mode Toggle - fixed top right */}
      <DarkModeToggle isDark={isDark} onToggle={toggleDark} />

      <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Wall calendar card */}
        <div
          className="rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border transition-colors duration-500"
          style={{
            backgroundColor: isDark ? '#111827' : '#FFFFFF',
            borderColor: isDark ? '#1F2937' : '#E5E7EB80',
          }}
        >
          {/* Hero Image */}
          <HeroImage month={currentMonth.month} year={currentMonth.year} />

          {/* Bottom section */}
          <div className="p-4 sm:p-6">
            {/* Month Navigator with mini calendar previews */}
            <MonthNavigator
              year={currentMonth.year}
              month={currentMonth.month}
              onPrev={goToPrevMonth}
              onNext={goToNextMonth}
              isDark={isDark}
            />

            {/* Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Calendar Grid with Today button */}
              <div className="lg:col-span-2 relative pb-12">
                <CalendarGrid
                  days={calendarDays}
                  currentYear={currentMonth.year}
                  currentMonth={currentMonth.month}
                  selectedDate={selectedDate}
                  events={monthEvents}
                  onDateClick={handleDateClick}
                  isDark={isDark}
                />

                {/* Today button - bottom right of calendar */}
                <motion.button
                  onClick={goToToday}
                  className="absolute bottom-0 right-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-md transition-all"
                  style={{
                    backgroundColor: theme.accentColor,
                    color: 'white',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  title="Jump to current month"
                >
                  <CalendarCheck size={14} />
                  Today
                </motion.button>
              </div>

              {/* Notes Section */}
              <div className="lg:col-span-1">
                <NotesSection
                  allMonthNotes={allMonthNotes}
                  selectedDate={selectedDate}
                  monthKey={monthKey}
                  currentMonth={currentMonth.month}
                  isDark={isDark}
                  onAddNote={addNote}
                  onDeleteNote={deleteNote}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs mt-4 font-medium"
          style={{ color: isDark ? '#4B5563' : '#9CA3AF' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Interactive Wall Calendar • Built with Next.js & Framer Motion
        </motion.p>
      </motion.div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={showAddEvent}
        onClose={() => setShowAddEvent(false)}
        onAdd={addEvent}
        defaultDate={defaultEventDate}
      />
    </div>
  );
};

export default Calendar;