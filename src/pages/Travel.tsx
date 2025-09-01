import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

// This is a mockup for demo purposes - real implementation would use Leaflet.js or Mapbox
const TravelMap = () => {
  return (
    <div className="bg-blue-50 dark:bg-gray-800 rounded-lg overflow-hidden h-[400px] md:h-[600px] flex items-center justify-center">
      <div className="text-center">
        <MapPin className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-300">
          Interactive map would be implemented here using Leaflet.js or Mapbox
        </p>
      </div>
    </div>
  );
};

// Sample travel data
const travelData = [
  {
    id: 1,
    location: 'Tokyo, Japan',
    coordinates: [35.6762, 139.6503],
    date: 'May 2023',
    description: 'Explored the bustling streets of Shibuya and enjoyed traditional temples in Asakusa.',
    images: ['/tokyo1.jpg', '/tokyo2.jpg'],
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree'],
  },
  {
    id: 2,
    location: 'Barcelona, Spain',
    coordinates: [41.3874, 2.1686],
    date: 'August 2022',
    description: 'Admired Gaudi\'s architectural masterpieces and enjoyed Mediterranean cuisine.',
    images: ['/barcelona1.jpg', '/barcelona2.jpg'],
    highlights: ['Sagrada Familia', 'Park Güell', 'La Rambla'],
  },
  {
    id: 3,
    location: 'New York City, USA',
    coordinates: [40.7128, -74.0060],
    date: 'December 2022',
    description: 'Experienced the magic of NYC during the holiday season with snow-covered Central Park.',
    images: ['/nyc1.jpg', '/nyc2.jpg'],
    highlights: ['Central Park', 'Empire State Building', 'Times Square'],
  },
  {
    id: 4,
    location: 'Cape Town, South Africa',
    coordinates: [-33.9249, 18.4241],
    date: 'February 2023',
    description: 'Hiked Table Mountain and explored the beautiful coastline.',
    images: ['/capetown1.jpg', '/capetown2.jpg'],
    highlights: ['Table Mountain', 'Cape of Good Hope', 'Boulders Beach'],
  },
];

export default function Travel() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const locationRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (selectedLocation !== null) {
      locationRefs.current[selectedLocation]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            My Travels
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Exploring the world one adventure at a time. Here are some of my favorite destinations.
          </p>
        </div>
        
        {/* Map Section */}
        <div className="space-y-6">
          <TravelMap />
          
          <div className="flex flex-wrap gap-2 justify-center">
            {travelData.map((location, index) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(index)}
                className={`px-4 py-2 rounded-full flex items-center text-sm ${
                  selectedLocation === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <MapPin className="h-4 w-4 mr-1" />
                {location.location}
              </button>
            ))}
          </div>
        </div>
        
        {/* Travel Entries */}
        <div className="space-y-8">
          {travelData.map((travel, index) => (
            <motion.div
              key={travel.id}
              ref={(el) => {
                locationRefs.current[index] = el;
                return undefined;
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6 border-l-4 ${
                selectedLocation === index ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <div className="md:flex md:items-start">
                <div className="md:w-2/3 md:pr-8">
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {travel.location}
                    </h2>
                  </div>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{travel.date}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {travel.description}
                  </p>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Highlights:</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                      {travel.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:w-1/3">
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center p-4">
                      Photo gallery would be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
