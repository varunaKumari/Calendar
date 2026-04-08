import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  parseISO,
  addMonths,
  subMonths,
  isAfter,
  isBefore,
} from 'date-fns';

export const getCalendarDays = (year: number, month: number): Date[] => {
  const monthStart = startOfMonth(new Date(year, month));
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  return eachDayOfInterval({ start: calStart, end: calEnd });
};

export const formatDateKey = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const isDateInRange = (
  date: Date,
  start: string | null,
  end: string | null
): boolean => {
  if (!start || !end) return false;
  try {
    const s = parseISO(start);
    const e = parseISO(end);
    const actualStart = isBefore(s, e) ? s : e;
    const actualEnd = isBefore(s, e) ? e : s;
    return (
      isWithinInterval(date, { start: actualStart, end: actualEnd }) ||
      isSameDay(date, actualStart) ||
      isSameDay(date, actualEnd)
    );
  } catch {
    return false;
  }
};

export const isRangeStart = (
  date: Date,
  start: string | null,
  end: string | null
): boolean => {
  if (!start || !end) {
    if (start && !end) {
      try {
        return isSameDay(date, parseISO(start));
      } catch {
        return false;
      }
    }
    return false;
  }
  try {
    const s = parseISO(start);
    const e = parseISO(end);
    const actualStart = isBefore(s, e) ? s : e;
    return isSameDay(date, actualStart);
  } catch {
    return false;
  }
};

export const isRangeEnd = (
  date: Date,
  start: string | null,
  end: string | null
): boolean => {
  if (!start || !end) return false;
  try {
    const s = parseISO(start);
    const e = parseISO(end);
    const actualEnd = isBefore(s, e) ? e : s;
    return isSameDay(date, actualEnd);
  } catch {
    return false;
  }
};

export {
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths,
  parseISO,
  isBefore,
  isAfter,
};