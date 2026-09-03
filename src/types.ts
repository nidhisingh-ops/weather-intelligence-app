export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  country_code?: string;
  country?: string;
  admin1?: string;
  admin2?: string;
  timezone?: string;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  uv_index_max: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: CurrentWeather;
  hourly: HourlyForecast;
  daily: DailyForecast;
}

export type TempUnit = 'celsius' | 'fahrenheit';
export type SpeedUnit = 'kmh' | 'mph';

export interface WeatherConditionInfo {
  code: number;
  label: string;
  description: string;
  icon: string;
  bgClass: string;
  badgeClass: string;
}

export interface PlanningRecommendation {
  id: string;
  category: 'activity' | 'clothing' | 'precautions' | 'travel';
  title: string;
  description: string;
  level: 'optimal' | 'moderate' | 'caution' | 'warning';
  icon: string;
}

export interface OutdoorScore {
  score: number;
  label: 'Ideal' | 'Good' | 'Fair' | 'Poor' | 'Hazardous';
  summary: string;
  colorClass: string;
  barColorClass: string;
}
