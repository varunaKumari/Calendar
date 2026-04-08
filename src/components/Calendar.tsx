'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, CalendarSearch, X } from 'lucide-react';
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
    goToDate,
    handleDateClick,
    canGoNext,
    canGoPrev,
    MIN_YEAR,
    MAX_YEAR,
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
  const [showGoToDate, setShowGoToDate] = useState(false);
  const [goToDateValue, setGoToDateValue] = useState('');
  const [goToDateError, setGoToDateError] = useState('');

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

  const handleGoToDate = () => {
    if (!goToDateValue) {
      setGoToDateError('Please select a date');
      return;
    }

    const parts = goToDateValue.split('-');
    if (parts.length !== 3) {
      setGoToDateError('Invalid date format');
      return;
    }

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;

    if (isNaN(year) || isNaN(month)) {
      setGoToDateError('Invalid date');
      return;
    }

    if (year < MIN_YEAR || year > MAX_YEAR) {
      setGoToDateError(`Year must be ${MIN_YEAR}–${MAX_YEAR}`);
      return;
    }

    const success = goToDate(year, month, goToDateValue);
    if (success) {
      setShowGoToDate(false);
      setGoToDateValue('');
      setGoToDateError('');
    } else {
      setGoToDateError(`Year must be ${MIN_YEAR}–${MAX_YEAR}`);
    }
  };

  const closeGoToDate = () => {
    setShowGoToDate(false);
    setGoToDateValue('');
    setGoToDateError('');
  };

  // Min/max for date input
  const minDateStr = `${MIN_YEAR}-01-01`;
  const maxDateStr = `${MAX_YEAR}-12-31`;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
          : 'linear-gradient(135deg, #F1F5F9 0%, #EFF6FF 50%, #E0E7FF 100%)',
      }}
    >
      <DarkModeToggle isDark={isDark} onToggle={toggleDark} />

      <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className="rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border transition-colors duration-500"
          style={{
            backgroundColor: isDark ? '#111827' : '#FFFFFF',
            borderColor: isDark ? '#1F2937' : '#E5E7EB80',
          }}
        >
          <HeroImage month={currentMonth.month} year={currentMonth.year} />

          <div className="p-4 sm:p-6">
            <MonthNavigator
              year={currentMonth.year}
              month={currentMonth.month}
              onPrev={goToPrevMonth}
              onNext={goToNextMonth}
              isDark={isDark}
              canGoNext={canGoNext}
              canGoPrev={canGoPrev}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 relative pb-14">
                <CalendarGrid
                  days={calendarDays}
                  currentYear={currentMonth.year}
                  currentMonth={currentMonth.month}
                  selectedDate={selectedDate}
                  events={monthEvents}
                  onDateClick={handleDateClick}
                  isDark={isDark}
                />

                {/* Bottom bar: Go to Date + Today */}
                <div className="absolute bottom-0 right-2 flex items-center gap-2">
                  {/* Go to Date */}
                  <div className="relative">
                    <motion.button
                      onClick={() => {
                        setShowGoToDate(!showGoToDate);
                        setGoToDateError('');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all"
                      style={{
                        backgroundColor: 'transparent',
                        color: theme.accentColor,
                        border: `1.5px solid ${theme.accentColor}`,
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0 2px 8px ${theme.accentColor}30`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      title="Go to a specific date"
                    >
                      <CalendarSearch size={14} />
                      Go to Date
                    </motion.button>

                    {/* Date picker dropdown */}
                    <AnimatePresence>
                      {showGoToDate && (
                        <motion.div
                          className="absolute bottom-full right-0 mb-2 p-3 rounded-xl shadow-xl border z-40 w-[240px]"
                          style={{
                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                            borderColor: isDark ? '#374151' : '#E5E7EB',
                          }}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p
                              className="text-xs font-semibold"
                              style={{ color: isDark ? '#E5E7EB' : '#374151' }}
                            >
                              Jump to date
                            </p>
                            <button
                              onClick={closeGoToDate}
                              className="p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <X
                                size={12}
                                style={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
                              />
                            </button>
                          </div>

                          {/* Year range hint */}
                          <p
                            className="text-[9px] mb-2 font-medium"
                            style={{ color: isDark ? '#6B7280' : '#9CA3AF' }}
                          >
                            Range: {MIN_YEAR} – {MAX_YEAR}
                          </p>

                          <div className="flex gap-2">
                            <input
                              type="date"
                              value={goToDateValue}
                              min={minDateStr}
                              max={maxDateStr}
                              onChange={(e) => {
                                setGoToDateValue(e.target.value);
                                setGoToDateError('');
                              }}
                              className="flex-1 px-2 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-2 transition-all"
                              style={{
                                backgroundColor: isDark ? '#111827' : '#FFFFFF',
                                borderColor: goToDateError
                                  ? '#EF4444'
                                  : isDark
                                  ? '#374151'
                                  : '#E5E7EB',
                                color: isDark ? '#E5E7EB' : '#374151',
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleGoToDate();
                              }}
                            />
                            <motion.button
                              onClick={handleGoToDate}
                              disabled={!goToDateValue}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                              style={{
                                backgroundColor: goToDateValue
                                  ? theme.accentColor
                                  : isDark
                                  ? '#374151'
                                  : '#E5E7EB',
                                color: goToDateValue
                                  ? 'white'
                                  : isDark
                                  ? '#6B7280'
                                  : '#9CA3AF',
                                cursor: goToDateValue ? 'pointer' : 'not-allowed',
                              }}
                              whileHover={goToDateValue ? { scale: 1.05 } : {}}
                              whileTap={goToDateValue ? { scale: 0.95 } : {}}
                            >
                              Go
                            </motion.button>
                          </div>

                          {/* Error message */}
                          {goToDateError && (
                            <p className="text-[10px] text-red-500 font-medium mt-1.5">
                              {goToDateError}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Today button - outline only */}
                  <motion.button
                    onClick={goToToday}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all"
                    style={{
                      backgroundColor: 'transparent',
                      color: theme.accentColor,
                      border: `1.5px solid ${theme.accentColor}`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 2px 8px ${theme.accentColor}30`,
                    }}
                    whileTap={{ scale: 0.95 }}
                    title="Jump to today"
                  >
                    <CalendarCheck size={14} />
                    Today
                  </motion.button>
                </div>
              </div>

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

        <motion.p
          className="text-center text-xs mt-4 font-medium"
          style={{ color: isDark ? '#4B5563' : '#9CA3AF' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Wall Calendar
        </motion.p>
      </motion.div>

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