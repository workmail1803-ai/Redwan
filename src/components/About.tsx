'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaAward, FaTruck, FaClock } from 'react-icons/fa';

const features = [
  {
    icon: FaHeart,
    title: 'ভালোবাসা দিয়ে তৈরি',
    description: 'প্রতিটি কেক ভালোবাসা ও যত্ন দিয়ে হাতে তৈরি করা হয়',
  },
  {
    icon: FaAward,
    title: 'প্রিমিয়াম মান',
    description: 'সেরা মানের উপাদান ব্যবহার করে তৈরি',
  },
  {
    icon: FaTruck,
    title: 'দ্রুত ডেলিভারি',
    description: 'ঢাকা ও সারা বাংলাদেশে হোম ডেলিভারি',
  },
  {
    icon: FaClock,
    title: 'সময়মত সেবা',
    description: 'আপনার বিশেষ দিনে সময়মত পৌঁছে দেই',
  },
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.95))',
      }}
    >
      {/* Background Decorations */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">আমাদের সম্পর্কে</h2>
          <p className="text-gray-400 text-lg">
            ২০১৫ সাল থেকে বাংলাদেশের মানুষের বিশেষ মুহূর্তগুলোতে মিষ্টি স্মৃতি তৈরি করে আসছি
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80"
                alt="Our Baker"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
            >
              <span className="text-4xl">👨‍🍳</span>
              <div>
                <div className="font-bold text-pink-600">১০+ বছর</div>
                <div className="text-sm text-gray-600">অভিজ্ঞতা</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              স্বাদে অনন্য, ভালোবাসায় অসীম
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sweet Delights BD শুরু হয়েছিল একটি ছোট্ট স্বপ্ন থেকে - বাংলাদেশের মানুষের কাছে
              আন্তর্জাতিক মানের সুস্বাদু কেক পৌঁছে দেওয়া। আজ আমরা গর্বিত যে হাজারো পরিবারের
              বিশেষ মুহূর্তের অংশ হতে পেরেছি।
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              আমাদের প্রতিটি কেক তাজা উপাদান দিয়ে প্রতিদিন তৈরি করা হয়। কোনো প্রিজারভেটিভ নেই,
              শুধু আছে বিশুদ্ধ স্বাদ ও ভালোবাসা।
            </p>
            <motion.a
              href="#cakes"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-block"
            >
              আমাদের কেক দেখুন
            </motion.a>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group border border-gray-700"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <feature.icon size={24} />
              </div>
              <h4 className="font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
