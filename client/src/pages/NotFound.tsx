import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HomeIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go back home
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Looking for something?</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/explore" className="text-indigo-600 hover:text-indigo-800">
              Explore Mentors
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-indigo-600 hover:text-indigo-800">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">
              Sign Up
            </Link>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

