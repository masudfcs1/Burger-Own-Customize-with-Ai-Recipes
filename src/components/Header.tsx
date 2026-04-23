'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/store/AppContext';

export default function Header() {
  const { state, dispatch } = useApp();
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl sm:text-3xl">🍔</span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-[var(--font-display)] text-gradient">
                BURGER CRAFT
              </h1>
              <p className="text-[10px] sm:text-xs text-white/40 tracking-widest uppercase">
                Build Your Perfect Bite
              </p>
            </div>
          </motion.div>

          {/* Nav Links (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {['Menu', 'Builder', 'Popular', 'About'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-orange to-accent-amber group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Cart Button */}
          <motion.button
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            className="relative flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-light hover:bg-white/10 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            id="cart-button"
          >
            <span className="text-lg sm:text-xl">🛒</span>
            {totalItems > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {totalItems}
                </span>
                <span className="hidden sm:inline text-xs text-white/40">|</span>
                <span className="hidden sm:inline text-sm font-bold text-gradient">
                  ${totalPrice.toFixed(2)}
                </span>
              </motion.div>
            )}
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-accent-orange to-accent-red rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
