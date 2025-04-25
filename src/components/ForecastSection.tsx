"use client";

import { motion } from "framer-motion";
import type { ForecastData } from "@/types";
import {
  CloudRain,
  Cloud,
  Sun,
  CloudSnowIcon as Snow,
  CloudLightning,
  CloudFog,
} from "lucide-react";
import { getActivitiesByWeather } from "@/lib/activitySuggestions";

interface ForecastSectionProps {
  forecastData: ForecastData;
}

export default function ForecastSection({
  forecastData,
}: ForecastSectionProps) {
  const dailyForecasts = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().split("T")[0];

    if (
      !acc[dateStr] ||
      Math.abs(date.getHours() - 12) <
        Math.abs(new Date(acc[dateStr].dt * 1000).getHours() - 12)
    ) {
      acc[dateStr] = item;
    }

    return acc;
  }, {} as Record<string, (typeof forecastData.list)[0]>);

  const forecasts = Object.values(dailyForecasts).slice(1, 6);

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return <CloudRain className="h-6 w-6 text-custom-blue" />;
    } else if (conditionLower.includes("cloud")) {
      return <Cloud className="h-6 w-6 text-custom-gray" />;
    } else if (
      conditionLower.includes("clear") ||
      conditionLower.includes("sun")
    ) {
      return <Sun className="h-6 w-6 text-yellow-500" />;
    } else if (conditionLower.includes("snow")) {
      return <Snow className="h-6 w-6 text-blue-300" />;
    } else if (
      conditionLower.includes("thunder") ||
      conditionLower.includes("storm")
    ) {
      return <CloudLightning className="h-6 w-6 text-purple-500" />;
    } else if (
      conditionLower.includes("mist") ||
      conditionLower.includes("fog")
    ) {
      return <CloudFog className="h-6 w-6 text-custom-gray" />;
    } else {
      return <Cloud className="h-6 w-6 text-custom-gray" />;
    }
  };

  const formatDay = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <div className="bg-white rounded-b-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-custom-blue mb-4">
        5-Day Forecast
      </h2>

      <div className="space-y-4">
        {forecasts.map((forecast, index) => {
          const activities = getActivitiesByWeather(forecast.weather[0].main);
          const activity = activities[0];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-custom-green/20 p-4 rounded-xl"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="font-medium text-custom-dark-blue w-12">
                    {formatDay(forecast.dt)}
                  </span>
                  <div className="ml-3 flex items-center">
                    {getWeatherIcon(forecast.weather[0].main)}
                    <span className="ml-2 text-custom-gray">
                      {forecast.weather[0].main}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-custom-dark-blue">
                    {Math.round(forecast.main.temp)}°C
                  </span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-500">
                <div className="flex items-start">
                  <div className="text-sm text-custom-gray">
                    <span className="font-medium text-custom-blue">
                      Suggested Activity:
                    </span>{" "}
                    {activity.title} - {activity.description}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
