export interface Holiday {
  month: number;
  day: number;
  name: string;
}

export const holidays: Holiday[] = [
  // January
  { month: 0, day: 1, name: "New Year's Day" },
  { month: 0, day: 15, name: 'MLK Jr. Day' },
  { month: 0, day: 26, name: 'Republic Day' },

  // February
  { month: 1, day: 2, name: 'Groundhog Day' },
  { month: 1, day: 14, name: "Valentine's Day" },
  { month: 1, day: 20, name: "Presidents' Day" },

  // March
  { month: 2, day: 8, name: "Women's Day" },
  { month: 2, day: 17, name: "St. Patrick's" },
  { month: 2, day: 20, name: 'Spring Equinox' },

  // April
  { month: 3, day: 1, name: "April Fools'" },
  { month: 3, day: 7, name: 'World Health Day' },
  { month: 3, day: 22, name: 'Earth Day' },

  // May
  { month: 4, day: 1, name: 'Workers Day' },
  { month: 4, day: 5, name: 'Cinco de Mayo' },
  { month: 4, day: 12, name: "Mother's Day" },

  // June
  { month: 5, day: 5, name: 'Environment Day' },
  { month: 5, day: 16, name: "Father's Day" },
  { month: 5, day: 21, name: 'Summer Solstice' },

  // July
  { month: 6, day: 4, name: 'Independence Day' },
  { month: 6, day: 14, name: 'Bastille Day' },
  { month: 6, day: 30, name: 'Friendship Day' },

  // August
  { month: 7, day: 9, name: 'Indigenous Day' },
  { month: 7, day: 15, name: 'Independence Day' },
  { month: 7, day: 19, name: 'Photography Day' },

  // September
  { month: 8, day: 1, name: 'Labor Day' },
  { month: 8, day: 5, name: "Teachers' Day" },
  { month: 8, day: 21, name: 'Peace Day' },

  // October
  { month: 9, day: 2, name: 'Gandhi Jayanti' },
  { month: 9, day: 16, name: 'World Food Day' },
  { month: 9, day: 31, name: 'Halloween' },

  // November
  { month: 10, day: 1, name: 'All Saints Day' },
  { month: 10, day: 11, name: 'Veterans Day' },
  { month: 10, day: 28, name: 'Thanksgiving' },

  // December
  { month: 11, day: 10, name: 'Human Rights Day' },
  { month: 11, day: 25, name: 'Christmas' },
  { month: 11, day: 31, name: "New Year's Eve" },
];

export const getHolidaysForMonth = (month: number): Holiday[] => {
  return holidays.filter((h) => h.month === month);
};

export const getHolidayForDate = (month: number, day: number): Holiday | undefined => {
  return holidays.find((h) => h.month === month && h.day === day);
};