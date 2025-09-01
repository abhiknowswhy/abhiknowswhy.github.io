import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Search, Filter, BookOpen, Calendar, Quote, Target } from 'lucide-react';
import { getLibraryData, getCurrentlyReadingBooks, getFavoriteBooks } from '../lib/dataLoader';
import type { Book } from '../types/data';

export default function Library() {
  const libraryData = getLibraryData();
  const currentlyReading = getCurrentlyReadingBooks();
  const favoriteBooks = getFavoriteBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Get unique genres and statuses
  const genres = Array.from(new Set(libraryData.books.flatMap(b => b.genre)));
  const statuses = Array.from(new Set(libraryData.books.map(b => b.readingStatus)));

  // Filter books
  const filteredBooks = libraryData.books.filter((book: Book) => {
    const matchesSearch = searchTerm === '' || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesGenre = selectedGenre === 'all' || book.genre.includes(selectedGenre);
    const matchesStatus = selectedStatus === 'all' || book.readingStatus === selectedStatus;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'read':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'currently-reading':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'want-to-read':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'did-not-finish':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <motion.div
      className="min-h-screen pt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="gradient-text">Library</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of books I've read, am reading, or plan to read. Books shape my thoughts and inspire my work.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 rounded-xl text-center">
            <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {libraryData.books.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Books</div>
          </div>

          <div className="glass-card p-6 rounded-xl text-center">
            <Target className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {libraryData.readingGoals[0]?.target || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Reading Goal</div>
          </div>

          <div className="glass-card p-6 rounded-xl text-center">
            <Calendar className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {currentlyReading.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Currently Reading</div>
          </div>

          <div className="glass-card p-6 rounded-xl text-center">
            <Star className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {favoriteBooks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Favorites</div>
          </div>
        </motion.div>

        {/* Currently Reading */}
        {currentlyReading.length > 0 && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Currently Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentlyReading.map((book: Book) => (
                <motion.div
                  key={book.id}
                  className="glass-card p-6 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        by {book.author}
                      </p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(book.readingStatus)}`}>
                        {book.readingStatus.charAt(0).toUpperCase() + book.readingStatus.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Filters */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="glass-card p-6 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Genre Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-center lg:justify-start">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Books Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBooks.map((book: Book) => (
            <motion.div
              key={book.id}
              variants={itemVariants}
              className="glass-card rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      by {book.author}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(book.readingStatus)}`}>
                      {book.readingStatus.charAt(0).toUpperCase() + book.readingStatus.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                {book.rating && (
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {renderStars(book.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {book.rating}/5
                    </span>
                  </div>
                )}

                {/* Genre */}
                <div className="mb-3">
                  {book.genre.map((g) => (
                    <span
                      key={g}
                      className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mr-2 mb-1"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Review/Quote */}
                {book.review && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-start">
                      <Quote className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <p className="ml-2 text-sm text-gray-600 dark:text-gray-400 italic line-clamp-3">
                        {book.review}
                      </p>
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                    {book.startDate && (
                      <span>Started: {book.startDate}</span>
                    )}
                    {book.finishDate && (
                      <span>Finished: {book.finishDate}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
          >
            <div className="glass-card p-8 rounded-xl max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No books found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('all');
                  setSelectedStatus('all');
                }}
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
