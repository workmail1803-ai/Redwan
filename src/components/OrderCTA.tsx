'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGift, FaPercent, FaTruck } from 'react-icons/fa';

export default function OrderCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className="py-20 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1920&q=80')`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/95 to-pink-800/95" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-6"
          >
            🎂
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            বিশেষ অফার!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-pink-100 mb-8 max-w-2xl mx-auto"
          >
            প্রথম অর্ডারে <span className="font-bold text-white">২০% ছাড়</span> পান!
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            {[
              { icon: FaPercent, text: '২০% ছাড়' },
              { icon: FaTruck, text: 'ফ্রি ডেলিভারি' },
              { icon: FaGift, text: 'বোনাস কুপন' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <item.icon className="text-white" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              এখনই অর্ডার করুন
            </motion.button>
            <motion.a
              href="tel:+8801700000000"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-pink-600 transition-all"
            >
              কল করুন: ০১৭০০-০০০০০০
            </motion.a>
          </motion.div>

          {/* Promo Code */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-8 inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-3"
          >
            <span className="text-pink-100">প্রোমো কোড: </span>
            <span className="font-mono font-bold text-white bg-white/20 px-3 py-1 rounded">
              SWEET20
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
