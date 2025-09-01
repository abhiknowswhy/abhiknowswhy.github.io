import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function Loading({ size = 'md', message = 'Loading...' }: LoadingProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.div
        className={`border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full ${sizeMap[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {message && (
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
          {message}
        </p>
      )}
    </div>
  );
}
