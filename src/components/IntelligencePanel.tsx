import React from 'react';
import { WeatherData } from '../types';
import { calculateWeatherIntelligence } from '../utils/intelligence';
import { WeatherIcon } from './WeatherIcon';
import { Sparkles, Shield, Compass, CheckCircle } from 'lucide-react';

interface IntelligencePanelProps {
  weather: WeatherData;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ weather }) => {
  const { score, recommendations } = calculateWeatherIntelligence(weather);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'optimal':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40';
      case 'moderate':
        return 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/40';
      case 'caution':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40';
      case 'warning':
        return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div
      id="weather-intelligence-panel"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Weather Intelligence & Daily Planning
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Computed heuristics for health, apparel, commuting, and outdoor routines
            </p>
          </div>
        </div>

        {/* Outdoor Score Badge */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 px-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Outdoor Score
            </span>
            <span className={`text-sm font-extrabold ${score.colorClass}`}>
              {score.label} ({score.score}/100)
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-sm text-slate-800 dark:text-slate-100">
            {score.score}
          </div>
        </div>
      </div>

      {/* Outdoor Summary description */}
      <div className="bg-slate-50/70 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <Shield className="h-5 w-5 text-sky-500 shrink-0" />
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white">Overall Assessment: </span>
          {score.summary}
        </p>
      </div>

      {/* Smart Advisory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition flex items-start gap-3.5"
          >
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-slate-200/80 dark:border-slate-700 shadow-sm shrink-0 mt-0.5">
              <WeatherIcon name={item.icon} className="h-5 w-5" />
            </div>

            <div className="min-w-0 space-y-1 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {item.title}
                </h4>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${getLevelBadge(item.level)} shrink-0`}>
                  {item.level}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
