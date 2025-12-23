'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', title: 'চকলেট কেক' },
  { id: 2, src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80', title: 'স্ট্রবেরি কেক' },
  { id: 3, src: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80', title: 'ওয়েডিং কেক' },
  { id: 4, src: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80', title: 'বার্থডে কেক' },
  { id: 5, src: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80', title: 'রেড ভেলভেট' },
  { id: 6, src: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80', title: 'ব্ল্যাক ফরেস্ট' },
];

export default function ParallaxGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Different parallax speeds for each column
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const columns = [
    { images: galleryImages.slice(0, 2), y: y1 },
    { images: galleryImages.slice(2, 4), y: y2 },
    { images: galleryImages.slice(4, 6), y: y3 },
  ];

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 bg-gradient-to-b from-pink-50 to-cream overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">আমাদের সৃষ্টি</h2>
          <p className="section-subtitle">
            প্রতিটি কেক একটি শিল্পকর্ম
          </p>
        </motion.div>

        {/* Parallax Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {columns.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              style={{ y: column.y }}
              className="space-y-4 md:space-y-6"
            >
              {column.images.map((image, imgIndex) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: imgIndex * 0.1 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="aspect-[3/4]">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-pink-600/90 via-pink-600/50 to-transparent flex items-end justify-center pb-6"
                  >
                    <div className="text-center text-white">
                      <h3 className="text-lg font-bold mb-2">{image.title}</h3>
                      <button className="px-4 py-2 bg-white text-pink-600 rounded-full text-sm font-medium hover:bg-pink-50 transition-colors">
                        বিস্তারিত দেখুন
                      </button>
                    </div>
                  </motion.div>

                  {/* Corner Decoration */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
