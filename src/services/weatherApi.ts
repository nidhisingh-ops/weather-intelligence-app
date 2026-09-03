import { GeoLocation, WeatherData } from '../types';

export const POPULAR_CITIES: GeoLocation[] = [
  {
    id: 2759794,
    name: 'Amsterdam',
    latitude: 52.37403,
    longitude: 4.88969,
    country_code: 'NL',
    country: 'The Netherlands',
    admin1: 'North Holland',
  },
  {
    id: 2643743,
    name: 'London',
    latitude: 51.50853,
    longitude: -0.12574,
    country_code: 'GB',
    country: 'United Kingdom',
    admin1: 'England',
  },
  {
    id: 5128581,
    name: 'New York',
    latitude: 40.71427,
    longitude: -74.00597,
    country_code: 'US',
    country: 'United States',
    admin1: 'New York',
  },
  {
    id: 1850147,
    name: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.69171,
    country_code: 'JP',
    country: 'Japan',
    admin1: 'Tokyo',
  },
  {
    id: 2988507,
    name: 'Paris',
    latitude: 48.85341,
    longitude: 2.3488,
    country_code: 'FR',
    country: 'France',
    admin1: 'Île-de-France',
  },
  {
    id: 1277333,
    name: 'Bengaluru',
    latitude: 12.97194,
    longitude: 77.59369,
    country_code: 'IN',
    country: 'India',
    admin1: 'Karnataka',
  },
  {
    id: 2147714,
    name: 'Sydney',
    latitude: -33.86785,
    longitude: 151.20732,
    country_code: 'AU',
    country: 'Australia',
    admin1: 'New South Wales',
  },
];

// Curated list of sovereign country mappings so queries like "Netherlands", "Germany", "India"
// resolve to their primary meteorological centers rather than obscure US unincorporated hamlets.
export const COUNTRY_CAPITAL_MAP: Record<string, GeoLocation> = {
  netherland: {
    id: 2759794,
    name: 'Amsterdam',
    latitude: 52.37403,
    longitude: 4.88969,
    country_code: 'NL',
    country: 'The Netherlands',
    admin1: 'Capital / North Holland',
  },
  netherlands: {
    id: 2759794,
    name: 'Amsterdam',
    latitude: 52.37403,
    longitude: 4.88969,
    country_code: 'NL',
    country: 'The Netherlands',
    admin1: 'Capital / North Holland',
  },
  'the netherlands': {
    id: 2759794,
    name: 'Amsterdam',
    latitude: 52.37403,
    longitude: 4.88969,
    country_code: 'NL',
    country: 'The Netherlands',
    admin1: 'Capital / North Holland',
  },
  holland: {
    id: 2759794,
    name: 'Amsterdam',
    latitude: 52.37403,
    longitude: 4.88969,
    country_code: 'NL',
    country: 'The Netherlands',
    admin1: 'Capital / North Holland',
  },
  uk: {
    id: 2643743,
    name: 'London',
    latitude: 51.50853,
    longitude: -0.12574,
    country_code: 'GB',
    country: 'United Kingdom',
    admin1: 'Capital / England',
  },
  'united kingdom': {
    id: 2643743,
    name: 'London',
    latitude: 51.50853,
    longitude: -0.12574,
    country_code: 'GB',
    country: 'United Kingdom',
    admin1: 'Capital / England',
  },
  england: {
    id: 2643743,
    name: 'London',
    latitude: 51.50853,
    longitude: -0.12574,
    country_code: 'GB',
    country: 'United Kingdom',
    admin1: 'Capital / England',
  },
  usa: {
    id: 5128581,
    name: 'Washington D.C. / New York',
    latitude: 40.71427,
    longitude: -74.00597,
    country_code: 'US',
    country: 'United States',
    admin1: 'United States',
  },
  'united states': {
    id: 4140963,
    name: 'Washington, D.C.',
    latitude: 38.89511,
    longitude: -77.03637,
    country_code: 'US',
    country: 'United States',
    admin1: 'District of Columbia',
  },
  germany: {
    id: 2950159,
    name: 'Berlin',
    latitude: 52.52437,
    longitude: 13.41053,
    country_code: 'DE',
    country: 'Germany',
    admin1: 'Capital / Berlin',
  },
  france: {
    id: 2988507,
    name: 'Paris',
    latitude: 48.85341,
    longitude: 2.3488,
    country_code: 'FR',
    country: 'France',
    admin1: 'Capital / Île-de-France',
  },
  india: {
    id: 1261481,
    name: 'New Delhi',
    latitude: 28.61282,
    longitude: 77.23114,
    country_code: 'IN',
    country: 'India',
    admin1: 'Capital / Delhi',
  },
  japan: {
    id: 1850147,
    name: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.69171,
    country_code: 'JP',
    country: 'Japan',
    admin1: 'Capital / Tokyo',
  },
  australia: {
    id: 2147714,
    name: 'Sydney',
    latitude: -33.86785,
    longitude: 151.20732,
    country_code: 'AU',
    country: 'Australia',
    admin1: 'New South Wales',
  },
  canada: {
    id: 6094817,
    name: 'Ottawa',
    latitude: 45.41117,
    longitude: -75.69812,
    country_code: 'CA',
    country: 'Canada',
    admin1: 'Capital / Ontario',
  },
  switzerland: {
    id: 2657896,
    name: 'Zurich / Bern',
    latitude: 47.36667,
    longitude: 8.55,
    country_code: 'CH',
    country: 'Switzerland',
    admin1: 'Zurich',
  },
  italy: {
    id: 3169070,
    name: 'Rome',
    latitude: 41.89193,
    longitude: 12.51133,
    country_code: 'IT',
    country: 'Italy',
    admin1: 'Capital / Lazio',
  },
  spain: {
    id: 3117735,
    name: 'Madrid',
    latitude: 40.4165,
    longitude: -3.70256,
    country_code: 'ES',
    country: 'Spain',
    admin1: 'Capital / Madrid',
  },
  singapore: {
    id: 1880252,
    name: 'Singapore',
    latitude: 1.28967,
    longitude: 103.85007,
    country_code: 'SG',
    country: 'Singapore',
    admin1: 'Central Singapore',
  },
  uae: {
    id: 292223,
    name: 'Dubai',
    latitude: 25.0657,
    longitude: 55.17128,
    country_code: 'AE',
    country: 'United Arab Emirates',
    admin1: 'Dubai',
  },
  'united arab emirates': {
    id: 292223,
    name: 'Dubai',
    latitude: 25.0657,
    longitude: 55.17128,
    country_code: 'AE',
    country: 'United Arab Emirates',
    admin1: 'Dubai',
  },
  dubai: {
    id: 292223,
    name: 'Dubai',
    latitude: 25.0657,
    longitude: 55.17128,
    country_code: 'AE',
    country: 'United Arab Emirates',
    admin1: 'Dubai',
  },
  brazil: {
    id: 3469058,
    name: 'Brasília',
    latitude: -15.77972,
    longitude: -47.92972,
    country_code: 'BR',
    country: 'Brazil',
    admin1: 'Capital / Federal District',
  },
};

export async function searchCities(query: string): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const lowerQuery = trimmed.toLowerCase();

  // 1. Check if user typed a sovereign country or territory name (e.g. "netherland", "netherlands", "germany")
  const matchedCountryEntries: GeoLocation[] = [];
  for (const [countryKey, location] of Object.entries(COUNTRY_CAPITAL_MAP)) {
    if (
      countryKey === lowerQuery ||
      countryKey.startsWith(lowerQuery) ||
      (lowerQuery.length >= 4 && countryKey.includes(lowerQuery)) ||
      (location.country && location.country.toLowerCase().includes(lowerQuery))
    ) {
      // Avoid duplicate country capitals in top suggestions
      if (!matchedCountryEntries.some(m => m.id === location.id)) {
        matchedCountryEntries.push(location);
      }
    }
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=10&language=en&format=json`;
  
  let remoteResults: GeoLocation[] = [];
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        // Sort results: prioritize national capitals (PPLC), regional capitals (PPLA), and higher population
        const sorted = [...data.results].sort((a: any, b: any) => {
          const aCode = a.feature_code || '';
          const bCode = b.feature_code || '';
          const aScore = aCode === 'PPLC' ? 3 : aCode.startsWith('PPLA') ? 2 : aCode.startsWith('PPL') ? 1 : 0;
          const bScore = bCode === 'PPLC' ? 3 : bCode.startsWith('PPLA') ? 2 : bCode.startsWith('PPL') ? 1 : 0;
          if (aScore !== bScore) return bScore - aScore;
          const aPop = a.population || 0;
          const bPop = b.population || 0;
          return bPop - aPop;
        });

        remoteResults = sorted.map((item: any) => ({
          id: item.id,
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
          elevation: item.elevation,
          country_code: item.country_code,
          country: item.country,
          admin1: item.admin1,
          admin2: item.admin2,
          timezone: item.timezone,
        }));
      }
    }
  } catch (err) {
    console.error('Failed fetching remote geocode results:', err);
  }

  // Combine matched country entries at the top, then remote cities, without duplicates
  const combined: GeoLocation[] = [...matchedCountryEntries];
  for (const item of remoteResults) {
    const isDuplicate = combined.some(
      existing =>
        existing.id === item.id ||
        (Math.abs(existing.latitude - item.latitude) < 0.1 && Math.abs(existing.longitude - item.longitude) < 0.1)
    );
    if (!isDuplicate) {
      combined.push(item);
    }
  }

  return combined.slice(0, 8);
}

export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure',
    hourly: 'temperature_2m,precipitation_probability,weather_code,relative_humidity_2m,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max',
    timezone: 'auto',
    forecast_days: '7',
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather service unavailable (HTTP ${response.status})`);
  }

  const data: WeatherData = await response.json();
  return data;
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<GeoLocation> {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return {
        id: Math.floor(Date.now() / 1000),
        name: data.city || data.locality || data.principalSubdivision || 'Current Location',
        latitude,
        longitude,
        country_code: data.countryCode,
        country: data.countryName,
        admin1: data.principalSubdivision,
      };
    }
  } catch {
    // Fallback if reverse geocoding fails
  }

  return {
    id: Math.floor(Date.now() / 1000),
    name: 'My Location',
    latitude,
    longitude,
    country: 'Detected Coordinates',
  };
}
