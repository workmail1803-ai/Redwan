'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaHeart, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

const cakes = [
  {
    id: 1,
    name: 'চকলেট ড্রিপ কেক',
    nameEn: 'Chocolate Drip Cake',
    price: 1500,
    originalPrice: 1800,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    rating: 4.9,
    reviews: 128,
    tag: 'বেস্টসেলার',
    description: 'চকলেট ড্রিপ ও গোল্ড টাচ সহ',
    size: '১ পাউন্ড',
  },
  {
    id: 2,
    name: 'রেড ভেলভেট হার্ট',
    nameEn: 'Red Velvet Heart',
    price: 1800,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&q=80',
    rating: 4.9,
    reviews: 156,
    tag: 'জনপ্রিয়',
    description: 'হার্ট শেপ রেড ভেলভেট',
    size: '১.৫ পাউন্ড',
  },
  {
    id: 3,
    name: 'চকলেট ফ্লাওয়ার',
    nameEn: 'Chocolate Flower',
    price: 1600,
    originalPrice: 2000,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80',
    rating: 4.8,
    reviews: 112,
    tag: 'প্রিমিয়াম',
    description: 'সাদা ফুল ডেকোরেশন সহ',
    size: '১ পাউন্ড',
  },
  {
    id: 4,
    name: 'পিস্তা গ্রিন কেক',
    nameEn: 'Pistachio Green',
    price: 1400,
    originalPrice: 1700,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80',
    rating: 4.7,
    reviews: 89,
    tag: 'ফ্রেশ',
    description: 'পিস্তা ফ্লেভার কেক',
    size: '১ পাউন্ড',
  },
  {
    id: 5,
    name: 'ভ্যানিলা ক্লাসিক',
    nameEn: 'Vanilla Classic',
    price: 1200,
    originalPrice: 1500,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80',
    rating: 4.7,
    reviews: 89,
    tag: 'ক্লাসিক',
    description: 'মাদাগাস্কার ভ্যানিলা বিন',
    size: '১ পাউন্ড',
  },
  {
    id: 6,
    name: 'ব্ল্যাক ফরেস্ট',
    nameEn: 'Black Forest',
    price: 1700,
    originalPrice: 2000,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&q=80',
    rating: 4.8,
    reviews: 112,
    tag: 'স্পেশাল',
    description: 'চেরি ও চকলেট শেভিংস',
    size: '১ পাউন্ড',
  },
];

export default function FeaturedCakes() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [favorites, setFavorites] = useState<number[]>([]);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleWhatsAppOrder = (cake: typeof cakes[0]) => {
    const message = `হ্যালো! আমি "${cake.name}" (${cake.size}) কেকটি অর্ডার করতে চাই।\n\nদাম: ৳${cake.price}\n\nঅনুগ্রহ করে ডেলিভারি ডিটেইলস জানান।`;
    window.open(`https://wa.me/8801700000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section
      id="cakes"
      ref={ref}
      className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-cream via-pink-50/50 to-cream"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-5xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎂
          </motion.span>
          <h2 className="section-title">আমাদের জনপ্রিয় কেক</h2>
          <p className="section-subtitle">
            প্রতিটি কেক তাজা উপাদান দিয়ে প্রতিদিন তৈরি করা হয়
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cakes.map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cake-card bg-white rounded-3xl overflow-hidden shadow-lg group"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={imageErrors[cake.id] ? cake.fallbackImage : cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={() => handleImageError(cake.id)}
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Tag */}
                <motion.div
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                >
                  {cake.tag}
                </motion.div>

                {/* Wishlist Button */}
                <motion.button
                  onClick={() => toggleFavorite(cake.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${favorites.includes(cake.id)
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/90 text-gray-400 hover:text-pink-500'
                    }`}
                >
                  <FaHeart />
                </motion.button>

                {/* Discount Badge */}
                {cake.originalPrice > cake.price && (
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                    {Math.round(((cake.originalPrice - cake.price) / cake.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Size Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 text-chocolate text-xs font-bold px-2 py-1 rounded-lg">
                  {cake.size}
                </div>

                {/* Quick Actions on Hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleWhatsAppOrder(cake)}
                    className="px-4 py-2 bg-green-500 text-white rounded-full font-medium shadow-lg flex items-center gap-2"
                  >
                    <FaWhatsapp /> দ্রুত অর্ডার
                  </motion.button>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(cake.rating) ? 'text-yellow-400' : 'text-gray-200'}
                        size={14}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">{cake.rating}</span>
                  <span className="text-gray-400 text-xs">({cake.reviews} রিভিউ)</span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-chocolate mb-1">{cake.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{cake.description}</p>

                {/* Price & Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-pink-600">৳{cake.price}</span>
                    {cake.originalPrice > cake.price && (
                      <span className="text-gray-400 line-through ml-2 text-sm">
                        ৳{cake.originalPrice}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <FaShoppingCart />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            সব কেক দেখুন →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
