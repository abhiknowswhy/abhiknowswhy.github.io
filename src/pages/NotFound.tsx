import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
			<motion.div
				initial={{ opacity: 0, y: -50, scale: 0.5 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
			>
				<h1 className="text-8xl font-extrabold text-gray-900 dark:text-white tracking-wider">
					404
				</h1>
				<h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
					Page Not Found
				</h2>
			</motion.div>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.5 }}
				className="mt-6 text-lg text-gray-500 dark:text-gray-400 max-w-md"
			>
				Sorry, the page you are looking for does not exist. It might have been moved or deleted.
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8, duration: 0.5 }}
				className="mt-10"
			>
				<Link
					to="/"
					className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
				>
					Go back to Home
				</Link>
			</motion.div>
		</div>
	);
}
