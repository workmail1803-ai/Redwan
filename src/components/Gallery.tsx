'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaHeart, FaWhatsapp } from 'react-icons/fa';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    category: 'chocolate',
    title: 'চকলেট ড্রিপ কেক',
    price: 1500,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80',
    category: 'special',
    title: 'রেড ভেলভেট হার্ট',
    price: 1800,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80',
    category: 'wedding',
    title: 'চকলেট ফ্লাওয়ার কেক',
    price: 1600,
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80',
    category: 'birthday',
    title: 'পিস্তা গ্রিন কেক',
    price: 1400,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80',
    category: 'special',
    title: 'স্পেশাল রেড ভেলভেট',
    price: 2000,
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&q=80',
    category: 'birthday',
    title: 'বার্থডে স্পেশাল',
    price: 1500,
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80',
    category: 'chocolate',
    title: 'চকলেট ডিলাক্স',
    price: 1700,
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80',
    category: 'fruit',
    title: 'ফ্রুট কেক',
    price: 1300,
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80',
    category: 'cupcake',
    title: 'কাপকেক সেট',
    price: 800,
  },
];

const filters = [
  { id: 'all', name: 'সব', emoji: '🎂' },
  { id: 'birthday', name: 'জন্মদিন', emoji: '🎈' },
  { id: 'wedding', name: 'বিয়ে', emoji: '💒' },
  { id: 'chocolate', name: 'চকলেট', emoji: '🍫' },
  { id: 'fruit', name: 'ফ্রুট', emoji: '🍓' },
  { id: 'special', name: 'স্পেশাল', emoji: '⭐' },
];

export default function Gallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredImages = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleWhatsAppOrder = (image: typeof galleryImages[0]) => {
    const message = `হ্যালো! আমি "${image.title}" কেকটি অর্ডার করতে চাই।\n\nদাম: ৳${image.price}\n\nঅনুগ্রহ করে ডেলিভারি ডিটেইলস জানান।`;
    window.open(`https://wa.me/8801700000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[prevIndex]);
    }
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-chocolate via-chocolate/95 to-chocolate"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block text-5xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📸
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
            আমাদের গ্যালারি
          </h2>
          <p className="text-pink-200 max-w-2xl mx-auto">
            আমাদের সৃষ্টির কিছু নমুনা দেখুন - প্রতিটি কেক প্রেম দিয়ে তৈরি
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${activeFilter === filter.id
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              <span>{filter.emoji}</span>
              {filter.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square">
                  <img
                    src={imageErrors[image.id] ? image.fallback : image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={() => handleImageError(image.id)}
                    loading="lazy"
                  />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => toggleFavorite(e, image.id)}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${favorites.includes(image.id)
                        ? 'bg-pink-500 text-white'
                        : 'bg-white/90 text-gray-400 hover:text-pink-500'
                      }`}
                  >
                    <FaHeart />
                  </motion.button>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-pink-300 font-bold">৳{image.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors z-10 p-2 bg-black/50 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes size={24} />
              </motion.button>

              {/* Navigation */}
              <button
                className="absolute left-4 text-white hover:text-pink-400 transition-colors p-3 bg-black/50 rounded-full"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                className="absolute right-4 text-white hover:text-pink-400 transition-colors p-3 bg-black/50 rounded-full"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
              >
                <FaChevronRight size={24} />
              </button>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={imageErrors[selectedImage.id] ? selectedImage.fallback : selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
                  onError={() => handleImageError(selectedImage.id)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-white"
                >
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-pink-300 font-bold text-xl mb-4">৳{selectedImage.price}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWhatsAppOrder(selectedImage)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                  >
                    <FaWhatsapp size={20} />
                    WhatsApp-এ অর্ডার করুন
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
