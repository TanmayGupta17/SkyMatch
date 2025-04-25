"use client";

import { motion } from "framer-motion";
import {
  Share2,
  Heart,
  CloudRain,
  Cloud,
  Sun,
  CloudSnowIcon as Snow,
  CloudLightning,
  CloudFog,
} from "lucide-react";
import type { WeatherData } from "@/types";
import WeatherAnimation from "@/components/WeatherAnimation";

interface CurrentWeatherProps {
  weatherData: WeatherData;
  onSaveLocation: () => void;
}

export default function CurrentWeather({
  weatherData,
  onSaveLocation,
}: CurrentWeatherProps) {
  const { name, main, weather, wind, sys } = weatherData;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getWeatherIcon = () => {
    const condition = weather[0].main.toLowerCase();

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return <CloudRain className="h-8 w-8 text-custom-blue" />;
    } else if (condition.includes("cloud")) {
      return <Cloud className="h-8 w-8 text-custom-gray" />;
    } else if (condition.includes("clear") || condition.includes("sun")) {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    } else if (condition.includes("snow")) {
      return <Snow className="h-8 w-8 text-blue-300" />;
    } else if (condition.includes("thunder") || condition.includes("storm")) {
      return <CloudLightning className="h-8 w-8 text-purple-500" />;
    } else if (condition.includes("mist") || condition.includes("fog")) {
      return <CloudFog className="h-8 w-8 text-custom-gray" />;
    } else {
      return <Cloud className="h-8 w-8 text-custom-gray" />;
    }
  };

  const shareWeather = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Weather in ${name}`,
          text: `It's ${Math.round(main.temp)}°C and ${
            weather[0].description
          } in ${name}. Check out these activity suggestions!`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
        });
    } else {
      const shareText = `It's ${Math.round(main.temp)}°C and ${
        weather[0].description
      } in ${name}. Check out these activity suggestions!`;
      navigator.clipboard
        .writeText(shareText)
        .then(() => alert("Weather information copied to clipboard!"))
        .catch((err) => console.error("Error copying to clipboard:", err));
    }
  };

  return (
    <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden">
      <div className="relative h-40 bg-gradient-to-r from-custom-blue to-custom-green flex items-center justify-center">
        <WeatherAnimation weatherCondition={weather[0].main} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold">
              {name}, {sys.country}
            </h2>
            <p className="text-lg opacity-90">{formattedDate}</p>
          </motion.div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {getWeatherIcon()}
            <div className="ml-3">
              <h3 className="text-xl font-semibold text-custom-blue">
                {weather[0].main}
              </h3>
              <p className="text-custom-green capitalize">
                {weather[0].description}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-4xl font-bold text-custom-blue">
              {Math.round(main.temp)}°C
            </div>
            <p className="text-custom-green">
              Feels like {Math.round(main.feels_like)}°C
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-custom-white p-3 rounded-xl">
            <p className="text-custom-gray text-sm">Humidity</p>
            <p className="text-custom-dark-blue font-semibold">
              {main.humidity}%
            </p>
          </div>
          <div className="bg-custom-white p-3 rounded-xl">
            <p className="text-custom-gray text-sm">Wind Speed</p>
            <p className="text-custom-dark-blue font-semibold">
              {wind.speed} m/s
            </p>
          </div>
        </div>

        <div className="flex space-x-1">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSaveLocation}
            className="flex-1 flex items-center justify-center bg-custom-blue hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-l-xl transition-colors"
          >
            <Heart className="h-5 w-5 mr-2" />
            Save Location
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shareWeather}
            className="flex items-center justify-center bg-custom-green hover:bg-opacity-90 text-white font-medium py-2 px-3 rounded-r-xl transition-colors"
          >
            <Share2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
