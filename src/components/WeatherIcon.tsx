import React from 'react';
import {
  Sun,
  SunDim,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudRainWind,
  CloudLightning,
  Zap,
  Wind,
  Umbrella,
  CheckCircle2,
  Shirt,
  Sparkles,
  Flame,
  ShieldAlert,
  Footprints,
  Car,
  Navigation,
  Compass,
  Eye,
  Gauge,
  Droplets,
  Thermometer,
  Activity,
  AlertTriangle,
  LucideProps,
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  name: string;
}

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Sun,
  SunDim,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudRainWind,
  CloudLightning,
  Zap,
  Wind,
  Umbrella,
  CheckCircle2,
  Shirt,
  Sparkles,
  Flame,
  ShieldAlert,
  Footprints,
  Car,
  Navigation,
  Compass,
  Eye,
  Gauge,
  Droplets,
  Thermometer,
  Activity,
  AlertTriangle,
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || CloudSun;
  return <IconComponent {...props} />;
};
