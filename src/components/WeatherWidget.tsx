'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Wind, ChevronDown, ChevronUp } from 'lucide-react';
import { WeatherData } from '@/utils/weatherData';

interface WeatherWidgetProps {
  weather: WeatherData;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/15 overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Main weather display */}
      <div className="px-3 py-2 flex items-center gap-2">
        <span className="text-2xl">{weather.icon}</span>
        <div className="flex-1">
          <div className="flex items-baseline gap-1">
            <span className="text-white text-lg font-bold">{weather.temp}</span>
            <span className="text-white/60 text-[10px]">{weather.condition}</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] text-white/50">
            <span>H: {weather.high}</span>
            <span>L: {weather.low}</span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={12} className="text-white/50" />
        ) : (
          <ChevronDown size={12} className="text-white/50" />
        )}
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-2 pt-0 border-t border-white/10">
              <p className="text-[10px] text-white/60 mt-1.5 italic">
                {weather.description}
              </p>
              <div className="flex gap-3 mt-1.5">
                <div className="flex items-center gap-1 text-[9px] text-white/50">
                  <Droplets size={10} />
                  <span>{weather.humidity}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-white/50">
                  <Wind size={10} />
                  <span>{weather.wind}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeatherWidget;