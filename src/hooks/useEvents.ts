'use client';

import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CalendarEvent, CalendarNote } from '@/types';
import { useLocalStorage } from './useLocalStorage';

export function useEvents() {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('calendar-events', []);
  const [notes, setNotes] = useLocalStorage<CalendarNote[]>('calendar-notes', []);

  const addEvent = useCallback(
    (event: Omit<CalendarEvent, 'id'>) => {
      const newEvent: CalendarEvent = { ...event, id: uuidv4() };
      setEvents((prev) => [...prev, newEvent]);
      return newEvent;
    },
    [setEvents]
  );

  const deleteEvent = useCallback(
    (id: string) => {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    },
    [setEvents]
  );

  const getEventsForDate = useCallback(
    (dateKey: string): CalendarEvent[] => {
      return events.filter((e) => e.date === dateKey);
    },
    [events]
  );

  const getEventsForMonth = useCallback(
    (year: number, month: number): CalendarEvent[] => {
      const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
      return events.filter((e) => e.date.startsWith(prefix));
    },
    [events]
  );

  const addNote = useCallback(
    (content: string, date: string) => {
      const newNote: CalendarNote = {
        id: uuidv4(),
        content,
        date,
        createdAt: new Date().toISOString(),
      };
      setNotes((prev) => [...prev, newNote]);
      return newNote;
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    },
    [setNotes]
  );

  const getNotesForDate = useCallback(
    (dateKey: string): CalendarNote[] => {
      return notes.filter((n) => n.date === dateKey);
    },
    [notes]
  );

  const getGeneralNotes = useCallback(
    (year: number, month: number): CalendarNote[] => {
      const key = `general-${year}-${String(month + 1).padStart(2, '0')}`;
      return notes.filter((n) => n.date === key);
    },
    [notes]
  );

  // NEW: Get ALL notes for a month (general + all dated notes in that month)
  const getAllNotesForMonth = useCallback(
    (year: number, month: number): CalendarNote[] => {
      const generalKey = `general-${year}-${String(month + 1).padStart(2, '0')}`;
      const datePrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
      return notes.filter(
        (n) => n.date === generalKey || n.date.startsWith(datePrefix)
      );
    },
    [notes]
  );

  return {
    events,
    notes,
    addEvent,
    deleteEvent,
    getEventsForDate,
    getEventsForMonth,
    addNote,
    deleteNote,
    getNotesForDate,
    getGeneralNotes,
    getAllNotesForMonth,
  };
}