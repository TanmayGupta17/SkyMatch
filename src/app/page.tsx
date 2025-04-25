"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchForm from "@/components/SearchForm";
import CurrentWeather from "@/components/CurrentWeather";
import ActivitySuggestions from "@/components/ActivitySuggestions";
import ForecastSection from "@/components/ForecastSection";
import SavedLocations from "@/components/SavedLocations";
import type { WeatherData, ForecastData, Location } from "@/types";
import { fetchWeatherData, fetchForecastData } from "@/lib/api";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);

  const { coordinates, getLocation, locationError } = useGeolocation();

  useEffect(() => {
    const saved = localStorage.getItem("savedLocations");
    if (saved) {
      setSavedLocations(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (coordinates) {
      handleSearch({
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        name: "Current Location",
      });
    }
  }, [coordinates]);

  const handleSearch = async (location: Location) => {
    setIsLoading(true);
    setError(null);

    try {
      const weather = await fetchWeatherData(location);
      setWeatherData(weather);

      const forecast = await fetchForecastData(location);
      setForecastData(forecast);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLocation = (location: Location) => {
    const newSavedLocations = [...savedLocations];

    const exists = newSavedLocations.some((loc) => loc.name === location.name);

    if (!exists) {
      newSavedLocations.push(location);
      setSavedLocations(newSavedLocations);
      localStorage.setItem("savedLocations", JSON.stringify(newSavedLocations));
    }
  };

  const removeLocation = (locationName: string) => {
    const newSavedLocations = savedLocations.filter(
      (loc) => loc.name !== locationName
    );
    setSavedLocations(newSavedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(newSavedLocations));
  };

  return (
    <main className="min-h-screen bg-custom-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-custom-blue mb-2 tracking-wide md:text-center text-start">
            SkyMatch
          </h1>
          <p className="text-custom-green text-base md:text-lg tracking-widest md:text-center text-start pr-8 md:pr-0">
            Match your mood and activities with the weather
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SearchForm
                onSearch={handleSearch}
                onUseCurrentLocation={getLocation}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SavedLocations
                locations={savedLocations}
                onSelectLocation={handleSearch}
                onRemoveLocation={removeLocation}
              />
            </motion.div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-blue"></div>
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </motion.div>
            ) : weatherData ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <CurrentWeather
                    weatherData={weatherData}
                    onSaveLocation={() =>
                      saveLocation({
                        name: weatherData.name,
                        lat: weatherData.coord.lat,
                        lon: weatherData.coord.lon,
                      })
                    }
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <ActivitySuggestions
                    weatherCondition={weatherData.weather[0].main}
                  />
                </motion.div>

                {forecastData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <ForecastSection forecastData={forecastData} />
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <h2 className="text-xl font-semibold text-custom-blue mb-2 ">
                  Welcome to SkyMatch. A Weather Activity Suggester
                </h2>
                <p className="text-custom-green mb-4 text-sm max-w-96 text-center mx-auto">
                  Search for a location or use your current location to get
                  weather-based activity suggestions.
                </p>
                <button
                  onClick={getLocation}
                  className="bg-custom-blue hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-2xl transition-colors text-sm"
                >
                  Use My Location
                </button>
                {locationError && (
                  <p className="mt-2 text-red-500 text-sm">{locationError}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
