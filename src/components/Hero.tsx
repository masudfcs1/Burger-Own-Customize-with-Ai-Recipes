"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-amber/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs sm:text-sm text-white/70 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              Now serving • Fresh ingredients daily
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-[var(--font-display)] leading-tight mb-6"
          >
            Craft Your
            <br />
            <span className="text-gradient-fire">Dream Burger</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-8"
          >
            Choose from our handcrafted menu or build your own masterpiece from
            scratch. Every layer, every flavor — your way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#menu"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-accent-orange to-accent-amber text-white font-semibold text-sm sm:text-base glow-orange hover:shadow-lg hover:shadow-accent-orange/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🍔 Explore Menu
            </motion.a>
            <motion.a
              href="#builder"
              className="px-8 py-3.5 rounded-full glass-light text-white/80 font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Build Your Own
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center justify-center gap-8 sm:gap-16 mt-12 sm:mt-16"
          >
            {[
              { value: "50+", label: "Ingredients" },
              { value: "1M+", label: "Burgers Sold" },
              { value: "4.9", label: "Rating ⭐" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-gradient">
                  {stat.value}
                </p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
