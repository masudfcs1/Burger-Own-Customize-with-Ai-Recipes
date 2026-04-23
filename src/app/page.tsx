'use client';

import { AppProvider } from '@/store/AppContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import BurgerBuilder from '@/components/BurgerBuilder';
import CartPanel from '@/components/CartPanel';

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-mesh">
        <Header />
        <main>
          <Hero />
          <MenuSection />
          {/* Footer */}
          <footer className="border-t border-white/5 py-10 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍔</span>
                  <span className="font-bold font-[var(--font-display)] text-gradient">BURGER CRAFT</span>
                </div>
                <p className="text-xs text-white/30">
                  © 2026 Burger Craft. All rights reserved. Made with 🔥 and 🧀
                </p>
              </div>
            </div>
          </footer>
        </main>

        {/* Modals / Overlays */}
        <BurgerBuilder />
        <CartPanel />
      </div>
    </AppProvider>
  );
}
