'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/store/AppContext';
import {
  bunOptions, pattyOptions, cheeseOptions, toppingOptions,
  premiumAddons, sauceOptions, seasoningOptions, mealOptions
} from '@/data/menu';
import { BurgerConfig } from '@/types';

// Burger layer colors for the visual preview
const bunColors: Record<string, string> = {
  classic: '#D4A574', sesame: '#C4915B', brioche: '#E8B86D',
  'whole-wheat': '#A0845B', 'cheese-burst': '#E8B86D', 'gluten-free': '#C9B896',
};
const pattyColors: Record<string, string> = {
  chicken: '#B8860B', beef: '#6B3A2A', veggie: '#6B8E23', fish: '#D4A574', 'plant-based': '#8B7355',
};
const cheeseLayerColors: Record<string, string> = {
  american: '#FFA500', cheddar: '#FF8C00', mozzarella: '#FFFDD0', swiss: '#FFEAA7',
};

interface BurgerPreviewProps {
  config: BurgerConfig;
}

export default function BurgerPreview({ config }: BurgerPreviewProps) {
  const layers = buildLayers(config);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative flex flex-col items-center gap-0">
        {layers.map((layer, i) => (
          <motion.div
            key={`${layer.type}-${layer.id}-${i}`}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: i * 0.08,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className="relative"
            style={{ zIndex: layers.length - i }}
          >
            {layer.type === 'top-bun' && (
              <div className="relative">
                <div
                  className="w-36 sm:w-44 h-14 sm:h-16 rounded-t-full"
                  style={{
                    background: `linear-gradient(180deg, ${bunColors[config.bun] || '#D4A574'} 0%, ${adjustColor(bunColors[config.bun] || '#D4A574', -20)} 100%)`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                />
                {/* Sesame seeds */}
                {config.bun === 'sesame' && (
                  <div className="absolute top-2 left-0 right-0 flex justify-center gap-2 flex-wrap px-6">
                    {[...Array(8)].map((_, j) => (
                      <div
                        key={j}
                        className="w-1.5 h-2.5 rounded-full bg-yellow-100/60"
                        style={{ transform: `rotate(${j * 30}deg)`, margin: '0 2px' }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {layer.type === 'patty' && (
              <div
                className="w-40 sm:w-48 h-5 sm:h-6 rounded-sm -my-0.5"
                style={{
                  background: `linear-gradient(180deg, ${pattyColors[config.patty] || '#6B3A2A'} 0%, ${adjustColor(pattyColors[config.patty] || '#6B3A2A', -15)} 100%)`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              />
            )}

            {layer.type === 'cheese' && (
              <div className="relative w-42 sm:w-50 -my-0.5">
                <div
                  className="w-full h-3 sm:h-4"
                  style={{
                    background: cheeseLayerColors[config.cheese] || '#FFA500',
                    borderRadius: '2px',
                    boxShadow: `0 2px 6px ${cheeseLayerColors[config.cheese] || '#FFA500'}40`,
                  }}
                />
                {/* Melted cheese drip */}
                {config.meltLevel === 'extra' && (
                  <div className="absolute -bottom-2 left-2 right-2 flex justify-between">
                    {[...Array(3)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ height: 0 }}
                        animate={{ height: 8 + j * 3 }}
                        transition={{ delay: 0.5 + j * 0.1, duration: 0.5 }}
                        className="w-2 rounded-b-full"
                        style={{ background: cheeseLayerColors[config.cheese] || '#FFA500' }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {layer.type === 'topping' && (
              <div className="w-38 sm:w-46 -my-0.5">
                <ToppingLayer id={layer.id} />
              </div>
            )}

            {layer.type === 'sauce' && (
              <div className="w-36 sm:w-44 -my-0.5">
                <div
                  className="h-2 sm:h-2.5 rounded-sm"
                  style={{
                    background: sauceOptions.find(s => s.id === layer.id)?.color || '#DC143C',
                    opacity: 0.8,
                  }}
                />
              </div>
            )}

            {layer.type === 'addon' && (
              <div className="w-38 sm:w-46 -my-0.5">
                <AddonLayer id={layer.id} />
              </div>
            )}

            {layer.type === 'bottom-bun' && (
              <div
                className="w-38 sm:w-46 h-8 sm:h-10 rounded-b-lg mt-0.5"
                style={{
                  background: `linear-gradient(180deg, ${bunColors[config.bun] || '#D4A574'} 0%, ${adjustColor(bunColors[config.bun] || '#D4A574', -30)} 100%)`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Shadow */}
      <div className="w-32 h-3 bg-black/20 rounded-full blur-md mt-2" />
    </div>
  );
}

function ToppingLayer({ id }: { id: string }) {
  const colors: Record<string, string> = {
    lettuce: '#4CAF50', tomato: '#E53935', onion: '#CE93D8',
    pickles: '#81C784', jalapenos: '#388E3C', 'caramelized-onion': '#A1887F',
    mushrooms: '#8D6E63', coleslaw: '#C5E1A5',
  };
  return (
    <div
      className="h-2.5 sm:h-3 rounded-sm"
      style={{ background: colors[id] || '#4CAF50', opacity: 0.9 }}
    />
  );
}

function AddonLayer({ id }: { id: string }) {
  const colors: Record<string, string> = {
    bacon: '#B71C1C', egg: '#FFF176', avocado: '#558B2F',
    'extra-patty': '#5D4037', 'onion-rings': '#D4A574',
  };
  return (
    <div
      className="h-3 sm:h-4 rounded-sm"
      style={{ background: colors[id] || '#D4A574', opacity: 0.9 }}
    />
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

interface LayerInfo {
  type: 'top-bun' | 'patty' | 'cheese' | 'topping' | 'sauce' | 'addon' | 'bottom-bun';
  id: string;
}

function buildLayers(config: BurgerConfig): LayerInfo[] {
  const layers: LayerInfo[] = [];

  // Top bun
  layers.push({ type: 'top-bun', id: config.bun });

  // Sauces (top)
  config.sauces.forEach(s => {
    layers.push({ type: 'sauce', id: s.id });
  });

  // Toppings
  config.toppings.forEach(t => {
    layers.push({ type: 'topping', id: t });
  });

  // Cheese
  if (config.cheese) {
    layers.push({ type: 'cheese', id: config.cheese });
    if (config.cheeseCount === 'double') {
      layers.push({ type: 'cheese', id: config.cheese });
    }
  }

  // Premium addons
  config.premiumAddons.forEach(a => {
    layers.push({ type: 'addon', id: a });
  });

  // Patty
  const pattyCountNum = config.pattyCount === 'triple' ? 3 : config.pattyCount === 'double' ? 2 : 1;
  for (let i = 0; i < pattyCountNum; i++) {
    layers.push({ type: 'patty', id: config.patty });
    // Add cheese between patties for doubles/triples
    if (i < pattyCountNum - 1 && config.cheeseCount === 'double') {
      layers.push({ type: 'cheese', id: config.cheese });
    }
  }

  // Bottom bun
  layers.push({ type: 'bottom-bun', id: config.bun });

  return layers;
}
