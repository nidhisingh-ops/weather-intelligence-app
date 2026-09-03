import { WeatherData, PlanningRecommendation, OutdoorScore } from '../types';

export function calculateWeatherIntelligence(weather: WeatherData): {
  score: OutdoorScore;
  recommendations: PlanningRecommendation[];
} {
  const current = weather.current;
  const todayDaily = {
    tempMax: weather.daily.temperature_2m_max[0] ?? current.temperature_2m,
    tempMin: weather.daily.temperature_2m_min[0] ?? current.temperature_2m,
    rainProb: weather.daily.precipitation_probability_max[0] ?? 0,
    precipSum: weather.daily.precipitation_sum[0] ?? 0,
    uvMax: weather.daily.uv_index_max[0] ?? 0,
    windMax: weather.daily.wind_speed_10m_max[0] ?? current.wind_speed_10m,
  };

  const temp = current.temperature_2m;
  const rainProb = todayDaily.rainProb;
  const precip = current.precipitation;
  const wind = current.wind_speed_10m;
  const uv = todayDaily.uvMax;
  const weatherCode = current.weather_code;

  // 1. Calculate Outdoor Activity Score (0 - 100)
  let score = 100;

  // Temperature penalty
  if (temp < 0) score -= 35;
  else if (temp < 10) score -= 15;
  else if (temp > 35) score -= 40;
  else if (temp > 29) score -= 20;

  // Rain / precipitation penalty
  if (precip > 2) score -= 40;
  else if (precip > 0) score -= 20;
  else if (rainProb > 60) score -= 25;
  else if (rainProb > 30) score -= 10;

  // Wind penalty
  if (wind > 50) score -= 35;
  else if (wind > 30) score -= 20;
  else if (wind > 20) score -= 10;

  // Severe weather codes
  if ([95, 96, 99].includes(weatherCode)) score -= 50; // Thunderstorms
  if ([71, 73, 75, 85, 86].includes(weatherCode)) score -= 30; // Snow
  if ([45, 48].includes(weatherCode)) score -= 20; // Dense fog

  score = Math.max(10, Math.min(100, score));

  let scoreLabel: OutdoorScore['label'] = 'Ideal';
  let scoreColorClass = 'text-emerald-600 dark:text-emerald-400';
  let barColorClass = 'bg-emerald-500';
  let scoreSummary = 'Excellent conditions for outdoor sports, walking, and running.';

  if (score < 30) {
    scoreLabel = 'Hazardous';
    scoreColorClass = 'text-rose-600 dark:text-rose-400';
    barColorClass = 'bg-rose-500';
    scoreSummary = 'Adverse conditions present. Outdoor workouts and extended exposure not advised.';
  } else if (score < 50) {
    scoreLabel = 'Poor';
    scoreColorClass = 'text-orange-600 dark:text-orange-400';
    barColorClass = 'bg-orange-500';
    scoreSummary = 'Unfavorable weather due to rain, cold, or high winds. Indoor activities preferred.';
  } else if (score < 75) {
    scoreLabel = 'Fair';
    scoreColorClass = 'text-amber-600 dark:text-amber-400';
    barColorClass = 'bg-amber-500';
    scoreSummary = 'Acceptable conditions with minor disruptions. Plan outdoor outings with preparation.';
  } else if (score < 90) {
    scoreLabel = 'Good';
    scoreColorClass = 'text-sky-600 dark:text-sky-400';
    barColorClass = 'bg-sky-500';
    scoreSummary = 'Very favorable weather for running, cycling, or recreational outings.';
  }

  const scoreObj: OutdoorScore = {
    score,
    label: scoreLabel,
    summary: scoreSummary,
    colorClass: scoreColorClass,
    barColorClass,
  };

  // 2. Build Smart Recommendations
  const recommendations: PlanningRecommendation[] = [];

  // Umbrella & Rain Alert
  if (precip > 0 || rainProb >= 40) {
    recommendations.push({
      id: 'rain-alert',
      category: 'precautions',
      title: 'Umbrella Strongly Advised',
      description: `Precipitation probability is ${rainProb}%. Carry an umbrella or waterproof outerwear if stepping out.`,
      level: precip > 1 || rainProb > 70 ? 'warning' : 'caution',
      icon: 'Umbrella',
    });
  } else {
    recommendations.push({
      id: 'rain-clear',
      category: 'precautions',
      title: 'Dry Outlook',
      description: 'Low probability of precipitation today. No umbrella needed for routine trips.',
      level: 'optimal',
      icon: 'CheckCircle2',
    });
  }

  // Clothing & Layering Recommendation
  if (temp <= 5) {
    recommendations.push({
      id: 'clothing-freezing',
      category: 'clothing',
      title: 'Heavy Thermal Layers Required',
      description: `Current temperature is ${Math.round(temp)}°C. Wear an insulated down coat, gloves, scarf, and thermal base layers.`,
      level: 'warning',
      icon: 'Shirt',
    });
  } else if (temp <= 14) {
    recommendations.push({
      id: 'clothing-chilly',
      category: 'clothing',
      title: 'Chilly: Jacket or Fleece Needed',
      description: `Current temperature is ${Math.round(temp)}°C. A medium fleece jacket or windbreaker with long sleeves is recommended.`,
      level: 'moderate',
      icon: 'Shirt',
    });
  } else if (temp <= 23) {
    recommendations.push({
      id: 'clothing-comfortable',
      category: 'clothing',
      title: 'Comfortable & Mild Attire',
      description: 'Pleasant thermal balance. Light knitwear, shirts, and jeans will keep you comfortable throughout the day.',
      level: 'optimal',
      icon: 'Sparkles',
    });
  } else if (temp <= 30) {
    recommendations.push({
      id: 'clothing-warm',
      category: 'clothing',
      title: 'Warm: Breathable Fabrics',
      description: 'Warm conditions. Wear lightweight cotton, shorts or breathable casuals, and stay hydrated.',
      level: 'optimal',
      icon: 'Sun',
    });
  } else {
    recommendations.push({
      id: 'clothing-hot',
      category: 'clothing',
      title: 'Extreme Heat: Stay Cool',
      description: `High heat of ${Math.round(temp)}°C. Wear loose UV-protective clothing, a sun hat, and drink ample fluids.`,
      level: 'warning',
      icon: 'Flame',
    });
  }

  // UV Protection Advisory
  if (uv >= 6) {
    recommendations.push({
      id: 'uv-warning',
      category: 'precautions',
      title: `High UV Index (${uv.toFixed(1)})`,
      description: 'Sunburn risk is elevated between 10:00 AM and 4:00 PM. Apply SPF 30+ sunscreen and wear UV-rated sunglasses.',
      level: uv >= 8 ? 'warning' : 'caution',
      icon: 'ShieldAlert',
    });
  }

  // Activity & Sports Advisory
  if ([95, 96, 99].includes(weatherCode)) {
    recommendations.push({
      id: 'storm-advisory',
      category: 'activity',
      title: 'Thunderstorm Hazard',
      description: 'Lightning activity detected. Postpone outdoor sports, swimming, and open-field activities until storm passes.',
      level: 'warning',
      icon: 'Zap',
    });
  } else if (wind >= 38) {
    recommendations.push({
      id: 'wind-advisory',
      category: 'travel',
      title: `High Wind Gusts (${Math.round(wind)} km/h)`,
      description: 'Challenging crosswinds for cycling, high-sided vehicles, and lightweight objects. Exercise extra caution on highways.',
      level: 'caution',
      icon: 'Wind',
    });
  } else if (score >= 75) {
    recommendations.push({
      id: 'sports-optimal',
      category: 'activity',
      title: 'Prime Window for Outdoor Workouts',
      description: 'Favorable air temperature, calm winds, and clear paths make this a great day for jogging, tennis, or park runs.',
      level: 'optimal',
      icon: 'Footprints',
    });
  }

  // Commute / Travel Advisory
  if ([45, 48].includes(weatherCode)) {
    recommendations.push({
      id: 'fog-commute',
      category: 'travel',
      title: 'Fog & Reduced Visibility',
      description: 'Dense fog layers can drop roadway visibility below 1 km. Use low-beam headlights and leave extra braking room.',
      level: 'caution',
      icon: 'Car',
    });
  } else if (precip > 1.5 || [63, 65, 73, 75, 82].includes(weatherCode)) {
    recommendations.push({
      id: 'slick-roads',
      category: 'travel',
      title: 'Wet Roadways & Traffic Delays',
      description: 'Standing water can increase hydroplaning risk and slow transit commutes. Allow 10-15 minutes extra travel time.',
      level: 'caution',
      icon: 'Car',
    });
  } else {
    recommendations.push({
      id: 'smooth-commute',
      category: 'travel',
      title: 'Clear Commute Conditions',
      description: 'Standard roadway and transit conditions with no major weather hazards affecting local routes.',
      level: 'optimal',
      icon: 'Navigation',
    });
  }

  return {
    score: scoreObj,
    recommendations,
  };
}
