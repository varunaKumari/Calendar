'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { useEvents } from '@/hooks/useEvents';
import { monthThemeColors } from '@/utils/monthImages';
import HeroImage from './HeroImage';
import MonthNavigator from './MonthNavigator';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import AddEventModal from './AddEventModal';

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

  const [showAddEvent, setShowAddEvent] = useState(false);

  const monthEvents = useMemo(
    () => getEventsForMonth(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month, getEventsForMonth]
  );

  const monthKey = `general-${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, '0')}`;

  // Get ALL notes for this month (general + all dated)
  const allMonthNotes = useMemo(
    () => getAllNotesForMonth(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month, getAllNotesForMonth]
  );

  const defaultEventDate =
    selectedDate ||
    `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, '0')}-01`;

  const theme = monthThemeColors[currentMonth.month] || monthThemeColors[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Wall calendar card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
          {/* Hero Image */}
          <HeroImage month={currentMonth.month} year={currentMonth.year} />

          {/* Bottom section */}
          <div className="p-4 sm:p-6">
            {/* Month Navigator */}
            <MonthNavigator
              year={currentMonth.year}
              month={currentMonth.month}
              onPrev={goToPrevMonth}
              onNext={goToNextMonth}
            />

            {/* Grid layout: Calendar on left, Notes on right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Calendar Grid with Today button */}
              <div className="lg:col-span-2 relative pb-10">
                <CalendarGrid
                  days={calendarDays}
                  currentYear={currentMonth.year}
                  currentMonth={currentMonth.month}
                  selectedDate={selectedDate}
                  events={monthEvents}
                  onDateClick={handleDateClick}
                />

                {/* Today button - bottom right */}
                <motion.button
                  onClick={goToToday}
                  className="absolute bottom-0 right-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-md transition-all"
                  style={{
                    backgroundColor: theme.accentColor,
                    color: 'white',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  title="Jump to current month"
                >
                  <CalendarCheck size={14} />
                  Today
                </motion.button>
              </div>

              {/* Notes Section - shows all month notes always */}
              <div className="lg:col-span-1">
                <NotesSection
                  allMonthNotes={allMonthNotes}
                  selectedDate={selectedDate}
                  monthKey={monthKey}
                  currentMonth={currentMonth.month}
                  onAddNote={addNote}
                  onDeleteNote={deleteNote}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-gray-400 mt-4 font-medium"
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