'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Trash2, Send } from 'lucide-react';
import { CalendarNote } from '@/types';
import { format, parseISO } from 'date-fns';
import { monthThemeColors } from '@/utils/monthImages';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface NotesSectionProps {
  allMonthNotes: CalendarNote[];
  selectedDate: string | null;
  monthKey: string;
  currentMonth: number;
  isDark: boolean;
  onAddNote: (content: string, dateKey: string) => void;
  onDeleteNote: (id: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  allMonthNotes,
  selectedDate,
  monthKey,
  currentMonth,
  isDark,
  onAddNote,
  onDeleteNote,
}) => {
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState<'general' | 'date'>('general');
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    content: string;
  } | null>(null);

  const hasDateSelection = selectedDate !== null;
  const theme = monthThemeColors[currentMonth] || monthThemeColors[0];

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    if (noteType === 'date' && selectedDate) {
      onAddNote(noteText.trim(), selectedDate);
    } else {
      onAddNote(noteText.trim(), monthKey);
    }
    setNoteText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const sortedNotes = [...allMonthNotes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const formatNoteDate = (note: CalendarNote): string => {
    const isGeneral = note.date.startsWith('general-');
    if (isGeneral) return 'General';
    try {
      return format(parseISO(note.date), 'EEEE, MMMM d, yyyy');
    } catch {
      return note.date;
    }
  };

  const formatNoteTime = (createdAt: string): string => {
    try {
      return format(parseISO(createdAt), 'MMM d, yyyy • h:mm a');
    } catch {
      return '';
    }
  };

  const darkBg = isDark
    ? 'linear-gradient(135deg, #1F2937 0%, #1a2332 50%, #1F2937 100%)'
    : theme.bgGradient;
  const darkBorder = isDark ? '#374151' : theme.borderColor;
  const darkNoteBg = isDark ? '#111827' : '#FFFFFF';
  const darkNoteText = isDark ? '#E5E7EB' : '#374151';
  const darkInputBg = isDark ? '#111827' : '#FFFFFF';
  const darkInputText = isDark ? '#E5E7EB' : '#4B5563';

  return (
    <>
      <div
        className="shadow-lg border overflow-hidden h-full flex flex-col"
        style={{
          background: darkBg,
          borderColor: darkBorder,
          borderRadius: '0px',
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${theme.accentColor}CC 0%, ${theme.accentColor}99 100%)`
              : theme.headerGradient,
            borderRadius: '0px',
          }}
        >
          <StickyNote size={16} className="text-white" />
          <h3 className="text-sm font-bold text-white">Notes</h3>
          <span
            className="text-xs px-2 py-0.5 font-semibold"
            style={{
              backgroundColor: 'rgba(255,255,255,0.25)',
              color: 'white',
              borderRadius: '0px',
            }}
          >
            {sortedNotes.length}
          </span>
        </div>

        {/* Note type toggle */}
        <div className="px-4 pt-3 flex gap-2">
          <button
            onClick={() => setNoteType('general')}
            className="flex-1 text-xs font-semibold py-1.5 transition-all"
            style={{
              borderRadius: '0px',
              ...(noteType === 'general'
                ? { backgroundColor: theme.accentColor, color: 'white' }
                : {
                    backgroundColor: isDark ? '#374151' : 'white',
                    color: '#9CA3AF',
                  }),
            }}
          >
            General
          </button>
          <button
            onClick={() => {
              if (hasDateSelection) setNoteType('date');
            }}
            disabled={!hasDateSelection}
            className="flex-1 text-xs font-semibold py-1.5 transition-all"
            style={{
              borderRadius: '0px',
              ...(noteType === 'date'
                ? { backgroundColor: theme.accentColor, color: 'white' }
                : hasDateSelection
                ? {
                    backgroundColor: isDark ? '#374151' : 'white',
                    color: '#9CA3AF',
                  }
                : {
                    backgroundColor: isDark ? '#1F2937' : '#F3F4F6',
                    color: isDark ? '#4B5563' : '#D1D5DB',
                    cursor: 'not-allowed',
                  }),
            }}
          >
            {hasDateSelection
              ? `Date: ${format(parseISO(selectedDate!), 'MMM d, yyyy')}`
              : 'Select a date'}
          </button>
        </div>

        {/* Add note input */}
        <div className="px-4 pt-3">
          <div className="flex gap-2">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a note..."
              rows={2}
              className="flex-1 px-3 py-2 border text-sm focus:outline-none focus:ring-2 transition-all resize-none"
              style={{
                borderColor: darkBorder,
                color: darkInputText,
                backgroundColor: darkInputBg,
                borderRadius: '0px',
              }}
            />
            <motion.button
              onClick={handleAddNote}
              disabled={!noteText.trim()}
              className="self-end p-2.5 transition-all"
              style={{
                borderRadius: '0px',
                ...(noteText.trim()
                  ? { backgroundColor: theme.accentColor, color: 'white' }
                  : {
                      backgroundColor: isDark ? '#374151' : '#E5E7EB',
                      color: isDark ? '#6B7280' : '#9CA3AF',
                      cursor: 'not-allowed',
                    }),
              }}
              whileHover={noteText.trim() ? { scale: 1.05 } : {}}
              whileTap={noteText.trim() ? { scale: 0.95 } : {}}
            >
              <Send size={16} />
            </motion.button>
          </div>
        </div>

        {/* Notes list */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 custom-scrollbar">
          {sortedNotes.length === 0 ? (
            <div className="text-center py-8" style={{ color: isDark ? '#4B5563' : theme.emptyColor }}>
              <StickyNote size={36} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs font-medium">No notes yet</p>
              <p className="text-[10px] mt-1">Start typing above to add one</p>
            </div>
          ) : (
            <AnimatePresence>
              {sortedNotes.map((note, idx) => {
                const isGeneral = note.date.startsWith('general-');
                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group p-3 shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      borderWidth: 1,
                      borderColor: darkBorder,
                      borderRadius: '0px',
                      backgroundColor: darkNoteBg,
                    }}
                  >
                    {/* Note content */}
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className="text-sm flex-1 whitespace-pre-wrap break-words"
                        style={{ color: darkNoteText }}
                      >
                        {note.content}
                      </p>
                      <motion.button
                        onClick={() =>
                          setDeleteTarget({
                            id: note.id,
                            content:
                              note.content.length > 30
                                ? note.content.slice(0, 30) + '...'
                                : note.content,
                          })
                        }
                        className="p-1 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                        style={{
                          borderRadius: '0px',
                          backgroundColor: 'transparent',
                        }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: isDark ? '#7F1D1D' : '#FEE2E2',
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={12} className="text-red-400" />
                      </motion.button>
                    </div>

                    {/* Date and time info */}
                    <div className="flex flex-col gap-1 mt-2">
                      <span
                        className="text-[10px] px-1.5 py-0.5 font-semibold inline-block w-fit"
                        style={{
                          borderRadius: '0px',
                          ...(isGeneral
                            ? {
                                backgroundColor: isDark ? '#1F2937' : theme.badgeBg,
                                color: isDark ? theme.accentColor : theme.badgeText,
                                border: isDark ? `1px solid ${theme.accentColor}40` : 'none',
                              }
                            : {
                                backgroundColor: isDark ? '#1F2937' : theme.accentLight,
                                color: theme.accentColor,
                                border: isDark ? `1px solid ${theme.accentColor}40` : 'none',
                              }),
                        }}
                      >
                        📌 {formatNoteDate(note)}
                      </span>
                      <span
                        className="text-[9px]"
                        style={{ color: isDark ? '#6B7280' : '#9CA3AF' }}
                      >
                        Added: {formatNoteTime(note.createdAt)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) onDeleteNote(deleteTarget.id);
        }}
        title="Delete Note"
        message={`Delete this note: "${deleteTarget?.content}"?`}
      />
    </>
  );
};

export default NotesSection;