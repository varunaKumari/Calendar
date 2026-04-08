export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  color: string;
  description?: string;
  time?: string;
}

export interface CalendarNote {
  id: string;
  content: string;
  date: string;
  createdAt: string;
}

export interface DateRange {
  start: string | null;
  end: string | null;
}

export type ViewMode = 'month';

export interface MonthData {
  year: number;
  month: number;
}