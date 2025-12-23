'use client';

import { motion } from 'framer-motion';

const statements = [
  { text: 'স্বাদে অনন্য', subtext: 'Unique in Taste', icon: '🧁' },
  { text: 'প্রেমে অসীম', subtext: 'Infinite in Love', icon: '❤️' },
  { text: 'মানে সেরা', subtext: 'Best in Quality', icon: '⭐' },
  { text: 'সেবায় নিবেদিত', subtext: 'Dedicated to Service', icon: '🤝' },
];

export default function MorphingTextSection() {
  return (
    <section className="py-24 px-4 bg-gray-900 relative overflow-hidden">
      {/* Static Background Gradients - Performant CSS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {statements.map((item, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                  {item.icon}
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                  {item.text}
                </h2>
                <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">
                  {item.subtext}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom decorative message */}
        <div className="text-center mt-20">
          <p className="text-pink-200/60 text-lg font-light tracking-widest uppercase">
            EST. 2015
          </p>
        </div>
      </div>
    </section>
  );
}
