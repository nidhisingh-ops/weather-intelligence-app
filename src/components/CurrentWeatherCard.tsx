import React from 'react';
import { GeoLocation, WeatherData, TempUnit, SpeedUnit } from '../types';
import {
  getWeatherInfo,
  convertTemperature,
  convertWindSpeed,
  getWindDirectionText,
  getUVLevel,
} from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';
import {
  Droplets,
  Wind,
  CloudRain,
  Gauge,
  Sun,
  Thermometer,
  Calendar,
  Compass,
} from 'lucide-react';

interface CurrentWeatherCardProps {
  location: GeoLocation;
  weather: WeatherData;
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  location,
  weather,
  tempUnit,
  speedUnit,
}) => {
  const current = weather.current;
  const condition = getWeatherInfo(current.weather_code);
  const tempVal = convertTemperature(current.temperature_2m, tempUnit);
  const feelsLikeVal = convertTemperature(current.apparent_temperature, tempUnit);
  const windVal = convertWindSpeed(current.wind_speed_10m, speedUnit);
  const windDir = getWindDirectionText(current.wind_direction_10m);

  const todayMax = weather.daily.temperature_2m_max[0] != null
    ? convertTemperature(weather.daily.temperature_2m_max[0], tempUnit)
    : tempVal;
  const todayMin = weather.daily.temperature_2m_min[0] != null
    ? convertTemperature(weather.daily.temperature_2m_min[0], tempUnit)
    : tempVal;
  const uvMax = weather.daily.uv_index_max[0] ?? 0;
  const uvInfo = getUVLevel(uvMax);
  const rainChance = weather.daily.precipitation_probability_max[0] ?? 0;

  // Format current date & time
  const now = new Date();
  const dateFormatted = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      id="current-weather-card"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
    >
      {/* Dynamic atmospheric subtle background tint */}
      <div
        className={`absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gradient-to-br ${condition.bgClass} blur-3xl pointer-events-none opacity-60`}
      />

      <div className="relative z-10 space-y-6">
        {/* Location & Time Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {location.name}
              </h2>
              {location.country_code && (
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {location.country_code}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {[location.admin1, location.country].filter(Boolean).join(', ')} •{' '}
              <span className="font-mono text-[11px]">
                {location.latitude.toFixed(2)}°N, {location.longitude.toFixed(2)}°E
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{dateFormatted}</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
              {current.is_day ? 'Daytime' : 'Night'}
            </span>
          </div>
        </div>

        {/* Main Temperature & Condition Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
          {/* Temperature & Icon */}
          <div className="md:col-span-6 flex items-center gap-6">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-sky-50 dark:bg-slate-800/80 flex items-center justify-center text-sky-500 shrink-0 shadow-inner">
              <WeatherIcon name={condition.icon} className="h-12 w-12 sm:h-14 sm:w-14" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {tempVal}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-slate-400 ml-1">
                  °{tempUnit === 'celsius' ? 'C' : 'F'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${condition.badgeClass}`}>
                  {condition.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Feels like <span className="font-semibold text-slate-700 dark:text-slate-200">{feelsLikeVal}°</span>
                </span>
              </div>
            </div>
          </div>

          {/* Today's Range & Rain Snapshot */}
          <div className="md:col-span-6 flex flex-wrap sm:flex-nowrap gap-3 items-center justify-start md:justify-end">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 px-4 border border-slate-100 dark:border-slate-800 text-center min-w-[110px]">
              <span className="text-[11px] uppercase font-semibold text-slate-400 block">High / Low</span>
              <div className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                <span className="text-rose-500">{todayMax}°</span> /{' '}
                <span className="text-sky-500">{todayMin}°</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 px-4 border border-slate-100 dark:border-slate-800 text-center min-w-[110px]">
              <span className="text-[11px] uppercase font-semibold text-slate-400 block">Rain Chance</span>
              <div className="text-base font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                {rainChance}%
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 px-4 border border-slate-100 dark:border-slate-800 text-center min-w-[110px]">
              <span className="text-[11px] uppercase font-semibold text-slate-400 block">Max UV Index</span>
              <div className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center justify-center gap-1">
                <span>{uvMax.toFixed(1)}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${uvInfo.color}`}>
                  {uvInfo.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Atmospheric Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {/* Humidity */}
          <div className="bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/70">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
              <Droplets className="h-4 w-4 text-sky-500" />
              <span className="text-xs font-medium">Humidity</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {current.relative_humidity_2m}%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {current.relative_humidity_2m > 70 ? 'High moisture' : current.relative_humidity_2m < 30 ? 'Dry air' : 'Comfortable'}
            </div>
          </div>

          {/* Wind */}
          <div className="bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/70">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
              <Wind className="h-4 w-4 text-teal-500" />
              <span className="text-xs font-medium">Wind Speed</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {windVal} <span className="text-xs font-normal text-slate-400">{speedUnit}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
              <Compass className="h-3 w-3" /> {windDir} ({current.wind_direction_10m}°)
            </div>
          </div>

          {/* Precipitation */}
          <div className="bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/70">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
              <CloudRain className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-medium">Precipitation</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {current.precipitation} <span className="text-xs font-normal text-slate-400">mm</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {current.precipitation > 0 ? 'Active rainfall' : 'No rain observed'}
            </div>
          </div>

          {/* Pressure */}
          <div className="bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/70">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
              <Gauge className="h-4 w-4 text-indigo-500" />
              <span className="text-xs font-medium">Air Pressure</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {Math.round(current.surface_pressure)} <span className="text-xs font-normal text-slate-400">hPa</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {current.surface_pressure > 1013 ? 'High pressure' : 'Low pressure'}
            </div>
          </div>

          {/* Apparent Temp */}
          <div className="bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/70">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
              <Thermometer className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-medium">Feels Like</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {feelsLikeVal}°
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {feelsLikeVal > tempVal ? 'Humid heat factor' : feelsLikeVal < tempVal ? 'Wind chill factor' : 'Matches air temp'}
            </div>
          </div>

          {/* UV Intensity */}
          <div className="bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/70">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
              <Sun className="h-4 w-4 text-orange-500" />
              <span className="text-xs font-medium">Solar Exposure</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {uvMax.toFixed(1)} <span className="text-xs font-normal text-slate-400">UV</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {uvMax >= 6 ? 'Sun protection advised' : 'Safe exposure level'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
