'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMonthImage, getFallbackImage, monthNames, monthQuotes } from '@/utils/monthImages';
import { getWeatherForMonth } from '@/utils/weatherData';
import { Quote } from 'lucide-react';
import WeatherWidget from './WeatherWidget';

interface HeroImageProps {
  month: number;
  year: number;
}

const HeroImage: React.FC<HeroImageProps> = ({ month, year }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const imageUrl = useFallback ? getFallbackImage(month) : getMonthImage(month);
  const quote = monthQuotes[month];
  const weather = getWeatherForMonth(month);

  const handleImageError = () => {
    if (!useFallback) {
      setUseFallback(true);
      setImageLoaded(false);
    } else {
      setImageLoaded(true);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
      {/* Spiral binding */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center">
        <div className="flex gap-4 sm:gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-5 sm:w-4 sm:h-6 rounded-b-full shadow-sm"
              style={{ background: 'linear-gradient(180deg, #d1d5db 0%, #9ca3af 100%)' }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}-${useFallback ? 'fb' : 'pr'}`}
          className="relative w-full aspect-[16/8] sm:aspect-[16/7] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          )}

          <img
            src={imageUrl}
            alt={`${monthNames[month]} ${year}`}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />

          {/* Monthly Quote - top left */}
          {quote && (
            <motion.div
              className="absolute top-8 left-4 sm:top-10 sm:left-6 z-10 max-w-[200px] sm:max-w-[280px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20 shadow-lg">
                <Quote size={14} className="text-white/70 mb-1.5 sm:mb-2" />
                <p className="text-white text-[10px] sm:text-xs leading-relaxed font-medium italic">
                  &ldquo;{quote.quote}&rdquo;
                </p>
                <p className="text-white/60 text-[9px] sm:text-[10px] mt-1.5 font-semibold">
                  — {quote.author}
                </p>
              </div>
            </motion.div>
          )}

          {/* Weather Widget - top right */}
          <div className="absolute top-8 right-4 sm:top-10 sm:right-6 z-10 w-[140px] sm:w-[160px]">
            <WeatherWidget weather={weather} />
          </div>

          {/* Month/Year label */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-right z-10">
            <motion.p
              key={year}
              className="text-white/80 text-sm sm:text-lg font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {year}
            </motion.p>
            <motion.h1
              key={`${month}-name`}
              className="text-white text-2xl sm:text-4xl font-extrabold tracking-wider uppercase drop-shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {monthNames[month]}
            </motion.h1>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroImage;