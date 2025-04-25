export interface Location {
  name: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface ActivitySuggestion {
  title: string;
  description: string;
  icon: string;
}
