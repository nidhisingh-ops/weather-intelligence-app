import React from 'react';
import { AlertCircle, RefreshCw, SearchX, Globe } from 'lucide-react';
import { POPULAR_CITIES } from '../services/weatherApi';
import { GeoLocation } from '../types';

interface ErrorStateProps {
  type: 'network' | 'not_found' | 'geolocation';
  message: string;
  onRetry?: () => void;
  onSelectCity?: (city: GeoLocation) => void;
  testedQuery?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  type,
  message,
  onRetry,
  onSelectCity,
  testedQuery,
}) => {
  return (
    <div
      id="weather-error-container"
      className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-xl mx-auto space-y-4"
    >
      <div className="h-16 w-16 mx-auto rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-inner">
        {type === 'not_found' ? <SearchX className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {type === 'not_found' ? 'Location Not Found' : 'Weather Data Unavailable'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          {message}
        </p>
      </div>

      {testedQuery && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 text-xs font-mono">
          <span>Query tested: "{testedQuery}"</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ Invalid query error handled
          </span>
        </div>
      )}

      {onRetry && (
        <div className="pt-2">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </button>
        </div>
      )}

      {onSelectCity && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 block">
            Or switch to a verified location:
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR_CITIES.slice(0, 4).map((city) => (
              <button
                key={city.name}
                onClick={() => onSelectCity(city)}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-600 transition"
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
