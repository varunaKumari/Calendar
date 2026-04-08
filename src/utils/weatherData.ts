export interface WeatherData {
  temp: string;
  high: string;
  low: string;
  condition: string;
  icon: string;
  description: string;
  humidity: string;
  wind: string;
}

const monthWeather: Record<number, WeatherData> = {
  0: {
    temp: '2°C',
    high: '5°C',
    low: '-3°C',
    condition: 'Snowy',
    icon: '❄️',
    description: 'Cold winter days with occasional snowfall',
    humidity: '78%',
    wind: '15 km/h',
  },
  1: {
    temp: '4°C',
    high: '8°C',
    low: '0°C',
    condition: 'Chilly',
    icon: '🌨️',
    description: 'Late winter chill with some sunny breaks',
    humidity: '72%',
    wind: '12 km/h',
  },
  2: {
    temp: '10°C',
    high: '14°C',
    low: '5°C',
    condition: 'Breezy',
    icon: '🌤️',
    description: 'Spring is arriving with fresh breezes',
    humidity: '65%',
    wind: '18 km/h',
  },
  3: {
    temp: '15°C',
    high: '19°C',
    low: '10°C',
    condition: 'Mild',
    icon: '🌷',
    description: 'Pleasant spring weather with blooming flowers',
    humidity: '60%',
    wind: '14 km/h',
  },
  4: {
    temp: '22°C',
    high: '26°C',
    low: '16°C',
    condition: 'Warm',
    icon: '☀️',
    description: 'Warm and sunny days perfect for outdoors',
    humidity: '55%',
    wind: '10 km/h',
  },
  5: {
    temp: '28°C',
    high: '32°C',
    low: '22°C',
    condition: 'Hot',
    icon: '🔆',
    description: 'Summer heat with clear blue skies',
    humidity: '50%',
    wind: '8 km/h',
  },
  6: {
    temp: '32°C',
    high: '36°C',
    low: '26°C',
    condition: 'Very Hot',
    icon: '🌞',
    description: 'Peak summer warmth and long sunny days',
    humidity: '55%',
    wind: '7 km/h',
  },
  7: {
    temp: '30°C',
    high: '34°C',
    low: '24°C',
    condition: 'Humid',
    icon: '⛅',
    description: 'Warm and humid with occasional thunderstorms',
    humidity: '68%',
    wind: '9 km/h',
  },
  8: {
    temp: '24°C',
    high: '28°C',
    low: '18°C',
    condition: 'Pleasant',
    icon: '🍂',
    description: 'Cooling down as autumn begins',
    humidity: '58%',
    wind: '12 km/h',
  },
  9: {
    temp: '16°C',
    high: '20°C',
    low: '10°C',
    condition: 'Cool',
    icon: '🍁',
    description: 'Crisp autumn air with falling leaves',
    humidity: '62%',
    wind: '16 km/h',
  },
  10: {
    temp: '8°C',
    high: '12°C',
    low: '4°C',
    condition: 'Cold',
    icon: '🌫️',
    description: 'Misty mornings and chilly evenings',
    humidity: '75%',
    wind: '14 km/h',
  },
  11: {
    temp: '3°C',
    high: '6°C',
    low: '-1°C',
    condition: 'Freezing',
    icon: '☃️',
    description: 'Winter wonderland with festive frost',
    humidity: '80%',
    wind: '13 km/h',
  },
};

export const getWeatherForMonth = (month: number): WeatherData => {
  return monthWeather[month] || monthWeather[0];
};