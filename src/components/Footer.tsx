'use client';

import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaHeart } from 'react-icons/fa';

const footerLinks = {
  quickLinks: [
    { name: 'হোম', href: '#home' },
    { name: 'আমাদের সম্পর্কে', href: '#about' },
    { name: 'কেক সমূহ', href: '#cakes' },
    { name: 'গ্যালারি', href: '#gallery' },
    { name: 'যোগাযোগ', href: '#contact' },
  ],
  cakeTypes: [
    { name: 'জন্মদিনের কেক', href: '#' },
    { name: 'বিয়ের কেক', href: '#' },
    { name: 'চকলেট কেক', href: '#' },
    { name: 'কাপকেক', href: '#' },
    { name: 'কাস্টম ডিজাইন', href: '#' },
  ],
  policies: [
    { name: 'প্রাইভেসি পলিসি', href: '#' },
    { name: 'রিফান্ড পলিসি', href: '#' },
    { name: 'ডেলিভারি তথ্য', href: '#' },
    { name: 'শর্তাবলী', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-chocolate text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🎂</span>
              <h3 className="text-2xl font-display font-bold">Sweet Delights</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              বাংলাদেশের সেরা কেক শপ। প্রিমিয়াম মানের কেক ও মিষ্টান্ন। 
              প্রতিটি বিশেষ মুহূর্তকে আরও মধুর করুন।
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: FaYoutube, href: '#' },
                { icon: FaTiktok, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">দ্রুত লিংক</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cake Types */}
          <div>
            <h4 className="text-lg font-bold mb-6">কেকের ধরন</h4>
            <ul className="space-y-3">
              {footerLinks.cakeTypes.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">নিউজলেটার</h4>
            <p className="text-gray-300 mb-4">
              নতুন অফার ও আপডেট পেতে সাবস্ক্রাইব করুন
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all outline-none text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all"
              >
                সাবস্ক্রাইব করুন
              </motion.button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="text-gray-400 text-sm">পেমেন্ট মেথড:</span>
            <div className="flex gap-3 text-2xl">
              <span>🏦</span>
              <span>💳</span>
              <span>📱</span>
            </div>
            <span className="text-gray-400 text-sm">বিকাশ • নগদ • রকেট • ব্যাংক</span>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Sweet Delights BD. সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="mt-2 flex items-center justify-center gap-1">
              তৈরি করা হয়েছে <FaHeart className="text-pink-500" /> দিয়ে বাংলাদেশে
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
