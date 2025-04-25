"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import type { Location } from "@/types";

interface SearchFormProps {
  onSearch: (location: Location) => void;
  onUseCurrentLocation: () => void;
}

export default function SearchForm({
  onSearch,
  onUseCurrentLocation,
}: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({
        name: query.trim(),
        lat: 0,
        lon: 0,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-custom-blue mb-4">
        Search Location
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-blue bg-custom-white text-custom-dark-blue"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-custom-gray" />
        </div>

        <div className="flex space-x-1">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="flex-1 bg-custom-blue hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-l-xl transition-colors"
          >
            Search
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onUseCurrentLocation}
            className="flex items-center justify-center bg-custom-green hover:bg-opacity-90 text-white font-medium py-2 px-3 rounded-r-xl transition-colors"
          >
            <MapPin className="h-5 w-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
