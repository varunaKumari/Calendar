'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarEvent } from '@/types';

interface EventBadgeProps {
  event: CalendarEvent;
  compact?: boolean;
}

const EventBadge: React.FC<EventBadgeProps> = ({ event, compact = false }) => {
  if (compact) {
    return (
      <motion.div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: event.color }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        title={event.title}
      />
    );
  }

  return (
    <motion.div
      className="text-xs px-1.5 py-0.5 rounded truncate max-w-full"
      style={{
        backgroundColor: event.color + '20',
        color: event.color,
        borderLeft: `2px solid ${event.color}`,
      }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      title={event.title}
    >
      {event.title}
    </motion.div>
  );
};

export default EventBadge;