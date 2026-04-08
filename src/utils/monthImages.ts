const monthImages: Record<number, string> = {
  0: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=1200&h=600&fit=crop&q=80',
  1: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1200&h=600&fit=crop&q=80',
  2: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=600&fit=crop&q=80',
  3: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&h=600&fit=crop&q=80',
  4: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=600&fit=crop&q=80',
  5: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop&q=80',
  6: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&h=600&fit=crop&q=80',
  7: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=600&fit=crop&q=80',
  8: 'https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?w=1200&h=600&fit=crop&q=80',
  9: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop&q=80',
  10: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200&h=600&fit=crop&q=80',
  11: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&h=600&fit=crop&q=80',
};

const fallbackImages: Record<number, string> = {
  0: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=1200&h=600&fit=crop&q=80',
  1: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&h=600&fit=crop&q=80',
  2: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1200&h=600&fit=crop&q=80',
  3: 'https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=1200&h=600&fit=crop&q=80',
  4: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&h=600&fit=crop&q=80',
  5: 'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?w=1200&h=600&fit=crop&q=80',
  6: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1200&h=600&fit=crop&q=80',
  7: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&h=600&fit=crop&q=80',
  8: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=600&fit=crop&q=80',
  9: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop&q=80',
  10: 'https://images.unsplash.com/photo-1510272839903-01aab4bca569?w=1200&h=600&fit=crop&q=80',
  11: 'https://images.unsplash.com/photo-1482442120256-9c03866de390?w=1200&h=600&fit=crop&q=80',
};

export const getMonthImage = (month: number): string => {
  return monthImages[month] || monthImages[0];
};

export const getFallbackImage = (month: number): string => {
  return fallbackImages[month] || fallbackImages[0];
};

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const eventColors = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4',
];

export const monthThemeColors: Record<number, {
  headerGradient: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  accentLight: string;
  badgeBg: string;
  badgeText: string;
  placeholderColor: string;
  emptyColor: string;
  selectStart: string;
  selectEnd: string;
  selectRange: string;
  selectRangeText: string;
  selectStartText: string;
  todayBg: string;
  hoverBg: string;
}> = {
  0: {
    headerGradient: 'linear-gradient(135deg, #7EB4D2 0%, #5A9BBE 100%)',
    bgGradient: 'linear-gradient(135deg, #EFF6FB 0%, #E3F0F9 50%, #EBF4FA 100%)',
    borderColor: '#C4DFF0',
    accentColor: '#5A9BBE',
    accentLight: '#E3F0F9',
    badgeBg: '#DCF0FF',
    badgeText: '#3A7FA8',
    placeholderColor: '#A8CEE0',
    emptyColor: '#B0D4E8',
    selectStart: '#5A9BBE',
    selectEnd: '#5A9BBE',
    selectRange: '#DCEEF8',
    selectRangeText: '#2D6E8E',
    selectStartText: '#FFFFFF',
    todayBg: '#7EB4D2',
    hoverBg: '#EFF6FB',
  },
  1: {
    headerGradient: 'linear-gradient(135deg, #E88FAC 0%, #D4728E 100%)',
    bgGradient: 'linear-gradient(135deg, #FFF0F5 0%, #FFE8EF 50%, #FFF0F3 100%)',
    borderColor: '#F5C6D6',
    accentColor: '#D4728E',
    accentLight: '#FFE8EF',
    badgeBg: '#FFE0EB',
    badgeText: '#B85574',
    placeholderColor: '#E8AABF',
    emptyColor: '#E8B0C4',
    selectStart: '#D4728E',
    selectEnd: '#D4728E',
    selectRange: '#FFE8EF',
    selectRangeText: '#A04568',
    selectStartText: '#FFFFFF',
    todayBg: '#E88FAC',
    hoverBg: '#FFF0F5',
  },
  2: {
    headerGradient: 'linear-gradient(135deg, #7BC67E 0%, #5AAE5D 100%)',
    bgGradient: 'linear-gradient(135deg, #F0FAF0 0%, #E5F5E5 50%, #EDFAED 100%)',
    borderColor: '#B8E0B9',
    accentColor: '#5AAE5D',
    accentLight: '#E5F5E5',
    badgeBg: '#D4F0D5',
    badgeText: '#3E8840',
    placeholderColor: '#9DD09F',
    emptyColor: '#A8D4AA',
    selectStart: '#5AAE5D',
    selectEnd: '#5AAE5D',
    selectRange: '#E0F5E0',
    selectRangeText: '#357838',
    selectStartText: '#FFFFFF',
    todayBg: '#7BC67E',
    hoverBg: '#F0FAF0',
  },
  3: {
    headerGradient: 'linear-gradient(135deg, #F0A050 0%, #E08C3C 100%)',
    bgGradient: 'linear-gradient(135deg, #FFF8F0 0%, #FFF2E5 50%, #FFF5EB 100%)',
    borderColor: '#F5D4A8',
    accentColor: '#E08C3C',
    accentLight: '#FFF2E5',
    badgeBg: '#FFE8CC',
    badgeText: '#B87030',
    placeholderColor: '#E0B880',
    emptyColor: '#E0C090',
    selectStart: '#E08C3C',
    selectEnd: '#E08C3C',
    selectRange: '#FFF2E5',
    selectRangeText: '#A06828',
    selectStartText: '#FFFFFF',
    todayBg: '#F0A050',
    hoverBg: '#FFF8F0',
  },
  4: {
    headerGradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
    bgGradient: 'linear-gradient(135deg, #F0F8F0 0%, #E0F2E0 50%, #E8F5E8 100%)',
    borderColor: '#A8D8A8',
    accentColor: '#388E3C',
    accentLight: '#E0F2E0',
    badgeBg: '#C8E6C9',
    badgeText: '#2E7D32',
    placeholderColor: '#8DC48F',
    emptyColor: '#98CC9A',
    selectStart: '#388E3C',
    selectEnd: '#388E3C',
    selectRange: '#E0F2E0',
    selectRangeText: '#256328',
    selectStartText: '#FFFFFF',
    todayBg: '#4CAF50',
    hoverBg: '#F0F8F0',
  },
  5: {
    headerGradient: 'linear-gradient(135deg, #40B0D0 0%, #2898B8 100%)',
    bgGradient: 'linear-gradient(135deg, #F0FAFB 0%, #E0F4F8 50%, #E8F7FA 100%)',
    borderColor: '#A8D8E8',
    accentColor: '#2898B8',
    accentLight: '#E0F4F8',
    badgeBg: '#CCF0F8',
    badgeText: '#1E7A96',
    placeholderColor: '#88C8D8',
    emptyColor: '#90CCD8',
    selectStart: '#2898B8',
    selectEnd: '#2898B8',
    selectRange: '#E0F4F8',
    selectRangeText: '#1A6A84',
    selectStartText: '#FFFFFF',
    todayBg: '#40B0D0',
    hoverBg: '#F0FAFB',
  },
  6: {
    headerGradient: 'linear-gradient(135deg, #F08050 0%, #D86840 100%)',
    bgGradient: 'linear-gradient(135deg, #FFF5F0 0%, #FFEDE5 50%, #FFF0E8 100%)',
    borderColor: '#F5C8A8',
    accentColor: '#D86840',
    accentLight: '#FFEDE5',
    badgeBg: '#FFD8C4',
    badgeText: '#B85030',
    placeholderColor: '#E0A888',
    emptyColor: '#E0B098',
    selectStart: '#D86840',
    selectEnd: '#D86840',
    selectRange: '#FFEDE5',
    selectRangeText: '#A04830',
    selectStartText: '#FFFFFF',
    todayBg: '#F08050',
    hoverBg: '#FFF5F0',
  },
  7: {
    headerGradient: 'linear-gradient(135deg, #68A070 0%, #508858 100%)',
    bgGradient: 'linear-gradient(135deg, #F2F8F2 0%, #E5F0E5 50%, #EBF5EB 100%)',
    borderColor: '#B0D0B0',
    accentColor: '#508858',
    accentLight: '#E5F0E5',
    badgeBg: '#CCE0CC',
    badgeText: '#3A6E42',
    placeholderColor: '#90B898',
    emptyColor: '#98C0A0',
    selectStart: '#508858',
    selectEnd: '#508858',
    selectRange: '#E5F0E5',
    selectRangeText: '#3A6040',
    selectStartText: '#FFFFFF',
    todayBg: '#68A070',
    hoverBg: '#F2F8F2',
  },
  8: {
    headerGradient: 'linear-gradient(135deg, #D4A030 0%, #C09020 100%)',
    bgGradient: 'linear-gradient(135deg, #FFFAF0 0%, #FFF5E0 50%, #FFF8E8 100%)',
    borderColor: '#E8D498',
    accentColor: '#C09020',
    accentLight: '#FFF5E0',
    badgeBg: '#FFEEBB',
    badgeText: '#9A7418',
    placeholderColor: '#D0B868',
    emptyColor: '#D4C070',
    selectStart: '#C09020',
    selectEnd: '#C09020',
    selectRange: '#FFF5E0',
    selectRangeText: '#8A6818',
    selectStartText: '#FFFFFF',
    todayBg: '#D4A030',
    hoverBg: '#FFFAF0',
  },
  9: {
    headerGradient: 'linear-gradient(135deg, #C87840 0%, #A86030 100%)',
    bgGradient: 'linear-gradient(135deg, #FBF5F0 0%, #F5EDE5 50%, #F8F0E8 100%)',
    borderColor: '#E0C0A0',
    accentColor: '#A86030',
    accentLight: '#F5EDE5',
    badgeBg: '#F0D8C0',
    badgeText: '#885020',
    placeholderColor: '#C8A888',
    emptyColor: '#C8B090',
    selectStart: '#A86030',
    selectEnd: '#A86030',
    selectRange: '#F5EDE5',
    selectRangeText: '#784828',
    selectStartText: '#FFFFFF',
    todayBg: '#C87840',
    hoverBg: '#FBF5F0',
  },
  10: {
    headerGradient: 'linear-gradient(135deg, #9088A8 0%, #787098 100%)',
    bgGradient: 'linear-gradient(135deg, #F5F3F8 0%, #EDEAF2 50%, #F0EEF5 100%)',
    borderColor: '#C8C0D8',
    accentColor: '#787098',
    accentLight: '#EDEAF2',
    badgeBg: '#DCD8E8',
    badgeText: '#605880',
    placeholderColor: '#A8A0B8',
    emptyColor: '#B0A8C0',
    selectStart: '#787098',
    selectEnd: '#787098',
    selectRange: '#EDEAF2',
    selectRangeText: '#504870',
    selectStartText: '#FFFFFF',
    todayBg: '#9088A8',
    hoverBg: '#F5F3F8',
  },
  11: {
    headerGradient: 'linear-gradient(135deg, #6090B8 0%, #4878A0 100%)',
    bgGradient: 'linear-gradient(135deg, #F0F4F8 0%, #E5EDF5 50%, #EBF0F8 100%)',
    borderColor: '#B0C8E0',
    accentColor: '#4878A0',
    accentLight: '#E5EDF5',
    badgeBg: '#D0E0F0',
    badgeText: '#385E80',
    placeholderColor: '#90A8C0',
    emptyColor: '#98B0C8',
    selectStart: '#4878A0',
    selectEnd: '#4878A0',
    selectRange: '#E5EDF5',
    selectRangeText: '#305070',
    selectStartText: '#FFFFFF',
    todayBg: '#6090B8',
    hoverBg: '#F0F4F8',
  },
};

export const monthQuotes: Record<number, { quote: string; author: string }> = {
  0: {
    quote: 'New beginnings are often disguised as painful endings.',
    author: 'Lao Tzu',
  },
  1: {
    quote: 'The greatest thing you will ever learn is just to love and be loved in return.',
    author: 'Eden Ahbez',
  },
  2: {
    quote: 'Spring is nature\'s way of saying let\'s party!',
    author: 'Robin Williams',
  },
  3: {
    quote: 'The earth laughs in flowers.',
    author: 'Ralph Waldo Emerson',
  },
  4: {
    quote: 'Everything blooms in its own time.',
    author: 'Ken Petti',
  },
  5: {
    quote: 'And so with the sunshine and the great bursts of leaves, life was beginning over again with the summer.',
    author: 'F. Scott Fitzgerald',
  },
  6: {
    quote: 'Rest is not idleness, to lie on the grass on a summer day is by no means a waste of time.',
    author: 'John Lubbock',
  },
  7: {
    quote: 'In the depth of winter, I finally learned that within me there lay an invincible summer.',
    author: 'Albert Camus',
  },
  8: {
    quote: 'Life starts all over again when it gets crisp in the fall.',
    author: 'F. Scott Fitzgerald',
  },
  9: {
    quote: 'Autumn shows us how beautiful it is to let things go.',
    author: 'Unknown',
  },
  10: {
    quote: 'Gratitude turns what we have into enough.',
    author: 'Melody Beattie',
  },
  11: {
    quote: 'What good is the warmth of summer, without the cold of winter to give it sweetness.',
    author: 'John Steinbeck',
  },
};