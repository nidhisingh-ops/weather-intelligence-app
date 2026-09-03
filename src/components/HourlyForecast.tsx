import React from 'react';
import { HourlyForecast as HourlyType, TempUnit } from '../types';
import { getWeatherInfo, convertTemperature } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';
import { Clock, Droplets } from 'lucide-react';

interface HourlyForecastProps {
  hourly: HourlyType;
  tempUnit: TempUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, tempUnit }) => {
  // Extract the next 24 hours
  const now = new Date();
  const currentHourISO = now.toISOString().slice(0, 13); // e.g. 2026-09-03T05

  // Find index closest to now
  let startIndex = hourly.time.findIndex((t) => t.startsWith(currentHourISO));
  if (startIndex === -1) startIndex = 0;

  const next24 = hourly.time.slice(startIndex, startIndex + 24).map((timeStr, idx) => {
    const actualIdx = startIndex + idx;
    const date = new Date(timeStr);
    const hourLabel = date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
    const isNow = idx === 0;

    const tempCelsius = hourly.temperature_2m[actualIdx] ?? 0;
    const tempConverted = convertTemperature(tempCelsius, tempUnit);
    const rainChance = hourly.precipitation_probability[actualIdx] ?? 0;
    const code = hourly.weather_code[actualIdx] ?? 0;
    const condition = getWeatherInfo(code);

    return {
      timeStr,
      hourLabel: isNow ? 'Now' : hourLabel,
      isNow,
      temp: tempConverted,
      rainChance,
      condition,
    };
  });

  const temps = next24.map((h) => h.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = Math.max(1, maxTemp - minTemp);

  return (
    <div
      id="hourly-forecast-container"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 dark:bg-slate-800 text-sky-600">
            <Clock className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            24-Hour Atmospheric Timeline
          </h3>
        </div>
        <span className="text-xs text-slate-400">Scroll horizontally →</span>
      </div>

      {/* Hourly horizontal carousel */}
      <div className="flex gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar">
        {next24.map((item, index) => {
          // relative height percentage for visual trend
          const heightPercent = 25 + Math.round(((item.temp - minTemp) / tempRange) * 55);

          return (
            <div
              key={item.timeStr + index}
              className={`flex flex-col items-center justify-between p-3 rounded-2xl min-w-[78px] shrink-0 border transition-all ${
                item.isNow
                  ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700/60 shadow-sm'
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800/80 hover:bg-slate-100/70 dark:hover:bg-slate-800'
              }`}
            >
              {/* Hour Label */}
              <span
                className={`text-xs font-semibold ${
                  item.isNow
                    ? 'text-sky-600 dark:text-sky-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.hourLabel}
              </span>

              {/* Weather Icon */}
              <div className="my-3 text-slate-700 dark:text-slate-200">
                <WeatherIcon name={item.condition.icon} className="h-6 w-6" />
              </div>

              {/* Temperature */}
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {item.temp}°
              </span>

              {/* Visual mini bar */}
              <div className="w-1.5 h-12 bg-slate-200 dark:bg-slate-700 rounded-full my-2 flex flex-col justify-end overflow-hidden">
                <div
                  className={`w-full rounded-full transition-all ${
                    item.isNow ? 'bg-sky-500' : 'bg-sky-400/70'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Precipitation Chance */}
              <div
                className={`flex items-center gap-0.5 text-[10px] font-semibold mt-1 ${
                  item.rainChance > 30
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                <Droplets className="h-2.5 w-2.5" />
                <span>{item.rainChance}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
