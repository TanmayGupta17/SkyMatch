"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import type { Location } from "@/types";

interface SavedLocationsProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
  onRemoveLocation: (locationName: string) => void;
}

export default function SavedLocations({
  locations,
  onSelectLocation,
  onRemoveLocation,
}: SavedLocationsProps) {
  if (locations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-custom-blue mb-4">
        Saved Locations
      </h2>

      <div className="space-y-2">
        <AnimatePresence>
          {locations.map((location) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between bg-custom-green/50 p-3 rounded-xl"
            >
              <button
                onClick={() => onSelectLocation(location)}
                className="flex items-baseline text-left flex-grow hover:text-custom-blue transition-colors"
              >
                <MapPin className="h-4 w-4 mr-2 text-custom-gray" />
                <span className="text-custom-dark-blue">{location.name}</span>
              </button>

              <button
                onClick={() => onRemoveLocation(location.name)}
                className="text-custom-gray hover:text-red-500 transition-colors"
                aria-label={`Remove ${location.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
