'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: backgroundY, scale }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&q=80')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        {/* Animated Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
          animate={{
            background: [
              'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
              'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
              'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>

      {/* Floating Cake Elements with Morphing */}
      <motion.div
        className="absolute top-20 left-10 text-6xl"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        🧁
      </motion.div>
      <motion.div
        className="absolute top-40 right-10 text-5xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
      >
        🎂
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-4xl"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
      >
        🍰
      </motion.div>
      <motion.div
        className="absolute top-60 left-1/4 text-3xl opacity-60"
        animate={{ 
          y: [0, -40, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
      >
        🎀
      </motion.div>
      <motion.div
        className="absolute bottom-60 right-1/4 text-3xl opacity-60"
        animate={{ 
          y: [0, -35, 0],
          x: [0, -15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
      >
        ✨
      </motion.div>

      {/* Main Content with Scroll Effect */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.span 
            className="text-7xl md:text-8xl inline-block"
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            🎂
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 text-shadow"
        >
          <motion.span
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              background: 'linear-gradient(90deg, #fff, #fce7f3, #fff)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Sweet Delights BD
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-pink-200 mb-2 font-medium"
        >
          বাংলাদেশের সেরা কেক শপ
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          প্রতিটি বিশেষ মুহূর্তকে আরও মধুর করুন আমাদের হাতে তৈরি প্রিমিয়াম কেকের সাথে
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#cakes"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4"
          >
            কেক দেখুন 🍰
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-pink-600 transition-all duration-300"
          >
            যোগাযোগ করুন
          </motion.a>
        </motion.div>

        {/* Stats with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { number: '5000+', label: 'সন্তুষ্ট গ্রাহক' },
            { number: '50+', label: 'কেকের ধরন' },
            { number: '100%', label: 'ফ্রেশ উপাদান' },
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="text-2xl md:text-3xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.2 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-pink-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" className="text-white flex flex-col items-center">
          <span className="text-sm mb-2">স্ক্রল করুন</span>
          <FaArrowDown className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
