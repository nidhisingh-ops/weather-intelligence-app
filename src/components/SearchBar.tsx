import React, { useState, useEffect, useRef } from 'react';
import { GeoLocation } from '../types';
import { searchCities, POPULAR_CITIES } from '../services/weatherApi';
import { Search, MapPin, Navigation, X, Loader2, AlertCircle } from 'lucide-react';

interface SearchBarProps {
  currentCity: GeoLocation | null;
  onSelectCity: (city: GeoLocation) => void;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
  onInvalidSearchAttempt?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  currentCity,
  onSelectCity,
  onUseCurrentLocation,
  isLocating,
  onInvalidSearchAttempt,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<any>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      setHasSearched(false);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const found = await searchCities(query);
        setResults(found);
        setHasSearched(true);
        setIsOpen(true);
        if (found.length === 0 && onInvalidSearchAttempt) {
          onInvalidSearchAttempt(query);
        }
      } catch (err: any) {
        setSearchError('Unable to query Open-Meteo geocoding service. Check network.');
        setResults([]);
        setHasSearched(true);
        setIsOpen(true);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const handleSelect = (city: GeoLocation) => {
    onSelectCity(city);
    setQuery('');
    setIsOpen(false);
    setResults([]);
    setHasSearched(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setHasSearched(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (results.length > 0) {
        handleSelect(results[0]);
      } else if (hasSearched && results.length === 0 && onInvalidSearchAttempt) {
        onInvalidSearchAttempt(query);
      }
    }
  };

  return (
    <div className="w-full space-y-3">
      <div ref={containerRef} className="relative w-full">
        {/* Input Bar */}
        <div className="relative flex items-center">
          <div className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </div>

          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (query.trim().length >= 2) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search city, district, or region worldwide (e.g., London, Tokyo, Chicago)..."
            className="w-full pl-11 pr-24 py-3 text-sm sm:text-base rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />

          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                id="clear-search-btn"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              id="locate-me-btn"
              onClick={onUseCurrentLocation}
              disabled={isLocating}
              title="Use current GPS location"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition disabled:opacity-50"
            >
              <Navigation className={`h-3.5 w-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">GPS</span>
            </button>
          </div>
        </div>

        {/* Dropdown Suggestions */}
        {isOpen && query.trim().length >= 2 && (
          <div
            id="search-results-dropdown"
            className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-40 max-h-80 overflow-y-auto"
          >
            {isSearching && (
              <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
                Querying Open-Meteo Geocoding API...
              </div>
            )}

            {searchError && (
              <div className="p-4 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {searchError}
              </div>
            )}

            {!isSearching && !searchError && results.length === 0 && hasSearched && (
              <div id="no-search-results" className="p-6 text-center">
                <div className="h-10 w-10 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  No location found for "{query}"
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  Double check the city spelling or pick one of the recommended test cities below.
                </p>
              </div>
            )}

            {!isSearching &&
              results.map((item) => (
                <button
                  key={`${item.id}-${item.latitude}-${item.longitude}`}
                  onClick={() => handleSelect(item)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/80 border-b last:border-b-0 border-slate-100 dark:border-slate-800/60 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MapPin className="h-4 w-4 text-slate-400 group-hover:text-sky-500 transition shrink-0" />
                    <div className="truncate flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                        {item.name}
                      </span>
                      {item.country_code && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase shrink-0">
                          {item.country_code}
                        </span>
                      )}
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {[item.admin1, item.country].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0 ml-2">
                    {item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°
                  </span>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Quick Select Popular Cities */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium shrink-0 flex items-center gap-1">
          <MapPin className="h-3 w-3" /> Quick Cities:
        </span>
        {POPULAR_CITIES.map((city) => {
          const isActive = currentCity?.name === city.name;
          return (
            <button
              key={city.name}
              id={`quick-city-${city.name.toLowerCase()}`}
              onClick={() => onSelectCity(city)}
              className={`px-3 py-1 rounded-full font-medium transition whitespace-nowrap shrink-0 border ${
                isActive
                  ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
