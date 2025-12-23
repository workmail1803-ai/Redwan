'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const categories = [
  {
    id: 1,
    name: 'জন্মদিনের কেক',
    nameEn: 'Birthday Cakes',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&q=80',
    count: 25,
    emoji: '🎂',
  },
  {
    id: 2,
    name: 'বিয়ের কেক',
    nameEn: 'Wedding Cakes',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=80',
    count: 15,
    emoji: '💒',
  },
  {
    id: 3,
    name: 'কাপকেক',
    nameEn: 'Cupcakes',
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80',
    count: 30,
    emoji: '🧁',
  },
  {
    id: 4,
    name: 'চকলেট কেক',
    nameEn: 'Chocolate Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    count: 20,
    emoji: '🍫',
  },
  {
    id: 5,
    name: 'ফ্রুট কেক',
    nameEn: 'Fruit Cakes',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
    count: 18,
    emoji: '🍓',
  },
  {
    id: 6,
    name: 'কাস্টম কেক',
    nameEn: 'Custom Cakes',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80',
    count: 50,
    emoji: '🎨',
  },
];

export default function Categories() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-pink-50 to-cream"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">কেকের ধরন</h2>
          <p className="section-subtitle">
            সব ধরনের অনুষ্ঠানের জন্য বিভিন্ন ক্যাটাগরির কেক
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer"
            >
              <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
                  <motion.span
                    className="text-4xl mb-2"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {category.emoji}
                  </motion.span>
                  <h3 className="text-lg md:text-xl font-bold text-center">
                    {category.name}
                  </h3>
                  <p className="text-pink-200 text-sm mt-1">
                    {category.count}+ ডিজাইন
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
