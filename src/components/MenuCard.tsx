'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MenuItem } from '@/types';
import { useApp } from '@/store/AppContext';

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
  const { dispatch } = useApp();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        name: item.name,
        image: item.image,
        config: item.defaultConfig,
        menuItemId: item.id,
      },
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleCustomize = () => {
    dispatch({
      type: 'OPEN_BUILDER',
      payload: { config: item.defaultConfig, menuItemId: item.id },
    });
  };

  const badgeColors: Record<string, string> = {
    popular: 'badge-popular',
    new: 'badge-new',
    value: 'badge-value',
  };
  const badgeText: Record<string, string> = {
    popular: 'Popular 🔥',
    new: 'New ✨',
    value: 'Best Value 💰',
  };

  const spicyIcons = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < item.spicyLevel ? 'opacity-100' : 'opacity-20'}>
      🌶️
    </span>
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-card-bg border border-card-border card-hover shine-effect">
        {/* Image */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent" />

          {/* Badge */}
          {item.badge && (
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${badgeColors[item.badge]} shadow-lg`}
            >
              {badgeText[item.badge]}
            </motion.span>
          )}

          {/* Quick add floating button */}
          <AnimatePresence>
            {isHovered && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickAdd}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gradient-to-r from-accent-orange to-accent-amber flex items-center justify-center text-white text-xl shadow-lg glow-orange"
              >
                +
              </motion.button>
            )}
          </AnimatePresence>

          {/* Veg/Non-veg indicator */}
          <div className="absolute bottom-3 right-3">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${item.isVeg ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              {item.isVeg ? '🌿 VEG' : '🥩 NON-VEG'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Name & Tagline */}
          <h3 className="text-lg font-bold font-[var(--font-display)] text-white mb-1">
            {item.name}
          </h3>
          <p className="text-xs sm:text-sm text-white/40 mb-3 line-clamp-1">{item.tagline}</p>

          {/* Quick Info Row */}
          <div className="flex items-center gap-3 mb-4 text-xs text-white/50">
            <span className="flex items-center gap-1">
              <span className="text-white/30">🔥</span>
              {item.calories} cal
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-0.5 text-[10px]">
              {item.spicyLevel > 0 ? spicyIcons.slice(0, item.spicyLevel) : <span className="text-white/30">No spice</span>}
            </span>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-gradient">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCustomize}
                className="px-3 py-1.5 rounded-lg glass-light text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                Customize
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickAdd}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-accent-orange to-accent-amber text-xs font-semibold text-white shadow-md hover:shadow-lg hover:shadow-accent-orange/20 transition-all"
              >
                {isAdded ? '✓ Added!' : 'Quick Add'}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Add confirmation overlay */}
        <AnimatePresence>
          {isAdded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-accent-green/10 backdrop-blur-sm flex items-center justify-center rounded-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <motion.span
                  className="text-5xl"
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  🍔
                </motion.span>
                <span className="text-sm font-semibold text-accent-green">Added to Cart!</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
