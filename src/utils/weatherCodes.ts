import { WeatherConditionInfo, TempUnit, SpeedUnit } from '../types';

export const WMO_WEATHER_MAP: Record<number, WeatherConditionInfo> = {
  0: {
    code: 0,
    label: 'Clear Sky',
    description: 'Cloudless and sunny conditions',
    icon: 'Sun',
    bgClass: 'from-amber-500/10 via-sky-500/10 to-indigo-500/10',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  },
  1: {
    code: 1,
    label: 'Mainly Clear',
    description: 'Mostly sunny with scattered light clouds',
    icon: 'SunDim',
    bgClass: 'from-amber-400/10 via-sky-400/10 to-blue-500/10',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40',
  },
  2: {
    code: 2,
    label: 'Partly Cloudy',
    description: 'Mix of sun and passing cloud cover',
    icon: 'CloudSun',
    bgClass: 'from-sky-500/10 via-slate-400/10 to-indigo-500/10',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  },
  3: {
    code: 3,
    label: 'Overcast',
    description: 'Dense cloud blanket covering the sky',
    icon: 'Cloud',
    bgClass: 'from-slate-500/10 via-slate-600/10 to-zinc-500/10',
    badgeClass: 'bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  },
  45: {
    code: 45,
    label: 'Fog',
    description: 'Low visibility due to ambient mist and fog',
    icon: 'CloudFog',
    bgClass: 'from-zinc-500/10 via-slate-500/10 to-neutral-500/10',
    badgeClass: 'bg-zinc-200 text-zinc-800 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
  },
  48: {
    code: 48,
    label: 'Depositing Rime Fog',
    description: 'Freezing fog forming frost layers',
    icon: 'CloudFog',
    bgClass: 'from-teal-500/10 via-cyan-600/10 to-slate-500/10',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/40',
  },
  51: {
    code: 51,
    label: 'Light Drizzle',
    description: 'Intermittent fine water droplets',
    icon: 'CloudDrizzle',
    bgClass: 'from-cyan-500/10 via-sky-600/10 to-blue-500/10',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/40',
  },
  53: {
    code: 53,
    label: 'Moderate Drizzle',
    description: 'Consistent light precipitation',
    icon: 'CloudDrizzle',
    bgClass: 'from-cyan-600/10 via-blue-600/10 to-indigo-600/10',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/40',
  },
  55: {
    code: 55,
    label: 'Dense Drizzle',
    description: 'Heavy drizzle with reduced road visibility',
    icon: 'CloudDrizzle',
    bgClass: 'from-cyan-600/10 via-blue-700/10 to-indigo-700/10',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/40',
  },
  61: {
    code: 61,
    label: 'Slight Rain',
    description: 'Mild rainfall with occasional pauses',
    icon: 'CloudRain',
    bgClass: 'from-blue-500/10 via-indigo-500/10 to-slate-600/10',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  },
  63: {
    code: 63,
    label: 'Moderate Rain',
    description: 'Steady rainfall throughout the area',
    icon: 'CloudRain',
    bgClass: 'from-blue-600/10 via-indigo-600/10 to-slate-700/10',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  },
  65: {
    code: 65,
    label: 'Heavy Rain',
    description: 'Intense precipitation with ponding water',
    icon: 'CloudRain',
    bgClass: 'from-blue-700/10 via-indigo-800/10 to-slate-800/10',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/40',
  },
  71: {
    code: 71,
    label: 'Light Snow',
    description: 'Gentle snowfall with minor ground dusting',
    icon: 'CloudSnow',
    bgClass: 'from-slate-200/20 via-sky-300/10 to-indigo-200/20',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40',
  },
  73: {
    code: 73,
    label: 'Moderate Snow',
    description: 'Steadier snowfall accumulating on surfaces',
    icon: 'CloudSnow',
    bgClass: 'from-slate-300/20 via-sky-400/10 to-indigo-300/20',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40',
  },
  75: {
    code: 75,
    label: 'Heavy Snow',
    description: 'Dense snowfall and slippery conditions',
    icon: 'CloudSnow',
    bgClass: 'from-slate-400/20 via-sky-500/15 to-indigo-400/20',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/40',
  },
  77: {
    code: 77,
    label: 'Snow Grains',
    description: 'Small opaque ice grains falling',
    icon: 'CloudSnow',
    bgClass: 'from-sky-300/10 via-indigo-300/10 to-slate-400/10',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40',
  },
  80: {
    code: 80,
    label: 'Light Showers',
    description: 'Scattered brief rain showers',
    icon: 'CloudRain',
    bgClass: 'from-sky-500/10 via-blue-500/10 to-indigo-500/10',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  },
  81: {
    code: 81,
    label: 'Moderate Showers',
    description: 'Passing rain bursts with variable wind',
    icon: 'CloudRain',
    bgClass: 'from-sky-600/10 via-blue-600/10 to-indigo-600/10',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  },
  82: {
    code: 82,
    label: 'Violent Showers',
    description: 'Sudden high-intensity torrential bursts',
    icon: 'CloudRainWind',
    bgClass: 'from-blue-700/10 via-indigo-800/10 to-slate-900/10',
    badgeClass: 'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800/40',
  },
  85: {
    code: 85,
    label: 'Light Snow Showers',
    description: 'Intermittent flurries passing through',
    icon: 'CloudSnow',
    bgClass: 'from-slate-200/20 via-sky-300/10 to-indigo-200/20',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40',
  },
  86: {
    code: 86,
    label: 'Heavy Snow Showers',
    description: 'Intense bursts of heavy snow flurries',
    icon: 'CloudSnow',
    bgClass: 'from-slate-400/20 via-sky-500/15 to-indigo-400/20',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/40',
  },
  95: {
    code: 95,
    label: 'Thunderstorm',
    description: 'Lightning activity and gusty winds',
    icon: 'CloudLightning',
    bgClass: 'from-amber-600/15 via-purple-700/15 to-slate-900/15',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  },
  96: {
    code: 96,
    label: 'Thunderstorm w/ Light Hail',
    description: 'Thunderstorm accompanied by small hail',
    icon: 'CloudLightning',
    bgClass: 'from-purple-600/15 via-amber-600/15 to-slate-900/15',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40',
  },
  99: {
    code: 99,
    label: 'Severe Thunderstorm w/ Hail',
    description: 'Dangerous storm with strong hail and wind shear',
    icon: 'CloudLightning',
    bgClass: 'from-rose-700/20 via-purple-800/20 to-slate-950/20',
    badgeClass: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/40',
  },
};

export function getWeatherInfo(code: number): WeatherConditionInfo {
  return (
    WMO_WEATHER_MAP[code] || {
      code,
      label: 'Partly Cloudy',
      description: 'Variable cloudiness and temperature',
      icon: 'CloudSun',
      bgClass: 'from-slate-500/10 via-sky-500/10 to-indigo-500/10',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    }
  );
}

export function convertTemperature(celsius: number, unit: TempUnit): number {
  if (unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function convertWindSpeed(kmh: number, unit: SpeedUnit): number {
  if (unit === 'mph') {
    return Math.round(kmh * 0.621371);
  }
  return Math.round(kmh);
}

export function getWindDirectionText(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function getUVLevel(uvIndex: number): { label: string; color: string } {
  if (uvIndex < 3) return { label: 'Low', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' };
  if (uvIndex < 6) return { label: 'Moderate', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30' };
  if (uvIndex < 8) return { label: 'High', color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30' };
  if (uvIndex < 11) return { label: 'Very High', color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30' };
  return { label: 'Extreme', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30' };
}
