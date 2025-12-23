'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaStar, FaFire, FaShoppingCart, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const trendingCakes = [
  {
    id: 1,
    name: 'চকলেট ড্রিপ কেক',
    nameEn: 'Chocolate Drip Cake',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    rating: 4.9,
    tag: '🔥 ট্রেন্ডিং',
    description: 'চকলেট ড্রিপ ও গোল্ড টাচ সহ প্রিমিয়াম কেক',
    color: '#8B4513',
    size: '১ পাউন্ড',
  },
  {
    id: 2,
    name: 'রেড ভেলভেট হার্ট',
    nameEn: 'Red Velvet Heart',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80',
    rating: 4.9,
    tag: '❤️ জনপ্রিয়',
    description: 'হার্ট শেপ রেড ভেলভেট - প্রিয়জনের জন্য পারফেক্ট',
    color: '#C41E3A',
    size: '১.৫ পাউন্ড',
  },
  {
    id: 3,
    name: 'চকলেট ফ্লাওয়ার',
    nameEn: 'Chocolate Flower',
    price: 1600,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80',
    rating: 4.8,
    tag: '⭐ প্রিমিয়াম',
    description: 'সাদা ফুল ডেকোরেশন সহ চকলেট গ্লেজ কেক',
    color: '#4a2c2a',
    size: '১ পাউন্ড',
  },
  {
    id: 4,
    name: 'পিস্তা গ্রিন কেক',
    nameEn: 'Pistachio Green Cake',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&q=80',
    rating: 4.7,
    tag: '🌿 ফ্রেশ',
    description: 'বাংলা লেখা সহ পিস্তা ফ্লেভার কেক',
    color: '#6B8E23',
    size: '১ পাউন্ড',
  },
];

export default function TrendingMorphSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate cakes
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trendingCakes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + trendingCakes.length) % trendingCakes.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % trendingCakes.length);
  };

  const handleWhatsAppOrder = (cake: typeof trendingCakes[0]) => {
    const message = `হ্যালো! আমি "${cake.name}" (${cake.size}) কেকটি অর্ডার করতে চাই। দাম: ৳${cake.price}`;
    window.open(`https://wa.me/8801700000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const activeCake = trendingCakes[activeIndex];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Glow */}
      <motion.div
        key={activeCake.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${activeCake.color}66 0%, transparent 60%)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-lg"
          >
            <FaFire className="animate-pulse" />
            ট্রেন্ডিং কেক
            <FaFire className="animate-pulse" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            এই মুহূর্তের সেরা কেক
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto">
            আমাদের সবচেয়ে জনপ্রিয় কেক সমূহ - প্রতিটি প্রেম দিয়ে তৈরি
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <FaChevronRight />
            </button>

            {/* Cake Image */}
            <div className="relative aspect-square max-w-md mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCake.id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative"
                >
                  {/* Glow Behind Image */}
                  <div
                    className="absolute inset-0 rounded-3xl blur-3xl opacity-50 scale-90"
                    style={{ backgroundColor: activeCake.color }}
                  />

                  {/* Image */}
                  <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img
                      src={activeCake.image}
                      alt={activeCake.name}
                      className="w-full h-full object-cover aspect-square"
                    />

                    {/* Tag */}
                    <div className="absolute top-4 left-4 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold shadow-lg">
                      {activeCake.tag}
                    </div>

                    {/* Size Badge */}
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {activeCake.size}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-6">
              {trendingCakes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                      ? 'bg-pink-500 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div className="text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCake.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                {/* Rating */}
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <FaStar className="text-yellow-400" />
                    <span className="text-white font-bold">{activeCake.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">(১২৮+ রিভিউ)</span>
                </div>

                {/* Name */}
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  {activeCake.name}
                </h3>
                <p className="text-gray-400 mb-2">{activeCake.nameEn}</p>

                {/* Description */}
                <p className="text-gray-300 text-lg mb-6">
                  {activeCake.description}
                </p>

                {/* Price */}
                <div className="text-4xl font-bold text-pink-400 mb-8">
                  ৳{activeCake.price.toLocaleString()}
                  <span className="text-lg text-gray-500 line-through ml-3">
                    ৳{(activeCake.price * 1.2).toLocaleString()}
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWhatsAppOrder(activeCake)}
                    className="px-8 py-4 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp size={20} />
                    WhatsApp এ অর্ডার
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-gray-800 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
                    কার্টে যোগ করুন
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Cake Counter */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <span className="text-white font-bold text-lg">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(trendingCakes.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}
