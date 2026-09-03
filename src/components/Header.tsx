import React from 'react';
import { TempUnit, SpeedUnit } from '../types';
import { CloudLightning, RefreshCw, BookOpen, Globe2 } from 'lucide-react';

interface HeaderProps {
  tempUnit: TempUnit;
  onToggleTempUnit: () => void;
  speedUnit: SpeedUnit;
  onToggleSpeedUnit: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenDeploymentGuide: () => void;
  lastUpdated?: Date;
}

export const Header: React.FC<HeaderProps> = ({
  tempUnit,
  onToggleTempUnit,
  speedUnit,
  onToggleSpeedUnit,
  onRefresh,
  isRefreshing,
  onOpenDeploymentGuide,
  lastUpdated,
}) => {
  return (
    <header id="app-header" className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 shrink-0">
            <CloudLightning className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white truncate">
                Weather Intelligence
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Open-Meteo Live
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate">
              Real-time atmospheric analytics & predictive planning
            </p>
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Unit Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              id="unit-celsius-btn"
              onClick={tempUnit === 'fahrenheit' ? onToggleTempUnit : undefined}
              className={`px-2.5 py-1 rounded-md transition-all ${
                tempUnit === 'celsius'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              °C
            </button>
            <button
              id="unit-fahrenheit-btn"
              onClick={tempUnit === 'celsius' ? onToggleTempUnit : undefined}
              className={`px-2.5 py-1 rounded-md transition-all ${
                tempUnit === 'fahrenheit'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              °F
            </button>
          </div>

          {/* Speed Unit Toggle (Desktop) */}
          <button
            id="unit-speed-btn"
            onClick={onToggleSpeedUnit}
            title="Toggle wind speed unit (km/h or mph)"
            className="hidden md:inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
          >
            {speedUnit.toUpperCase()}
          </button>

          {/* Refresh Button */}
          <button
            id="refresh-weather-btn"
            onClick={onRefresh}
            disabled={isRefreshing}
            title={lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Refresh data'}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
          </button>

          {/* Deployment Guide Modal Launcher */}
          <button
            id="deployment-guide-btn"
            onClick={onOpenDeploymentGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition shadow-sm"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Deployment Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};
