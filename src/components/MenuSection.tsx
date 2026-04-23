'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import MenuCard from './MenuCard';
import AIRecipeGenerator from './AIRecipeGenerator';
import { menuItems } from '@/data/menu';
import { useApp } from '@/store/AppContext';

export default function MenuSection() {
  const { dispatch } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Featured items for carousel
  const featured = menuItems.filter(i => i.badge === 'popular' || i.badge === 'new');

  return (
    <section id="menu" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full glass-light text-xs text-accent-orange mb-4">
            OUR MENU
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-[var(--font-display)] mb-4">
            Handcrafted <span className="text-gradient">Burgers</span>
          </h2>
          <p className="text-sm sm:text-base text-white/40 max-w-lg mx-auto">
            Each burger is a masterpiece of flavors — choose from our curated selection
            or build your own from scratch.
          </p>
        </motion.div>

        {/* Featured Carousel (horizontal scroll on mobile) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white/80 flex items-center gap-2">
              <span className="text-xl">⭐</span> Featured
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
                className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                ←
              </button>
              <button
                onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
                className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                →
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featured.map((item, i) => (
              <div key={item.id} className="min-w-[300px] sm:min-w-[340px] snap-start">
                <MenuCard item={item} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* "Build Your Own" CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div
            id="builder"
            className="relative rounded-2xl overflow-hidden p-6 sm:p-8 glass border border-accent-orange/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/5 to-accent-amber/5" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-display)] mb-2">
                  🎨 Build Your Own Burger
                </h3>
                <p className="text-sm text-white/50">
                  50+ ingredients. Unlimited combos. Your masterpiece awaits.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch({ type: 'OPEN_BUILDER' })}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-orange to-accent-amber text-white font-semibold text-sm glow-orange hover:shadow-lg hover:shadow-accent-orange/30 transition-all"
                >
                  Start Building →
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Random burger generator
                    const randomConfig = generateRandomBurger();
                    dispatch({
                      type: 'OPEN_BUILDER',
                      payload: { config: randomConfig },
                    });
                  }}
                  className="px-4 py-3 rounded-full glass-light text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition-all"
                >
                  🎲 Random
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Recipe Generator */}
        <AIRecipeGenerator />

        {/* Full Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function generateRandomBurger() {
  const { BurgerConfig } = require('@/types') as any;
  const buns = ['classic', 'sesame', 'brioche', 'whole-wheat', 'cheese-burst'];
  const patties = ['chicken', 'beef', 'veggie', 'fish', 'plant-based'];
  const cheeses = ['american', 'cheddar', 'mozzarella', 'swiss'];
  const allToppings = ['lettuce', 'tomato', 'onion', 'pickles', 'jalapenos', 'caramelized-onion', 'mushrooms', 'coleslaw'];
  const allAddons = ['bacon', 'egg', 'avocado', 'onion-rings'];
  const allSauces = ['mayo', 'bbq', 'ketchup', 'mustard', 'spicy', 'garlic'];

  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const pickMultiple = <T,>(arr: T[], min: number, max: number): T[] => {
    const count = min + Math.floor(Math.random() * (max - min + 1));
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  return {
    bun: pick(buns),
    toastLevel: pick(['light', 'medium', 'crispy'] as const),
    patty: pick(patties),
    pattyCount: pick(['single', 'double'] as const),
    pattyStyle: pick(['grilled', 'smash'] as const),
    cheese: pick(cheeses),
    cheeseCount: pick(['single', 'double'] as const),
    meltLevel: pick(['light', 'extra'] as const),
    toppings: pickMultiple(allToppings, 2, 5),
    premiumAddons: pickMultiple(allAddons, 0, 2),
    sauces: pickMultiple(allSauces, 1, 3).map(s => ({ id: s, amount: pick(['light', 'regular', 'extra'] as const) })),
    spicyLevel: Math.floor(Math.random() * 6),
    seasonings: pickMultiple(['black-pepper', 'peri-peri', 'herbs'], 0, 2),
    mealOption: pick(['burger-only', 'with-fries', 'with-drink', 'full-meal']),
  };
}
