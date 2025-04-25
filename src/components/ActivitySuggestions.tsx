"use client";

import { motion } from "framer-motion";
import { getActivitiesByWeather } from "@/lib/activitySuggestions";
import {
  Camera,
  Coffee,
  Book,
  Utensils,
  MapPin,
  Dumbbell,
  Film,
  Cake,
  Landmark,
  Scissors,
  CoffeeIcon as MugHot,
  Snowflake,
  Moon,
  Mountain,
  Plane,
  GraduationCap,
  Phone,
  BrushIcon as Broom,
  SpadeIcon as Spa,
  Dice1Icon as Dice,
  CloudLightning,
  Pen,
  SproutIcon as Seedling,
} from "lucide-react";

interface ActivitySuggestionsProps {
  weatherCondition: string;
}

export default function ActivitySuggestions({
  weatherCondition,
}: ActivitySuggestionsProps) {
  const activities = getActivitiesByWeather(weatherCondition);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "camera":
        return <Camera className="h-5 w-5" />;
      case "coffee":
        return <Coffee className="h-5 w-5" />;
      case "book":
        return <Book className="h-5 w-5" />;
      case "utensils":
        return <Utensils className="h-5 w-5" />;
      case "map-pin":
        return <MapPin className="h-5 w-5" />;
      case "dumbbell":
        return <Dumbbell className="h-5 w-5" />;
      case "film":
        return <Film className="h-5 w-5" />;
      case "cake":
        return <Cake className="h-5 w-5" />;
      case "landmark":
        return <Landmark className="h-5 w-5" />;
      case "scissors":
        return <Scissors className="h-5 w-5" />;
      case "mug-hot":
        return <MugHot className="h-5 w-5" />;
      case "snowflake":
        return <Snowflake className="h-5 w-5" />;
      case "moon-stars":
        return <Moon className="h-5 w-5" />;
      case "mountain":
        return <Mountain className="h-5 w-5" />;
      case "plane":
        return <Plane className="h-5 w-5" />;
      case "graduation-cap":
        return <GraduationCap className="h-5 w-5" />;
      case "phone":
        return <Phone className="h-5 w-5" />;
      case "broom":
        return <Broom className="h-5 w-5" />;
      case "spa":
        return <Spa className="h-5 w-5" />;
      case "dice":
        return <Dice className="h-5 w-5" />;
      case "cloud-bolt":
        return <CloudLightning className="h-5 w-5" />;
      case "pen":
        return <Pen className="h-5 w-5" />;
      case "seedling":
        return <Seedling className="h-5 w-5" />;
      default:
        return <Coffee className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-custom-blue mb-4">
        Suggested Activities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-custom-white p-4 rounded-xl flex items-start"
          >
            <div className="bg-custom-green bg-opacity-20 p-2 rounded-full mr-3 text-custom-green">
              {getIcon(activity.icon)}
            </div>
            <div>
              <h3 className="font-medium text-custom-dark-blue">
                {activity.title}
              </h3>
              <p className="text-sm text-custom-gray">{activity.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
