import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Music, Instagram, Youtube, BookOpen, MapPin, Calendar, Star, Search, Filter, Target, Quote } from 'lucide-react';
import { getLibraryData } from '../lib/dataLoader';
import type { Book } from '../types/data';

const tabData = [
  {
    id: 'music',
    label: 'Music',
    icon: <Music className="h-5 w-5" />,
  },
  {
    id: 'cooking',
    label: 'Cooking',
    icon: <Utensils className="h-5 w-5" />,
  },
  {
    id: 'library',
    label: 'Library',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: <MapPin className="h-5 w-5" />,
  },
];

// Sample music data
const musicData = [
  {
    id: 1,
    title: 'Piano Composition - Rainfall',
    description: 'An original piano piece inspired by the tranquility of rain.',
    type: 'audio',
    url: '/music/rainfall.mp3',
    instagramUrl: 'https://instagram.com/user/post1',
    youtubeUrl: 'https://youtube.com/watch?v=example1',
    date: 'March 2023',
  },
  {
    id: 2,
    title: 'Guitar Cover - Autumn Leaves',
    description: 'My interpretation of the jazz standard "Autumn Leaves".',
    type: 'video',
    url: '/music/autumn-leaves.mp4',
    youtubeUrl: 'https://youtube.com/watch?v=example2',
    date: 'November 2022',
  },
  {
    id: 3,
    title: 'Electronic Production - Horizon',
    description: 'An electronic music track created using Ableton Live.',
    type: 'audio',
    url: '/music/horizon.mp3',
    instagramUrl: 'https://instagram.com/user/post3',
    date: 'January 2023',
  },
];

// Sample cooking data
const cookingData = [
  {
    id: 1,
    title: 'Homemade Pasta Carbonara',
    description: 'Classic Italian carbonara made with fresh ingredients and homemade pasta.',
    image: '/cooking/carbonara.jpg',
    instagramUrl: 'https://instagram.com/user/cooking1',
    ingredients: [
      '400g fresh pasta', '200g pancetta', '4 egg yolks', '50g pecorino cheese', 
      '50g parmesan', 'Black pepper', 'Salt'
    ],
    instructions: 'Cook pasta al dente. Meanwhile, fry pancetta until crisp. Mix egg yolks with grated cheese. Combine hot pasta with pancetta, then mix in egg mixture away from heat. The residual heat will cook the eggs into a creamy sauce.',
    date: 'April 2023',
  },
  {
    id: 2,
    title: 'Japanese Matcha Soufflé Pancakes',
    description: 'Fluffy Japanese-style pancakes with a delicate matcha flavor.',
    image: '/cooking/matcha-pancakes.jpg',
    instagramUrl: 'https://instagram.com/user/cooking2',
    ingredients: [
      '2 eggs (separated)', '30g sugar', '40g milk', '40g flour', 
      '1 tsp matcha powder', '1/2 tsp baking powder', 'Pinch of salt'
    ],
    instructions: 'Whisk egg whites with sugar until stiff peaks form. Mix egg yolks, milk, flour, matcha, and baking powder. Fold egg whites into yolk mixture. Cook on low heat with molds for height.',
    date: 'February 2023',
  },
  {
    id: 3,
    title: 'Mediterranean Mezze Platter',
    description: 'A selection of homemade Mediterranean appetizers including hummus, baba ganoush, and falafel.',
    image: '/cooking/mezze.jpg',
    instagramUrl: 'https://instagram.com/user/cooking3',
    ingredients: [
      'Chickpeas', 'Tahini', 'Eggplant', 'Fresh herbs', 'Olive oil', 'Pita bread'
    ],
    instructions: 'For hummus: blend chickpeas, tahini, garlic, lemon juice, and olive oil. For baba ganoush: roast eggplant until soft, then blend with tahini, garlic, and lemon juice. Serve with warm pita bread.',
    date: 'May 2023',
  },
];

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

export default function Personal() {
  const [activeTab, setActiveTab] = useState('music');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const locationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const libraryData = getLibraryData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Get unique genres and statuses for library
  const genres = Array.from(new Set(libraryData.books.flatMap((b: Book) => b.genre)));
  const statuses = Array.from(new Set(libraryData.books.map((b: Book) => b.readingStatus)));

  // Filter books
  const filteredBooks = libraryData.books.filter((book: Book) => {
    const matchesSearch = searchTerm === '' || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.some((g: string) => g.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGenre = selectedGenre === 'all' || book.genre.includes(selectedGenre);
    const matchesStatus = selectedStatus === 'all' || book.readingStatus === selectedStatus;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  // Handle scrolling to selected location for travel tab
  useEffect(() => {
    if (activeTab === 'travel' && selectedLocation !== null) {
      locationRefs.current[selectedLocation]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedLocation, activeTab]);

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
            Personal Interests
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Beyond code and design, these are the things that bring me joy and inspiration.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex justify-center space-x-8">
            {tabData.map(tab => (
              <button
                key={tab.id}
                className={`py-4 px-1 flex items-center space-x-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Music Tab */}
        {activeTab === 'music' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Music has always been a significant part of my life. Here are some of my original compositions, 
              covers, and musical experiments.
            </p>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {musicData.map(music => (
                <motion.div
                  key={music.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {music.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {music.description}
                    </p>
                    
                    <div className="mb-4">
                      {music.type === 'audio' ? (
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Audio player would be embedded here
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center h-40 flex items-center justify-center">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Video player would be embedded here
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      {music.instagramUrl && (
                        <a
                          href={music.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-pink-600 hover:text-pink-700 transition-colors"
                        >
                          <Instagram className="h-4 w-4 mr-1" />
                          <span className="text-sm">Instagram</span>
                        </a>
                      )}
                      {music.youtubeUrl && (
                        <a
                          href={music.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Youtube className="h-4 w-4 mr-1" />
                          <span className="text-sm">YouTube</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Cooking Tab */}
        {activeTab === 'cooking' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cooking is my creative outlet and a way to share culture and experiences with friends and family. 
              Here are some of my favorite recipes and culinary experiments.
            </p>
            
            <div className="space-y-12">
              {cookingData.map(recipe => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gray-100 dark:bg-gray-700 h-60 md:h-auto">
                      <div className="h-full flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm p-4 text-center">
                          Food photo would be displayed here
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {recipe.title}
                        </h3>
                        
                        {recipe.instagramUrl && (
                          <a
                            href={recipe.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-pink-600 hover:text-pink-700 transition-colors"
                          >
                            <Instagram className="h-4 w-4 mr-1" />
                            <span className="text-sm">View on Instagram</span>
                          </a>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {recipe.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ingredients:</h4>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 grid grid-cols-2 gap-x-4 gap-y-1">
                          {recipe.ingredients.map((ingredient, i) => (
                            <li key={i} className="text-sm">{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Instructions:</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {recipe.instructions}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Library Tab */}
        {activeTab === 'library' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Books have been a constant source of inspiration, knowledge, and entertainment throughout my life.
              Here's a collection of books I've read, am reading, or plan to read.
            </p>
            
            {/* Filter and Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Genre:</span>
                </div>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedGenre === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setSelectedGenre('all')}
                >
                  All
                </button>
                {genres.map((genre: string) => (
                  <button
                    key={genre}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedGenre === genre
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                </div>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedStatus === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setSelectedStatus('all')}
                >
                  All
                </button>
                {statuses.map((status: string) => (
                  <button
                    key={status}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedStatus === status
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Book Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book: Book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {book.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            by {book.author}
                          </p>
                        </div>
                        
                        <div className={`px-3 py-1 text-xs rounded-full ${
                          book.readingStatus === 'read' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : book.readingStatus === 'currently-reading' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {book.readingStatus === 'read' ? 'Read' : 
                           book.readingStatus === 'currently-reading' ? 'Reading' : 
                           book.readingStatus === 'want-to-read' ? 'Want to Read' : 'Did Not Finish'}
                        </div>
                      </div>
                      
                      <div className="mb-4 aspect-[2/3] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm p-4 text-center">
                          Book cover would be displayed here
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {book.genre.map(g => (
                          <span
                            key={g}
                            className="inline-flex items-center text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                      
                      {book.rating !== undefined && book.rating > 0 && (
                        <div className="flex items-center space-x-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (book.rating || 0)
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {book.review && (
                        <div className="flex items-start space-x-2">
                          <Quote className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1" />
                          <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                            {book.review}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No books found matching your criteria. Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Travel Tab */}
        {activeTab === 'travel' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Exploring the world one adventure at a time. Here are some of my favorite destinations.
            </p>
            
            {/* Map Section */}
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-gray-800 rounded-lg overflow-hidden h-[400px] md:h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Interactive map would be implemented here using Leaflet.js or Mapbox
                  </p>
                </div>
              </div>
              
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
        )}
      </motion.div>
    </div>
  );
}
