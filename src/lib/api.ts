import type { Location, WeatherData, ForecastData } from "@/types";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;
console.log("API_KEY", API_KEY);
const BASE_URL = "https://api.openweathermap.org/data/2.5";;

export async function fetchWeatherData(
  location: Location
): Promise<WeatherData> {
  let url: string;

  if (location.name === "Current Location") {
    url = `${BASE_URL}/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`;
  } else {
    url = `${BASE_URL}/weather?q=${location.name}&units=metric&appid=${API_KEY}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}

export async function fetchForecastData(
  location: Location
): Promise<ForecastData> {
  let url: string;

  if (location.name === "Current Location") {
    url = `${BASE_URL}/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`;
  } else {
    url = `${BASE_URL}/forecast?q=${location.name}&units=metric&appid=${API_KEY}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  return response.json();
}
