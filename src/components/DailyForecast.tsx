import React from 'react';
import { DailyForecast as DailyType, TempUnit } from '../types';
import { getWeatherInfo, convertTemperature } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';
import { CalendarDays, Droplets, Wind } from 'lucide-react';

interface DailyForecastProps {
  daily: DailyType;
  tempUnit: TempUnit;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily, tempUnit }) => {
  // Global min and max across all 7 days for the relative temperature bar
  const allMins = daily.temperature_2m_min.map((t) => convertTemperature(t, tempUnit));
  const allMaxs = daily.temperature_2m_max.map((t) => convertTemperature(t, tempUnit));
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const globalSpan = Math.max(1, globalMax - globalMin);

  return (
    <div
      id="daily-forecast-container"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-600">
            <CalendarDays className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            7-Day Extended Forecast
          </h3>
        </div>
        <span className="text-xs text-slate-400">Next 7 Days</span>
      </div>

      <div className="space-y-2.5">
        {daily.time.map((timeStr, index) => {
          const date = new Date(timeStr);
          const isToday = index === 0;
          const weekday = isToday
            ? 'Today'
            : date.toLocaleDateString(undefined, { weekday: 'short' });
          const dateSub = date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });

          const code = daily.weather_code[index] ?? 0;
          const condition = getWeatherInfo(code);

          const minTemp = convertTemperature(daily.temperature_2m_min[index] ?? 0, tempUnit);
          const maxTemp = convertTemperature(daily.temperature_2m_max[index] ?? 0, tempUnit);
          const rainChance = daily.precipitation_probability_max[index] ?? 0;
          const precipSum = daily.precipitation_sum[index] ?? 0;
          const maxWind = daily.wind_speed_10m_max[index] ?? 0;

          // Bar calculation
          const leftPercent = Math.max(0, ((minTemp - globalMin) / globalSpan) * 100);
          const widthPercent = Math.max(8, ((maxTemp - minTemp) / globalSpan) * 100);

          return (
            <div
              key={timeStr}
              className={`p-3.5 sm:px-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isToday
                  ? 'bg-sky-50/50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800/40'
                  : 'bg-slate-50/40 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/60 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
              }`}
            >
              {/* Day & Condition */}
              <div className="flex items-center gap-3 sm:w-48 shrink-0">
                <div className="w-16">
                  <span className={`text-sm font-bold block ${isToday ? 'text-sky-600 dark:text-sky-400' : 'text-slate-900 dark:text-white'}`}>
                    {weekday}
                  </span>
                  <span className="text-[11px] text-slate-400">{dateSub}</span>
                </div>

                <div className="flex items-center gap-2 min-w-0">
                  <div className="text-slate-700 dark:text-slate-300 shrink-0">
                    <WeatherIcon name={condition.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                    {condition.label}
                  </span>
                </div>
              </div>

              {/* Rain Probability Pill */}
              <div className="flex items-center gap-1.5 sm:w-28 shrink-0">
                <div
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    rainChance > 30
                      ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <Droplets className="h-3 w-3" />
                  <span>{rainChance}%</span>
                </div>
                {precipSum > 0 && (
                  <span className="text-[11px] text-slate-400">
                    {precipSum.toFixed(1)}mm
                  </span>
                )}
              </div>

              {/* Temperature Range & Bar */}
              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 w-8 text-right shrink-0">
                  {minTemp}°
                </span>

                {/* Relative Range Bar */}
                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 w-8 shrink-0">
                  {maxTemp}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
