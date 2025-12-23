'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'ফারহানা আক্তার',
    location: 'ঢাকা',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    text: 'আমার মেয়ের জন্মদিনে এদের কেক অর্ডার করেছিলাম। অসাধারণ স্বাদ এবং সুন্দর ডেকোরেশন। সবাই খুব প্রশংসা করেছে।',
  },
  {
    id: 2,
    name: 'রাকিবুল হাসান',
    location: 'চট্টগ্রাম',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    text: 'আমার বিয়ের অনুষ্ঠানে ৩টি কেক নিয়েছিলাম। সময়মত ডেলিভারি এবং অসাধারণ টেস্ট। হাইলি রেকমেন্ডেড!',
  },
  {
    id: 3,
    name: 'তাসনিম জাহান',
    location: 'সিলেট',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    text: 'এত সুন্দর ও সুস্বাদু কেক আগে কখনো খাইনি। চকলেট ড্রিম কেকটা সত্যিই অসাধারণ। আবার অর্ডার করবো।',
  },
  {
    id: 4,
    name: 'আব্দুল করিম',
    location: 'রাজশাহী',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
    text: 'অফিসের পার্টিতে এদের কাপকেক অর্ডার করেছিলাম। প্রেজেন্টেশন এবং টেস্ট দুটোই ছিল ফার্স্ট ক্লাস।',
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-cream to-pink-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">গ্রাহকদের মতামত</h2>
          <p className="section-subtitle">
            আমাদের সন্তুষ্ট গ্রাহকদের অভিজ্ঞতা
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-pink-100" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-pink-200"
                />
                <div>
                  <h4 className="font-bold text-chocolate">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text">4.9/5</div>
            <p className="text-gray-600 text-sm">গড় রেটিং</p>
          </div>
          <div className="w-px h-12 bg-gray-300 hidden md:block" />
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text">500+</div>
            <p className="text-gray-600 text-sm">৫ স্টার রিভিউ</p>
          </div>
          <div className="w-px h-12 bg-gray-300 hidden md:block" />
          <div className="text-center">
            <div className="text-4xl font-bold gradient-text">99%</div>
            <p className="text-gray-600 text-sm">সন্তুষ্ট গ্রাহক</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
