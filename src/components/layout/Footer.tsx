import { Heart, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPersonalData } from '../../lib/dataLoader';

export default function Footer() {
  const personalData = getPersonalData();
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
  };

  return (
    <footer className="glass-card mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {personalData.profile.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {personalData.profile.bio}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              {['Home', 'About', 'Projects', 'Blog', 'Personal', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors duration-200 w-fit"
                  whileHover={{ x: 4 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Connect
            </h3>
            <div className="flex space-x-4">
              {Object.entries(personalData.social).map(([platform, url]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon || !url) return null;
                
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Visit ${platform} profile`}
                  >
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} {personalData.profile.name}. Made with</span>
              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
              <span>using React & TypeScript</span>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-500 flex items-center space-x-4">
              <a
                href="/privacy"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
