'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Type, FileText } from 'lucide-react';
import { eventColors } from '@/utils/monthImages';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: {
    title: string;
    date: string;
    color: string;
    description?: string;
    time?: string;
  }) => void;
  defaultDate?: string;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  defaultDate,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(
    defaultDate || new Date().toISOString().split('T')[0]
  );
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(eventColors[4]);
  const [errors, setErrors] = useState<{ title?: string; date?: string }>({});

  const validate = (): boolean => {
    const newErrors: { title?: string; date?: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd({
      title: title.trim(),
      date,
      color: selectedColor,
      description: description.trim() || undefined,
      time: time || undefined,
    });
    setTitle('');
    setDate(defaultDate || new Date().toISOString().split('T')[0]);
    setTime('');
    setDescription('');
    setSelectedColor(eventColors[4]);
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDate(defaultDate || new Date().toISOString().split('T')[0]);
    setTime('');
    setDescription('');
    setSelectedColor(eventColors[4]);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ backgroundColor: selectedColor }}
            >
              <h2 className="text-lg font-bold text-white">Add New Event</h2>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <Type size={16} />
                  Event Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title..."
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.title
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                    <Calendar size={16} />
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.date
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
                    }`}
                  />
                  {errors.date && (
                    <p className="text-xs text-red-500 mt-1">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                    <Clock size={16} />
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <FileText size={16} />
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Event Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {eventColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className="w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: color,
                        outline:
                          selectedColor === color
                            ? `3px solid ${color}`
                            : '2px solid transparent',
                        outlineOffset: '2px',
                        transform:
                          selectedColor === color ? 'scale(1.15)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: selectedColor }}
              >
                Add Event
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddEventModal;