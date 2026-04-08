'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { CalendarEvent } from '@/types';
import { format, parseISO } from 'date-fns';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface EventPanelProps {
  events: CalendarEvent[];
  onAddClick: () => void;
  onDelete: (id: string) => void;
  monthName: string;
}

const EventPanel: React.FC<EventPanelProps> = ({ events, onAddClick, onDelete, monthName }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-white" />
            <h3 className="text-sm font-bold text-white">Events — {monthName}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
              {events.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={(e) => { e.stopPropagation(); onAddClick(); }}
              className="p-1.5 rounded-full transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus size={14} className="text-white" />
            </motion.button>
            {isExpanded ? <ChevronUp size={16} className="text-white" /> : <ChevronDown size={16} className="text-white" />}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3 max-h-[250px] overflow-y-auto space-y-2 custom-scrollbar">
                {sortedEvents.length === 0 ? (
                  <div className="text-center py-6 text-gray-400">
                    <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-medium">No events this month</p>
                    <p className="text-[10px] mt-1">Click + to add one</p>
                  </div>
                ) : (
                  sortedEvents.map((event, idx) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                    >
                      <div className="w-1 min-h-[36px] rounded-full flex-shrink-0" style={{ backgroundColor: event.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{event.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-gray-400 font-medium">{format(parseISO(event.date), 'MMM d')}</span>
                          {event.time && (
                            <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                              <Clock size={8} /> {event.time}
                            </span>
                          )}
                        </div>
                        {event.description && <p className="text-[10px] text-gray-400 mt-0.5 truncate">{event.description}</p>}
                      </div>
                      <motion.button
                        onClick={() => setDeleteTarget({ id: event.id, title: event.title })}
                        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={12} className="text-red-400" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { if (deleteTarget) onDelete(deleteTarget.id); }}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
      />
    </>
  );
};

export default EventPanel;