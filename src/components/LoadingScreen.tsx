'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-cream to-pink-50 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Cake Icon Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-4 border-pink-200 border-t-pink-500"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-4xl"
        >
          🎂
        </motion.div>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-2xl font-display font-bold gradient-text"
      >
        Sweet Delights BD
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-2 text-pink-600"
      >
        স্বাদে অনন্য, প্রেমে অসীম...
      </motion.p>
    </div>
  );
}
