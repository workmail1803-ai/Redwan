'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cakeType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('আপনার বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করবো।');
  };

  return (
    <section
      id="contact"
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
          <h2 className="section-title">যোগাযোগ করুন</h2>
          <p className="section-subtitle">
            আপনার স্বপ্নের কেক অর্ডার করতে বা কোনো প্রশ্ন থাকলে যোগাযোগ করুন
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-8">আমাদের তথ্য</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">ঠিকানা</h4>
                    <p className="text-pink-100">
                      বাড়ি ১২৩, রোড ৫, ধানমন্ডি<br />
                      ঢাকা-১২০৫, বাংলাদেশ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">ফোন</h4>
                    <p className="text-pink-100">
                      ০১৭০০-০০০০০০<br />
                      ০১৮০০-০০০০০০
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">ইমেইল</h4>
                    <p className="text-pink-100">
                      info@sweetdelightsbd.com<br />
                      order@sweetdelightsbd.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">সময়সূচি</h4>
                    <p className="text-pink-100">
                      সকাল ৯টা - রাত ১০টা<br />
                      সপ্তাহে ৭ দিন খোলা
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h4 className="font-semibold mb-4">সোশ্যাল মিডিয়া</h4>
                <div className="flex gap-4">
                  {[
                    { icon: FaFacebook, link: '#' },
                    { icon: FaInstagram, link: '#' },
                    { icon: FaWhatsapp, link: '#' },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-pink-600 transition-all"
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-chocolate mb-6">অর্ডার করুন</h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                    placeholder="আপনার নাম লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">ফোন নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                    placeholder="০১৭XX-XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">ইমেইল</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">কেকের ধরন *</label>
                  <select
                    required
                    value={formData.cakeType}
                    onChange={(e) => setFormData({ ...formData, cakeType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                  >
                    <option value="">কেক নির্বাচন করুন</option>
                    <option value="birthday">জন্মদিনের কেক</option>
                    <option value="wedding">বিয়ের কেক</option>
                    <option value="anniversary">বিবাহ বার্ষিকীর কেক</option>
                    <option value="custom">কাস্টম ডিজাইন</option>
                    <option value="cupcake">কাপকেক</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">বার্তা</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none resize-none"
                    placeholder="আপনার প্রয়োজন সম্পর্কে বিস্তারিত লিখুন..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary text-lg py-4"
                >
                  বার্তা পাঠান 🎂
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
