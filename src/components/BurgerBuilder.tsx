'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, calculatePrice } from '@/store/AppContext';
import BurgerPreview from './BurgerPreview';
import { BuilderStep, SauceAmount } from '@/types';
import {
  bunOptions, pattyOptions, cheeseOptions, toppingOptions,
  premiumAddons, sauceOptions, seasoningOptions, mealOptions
} from '@/data/menu';

const steps: { id: BuilderStep; label: string; emoji: string }[] = [
  { id: 'bun', label: 'Bun', emoji: '🥯' },
  { id: 'patty', label: 'Patty', emoji: '🥩' },
  { id: 'cheese', label: 'Cheese', emoji: '🧀' },
  { id: 'toppings', label: 'Toppings', emoji: '🥬' },
  { id: 'addons', label: 'Add-ons', emoji: '🥓' },
  { id: 'sauces', label: 'Sauces', emoji: '🧄' },
  { id: 'flavor', label: 'Flavor', emoji: '🌶️' },
  { id: 'meal', label: 'Meal', emoji: '📦' },
];

export default function BurgerBuilder() {
  const { state, dispatch } = useApp();
  const { isBuilderOpen, builderStep, currentConfig, editingItemId } = state;
  const [addedToCart, setAddedToCart] = useState(false);

  if (!isBuilderOpen) return null;

  const currentStepIndex = steps.findIndex(s => s.id === builderStep);
  const price = calculatePrice(currentConfig);

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) {
      dispatch({ type: 'SET_BUILDER_STEP', payload: steps[currentStepIndex + 1].id });
    }
  };
  const goPrev = () => {
    if (currentStepIndex > 0) {
      dispatch({ type: 'SET_BUILDER_STEP', payload: steps[currentStepIndex - 1].id });
    }
  };

  const handleAddToCart = () => {
    if (editingItemId) {
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { id: editingItemId, config: currentConfig } });
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { name: 'Custom Burger', image: '/classic-burger.png', config: currentConfig },
      });
    }
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      dispatch({ type: 'CLOSE_BUILDER' });
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
        onClick={() => dispatch({ type: 'CLOSE_BUILDER' })}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-5xl max-h-[92vh] rounded-2xl glass border border-white/10 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5">
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-[var(--font-display)]">
                {editingItemId ? '✏️ Edit Burger' : '🍔 Build Your Burger'}
              </h2>
              <p className="text-xs text-white/40">Step {currentStepIndex + 1} of {steps.length}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg sm:text-2xl font-bold text-gradient">${price.toFixed(2)}</span>
              <button onClick={() => dispatch({ type: 'CLOSE_BUILDER' })} className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-white/50 hover:text-white transition-colors">✕</button>
            </div>
          </div>

          {/* Step Tabs */}
          <div className="flex overflow-x-auto px-2 sm:px-4 py-2 border-b border-white/5 gap-1" style={{ scrollbarWidth: 'none' }}>
            {steps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => dispatch({ type: 'SET_BUILDER_STEP', payload: step.id })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  builderStep === step.id
                    ? 'bg-gradient-to-r from-accent-orange to-accent-amber text-white shadow-md'
                    : i <= currentStepIndex
                    ? 'glass-light text-white/70'
                    : 'text-white/30 hover:text-white/50'
                }`}
              >
                <span>{step.emoji}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
            {/* Left: Options Panel */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={builderStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {builderStep === 'bun' && <BunStep />}
                  {builderStep === 'patty' && <PattyStep />}
                  {builderStep === 'cheese' && <CheeseStep />}
                  {builderStep === 'toppings' && <ToppingsStep />}
                  {builderStep === 'addons' && <AddonsStep />}
                  {builderStep === 'sauces' && <SaucesStep />}
                  {builderStep === 'flavor' && <FlavorStep />}
                  {builderStep === 'meal' && <MealStep />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Burger Preview */}
            <div className="w-full lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-white/5 flex items-center justify-center p-4 bg-black/20">
              <div className="sticky top-4">
                <p className="text-center text-xs text-white/30 mb-2">Live Preview</p>
                <BurgerPreview config={currentConfig} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-white/5">
            <button onClick={goPrev} disabled={currentStepIndex === 0} className="px-4 py-2 rounded-lg glass-light text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              ← Back
            </button>
            <div className="flex gap-2">
              {currentStepIndex < steps.length - 1 ? (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={goNext} className="px-6 py-2 rounded-lg bg-gradient-to-r from-accent-orange to-accent-amber text-sm font-semibold text-white shadow-md">
                  Next →
                </motion.button>
              ) : (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAddToCart} className="px-6 py-2 rounded-lg bg-gradient-to-r from-accent-green to-emerald-500 text-sm font-semibold text-white shadow-md glow-orange">
                  {addedToCart ? '✓ Added!' : editingItemId ? '💾 Save Changes' : '🛒 Add to Cart — $' + price.toFixed(2)}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ──── STEP COMPONENTS ──── */

function OptionChip({ selected, onClick, emoji, label, price, glow }: { selected: boolean; onClick: () => void; emoji: string; label: string; price?: number; glow?: boolean }) {
  return (
    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        selected ? 'bg-gradient-to-r from-accent-orange/20 to-accent-amber/20 border border-accent-orange/40 text-white' + (glow ? ' glow-amber' : '')
          : 'glass-light text-white/60 hover:text-white hover:bg-white/10 border border-transparent'
      }`}>
      <span className="text-lg">{emoji}</span>
      <span>{label}</span>
      {price !== undefined && price > 0 && <span className="text-xs text-accent-amber ml-auto">+${price.toFixed(2)}</span>}
    </motion.button>
  );
}

function ToggleRow({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-3">
      <p className="text-xs text-white/40 mb-2">{label}</p>
      <div className="flex gap-2">
        {options.map(o => (
          <button key={o.value} onClick={() => onChange(o.value)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${value === o.value ? 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30' : 'glass-light text-white/40 hover:text-white/70'}`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function BunStep() {
  const { state, dispatch } = useApp();
  const c = state.currentConfig;
  return (
    <div>
      <h3 className="text-lg font-bold mb-1">Choose Your Bun</h3>
      <p className="text-xs text-white/40 mb-4">The foundation of every great burger</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {bunOptions.map(b => <OptionChip key={b.id} selected={c.bun === b.id} onClick={() => dispatch({ type: 'UPDATE_CONFIG', payload: { bun: b.id } })} emoji={b.emoji} label={b.name} price={b.price} />)}
      </div>
      <ToggleRow label="Toast Level" options={[{ value: 'light', label: '☀️ Light' }, { value: 'medium', label: '🔥 Medium' }, { value: 'crispy', label: '💥 Crispy' }]} value={c.toastLevel} onChange={v => dispatch({ type: 'UPDATE_CONFIG', payload: { toastLevel: v as any } })} />
    </div>
  );
}

function PattyStep() {
  const { state, dispatch } = useApp();
  const c = state.currentConfig;
  return (
    <div>
      <h3 className="text-lg font-bold mb-1">Pick Your Patty</h3>
      <p className="text-xs text-white/40 mb-4">The heart of your burger</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {pattyOptions.map(p => <OptionChip key={p.id} selected={c.patty === p.id} onClick={() => dispatch({ type: 'UPDATE_CONFIG', payload: { patty: p.id } })} emoji={p.emoji} label={p.name} price={p.price} />)}
      </div>
      <ToggleRow label="How Many?" options={[{ value: 'single', label: 'Single' }, { value: 'double', label: 'Double' }, { value: 'triple', label: 'Triple' }]} value={c.pattyCount} onChange={v => dispatch({ type: 'UPDATE_CONFIG', payload: { pattyCount: v as any } })} />
      <ToggleRow label="Cook Style" options={[{ value: 'grilled', label: '🔥 Grilled' }, { value: 'smash', label: '💥 Smash' }]} value={c.pattyStyle} onChange={v => dispatch({ type: 'UPDATE_CONFIG', payload: { pattyStyle: v as any } })} />
    </div>
  );
}

function CheeseStep() {
  const { state, dispatch } = useApp();
  const c = state.currentConfig;
  return (
    <div>
      <h3 className="text-lg font-bold mb-1">Cheese Layer</h3>
      <p className="text-xs text-white/40 mb-4">Melty goodness on every bite</p>
      <div className="grid grid-cols-2 gap-3">
        {cheeseOptions.map(ch => <OptionChip key={ch.id} selected={c.cheese === ch.id} onClick={() => dispatch({ type: 'UPDATE_CONFIG', payload: { cheese: ch.id } })} emoji={ch.emoji} label={ch.name} price={ch.price} />)}
      </div>
      <ToggleRow label="Cheese Count" options={[{ value: 'single', label: 'Single' }, { value: 'double', label: 'Double 🧀🧀' }]} value={c.cheeseCount} onChange={v => dispatch({ type: 'UPDATE_CONFIG', payload: { cheeseCount: v as any } })} />
      <ToggleRow label="Melt Level" options={[{ value: 'light', label: 'Light Melt' }, { value: 'extra', label: 'Extra Melt 🔥' }]} value={c.meltLevel} onChange={v => dispatch({ type: 'UPDATE_CONFIG', payload: { meltLevel: v as any } })} />
    </div>
  );
}

function ToppingsStep() {
  const { state, dispatch } = useApp();
  const c = state.currentConfig;
  const toggle = (id: string) => {
    const toppings = c.toppings.includes(id) ? c.toppings.filter(t => t !== id) : [...c.toppings, id];
    dispatch({ type: 'UPDATE_CONFIG', payload: { toppings } });
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-1">Fresh Toppings</h3>
      <p className="text-xs text-white/40 mb-4">Select multiple — stack &apos;em high!</p>
      <div className="grid grid-cols-2 gap-3">
        {toppingOptions.map(t => <OptionChip key={t.id} selected={c.toppings.includes(t.id)} onClick={() => toggle(t.id)} emoji={t.emoji} label={t.name} price={t.price} />)}
      </div>
    </div>
  );
}

function AddonsStep() {
  const { state, dispatch } = useApp();
  const c = state.currentConfig;
  const toggle = (id: string) => {
    const addons = c.premiumAddons.includes(id) ? c.premiumAddons.filter(a => a !== id) : [...c.premiumAddons, id];
    dispatch({ type: 'UPDATE_CONFIG', payload: { premiumAddons: addons } });
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-1">Premium Add-ons</h3>
      <p className="text-xs text-white/40 mb-4">Take it to the next level</p>
      <div className="grid grid-cols-2 gap-3">
        {premiumAddons.map(a => <OptionChip key={a.id} selected={c.premiumAddons.includes(a.id)} onClick={() => toggle(a.id)} emoji={a.emoji} label={a.name} price={a.price} />)}
      </div>
    </div>
  );
}

function SaucesStep() {
  const { state, dispatch } = useApp();
  const c = state.currentConfig;
  const toggleSauce = (id: string) => {
    const exists = c.sauces.find(s => s.id === id);
    const sauces = exists ? c.sauces.filter(s => s.id !== id) : [...c.sauces, { id, amount: 'regular' as SauceAmount }];
    dispatch({ type: 'UPDATE_CONFIG', payload: { sauces } });
  };
  const setAmount = (id: string, amount: SauceAmount) => {
    const sauces = c.sauces.map(s => s.id === id ? { ...s, amount } : s);
    dispatch({ type: 'UPDATE_CONFIG', payload: { sauces } });
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-1">Sauces</h3>
      <p className="text-xs text-white/40 mb-4">Mix and match your favorites</p>
      <div className="grid grid-cols-2 gap-3">
        {sauceOptions.map(s => <OptionChip key={s.id} selected={!!c.sauces.find(sc => sc.id === s.id)} onClick={() => toggleSauce(s.id)} emoji={s.emoji} label={s.name} price={s.price} glow={s.isSpecial} />)}
      </div>
      {c.sauces.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-white/40">Sauce amounts:</p>
          {c.sauces.map(s => {
            const info = sauceOptions.find(opt => opt.id === s.id);
            return (
              <div key={s.id} className="flex items-center gap-3">
                <span className="text-sm text-white/70 w-24">{info?.emoji} {info?.name}</span>
                <div className="flex gap-1">
                  {(['light', 'regular', 'extra'] as SauceAmount[]).map(amt => (
                    <button key={amt} onClick={() => setAmount(s.id, amt)} className={`px-2 py-0.5 rounded text-xs transition-all ${s.amount === amt ? 'bg-accent-orange/20 text-accent-orange' : 'text-white/30 hover:text-white/60'}`}>
                      {amt}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FlavorStep() {
  const { state, dispatch } = useApp();
  const c = state.currentConfig;
  const spicyLabels = ['None', 'Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme 🔥🔥🔥'];
  const toggle = (id: string) => {
    const seasonings = c.seasonings.includes(id) ? c.seasonings.filter(s => s !== id) : [...c.seasonings, id];
    dispatch({ type: 'UPDATE_CONFIG', payload: { seasonings } });
  };
  return (
    <div>
      <h3 className="text-lg font-bold mb-1">Flavor Boost</h3>
      <p className="text-xs text-white/40 mb-4">Crank up the heat</p>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">Spicy Level</span>
          <span className={`text-sm font-bold ${c.spicyLevel >= 4 ? 'text-red-500' : c.spicyLevel >= 2 ? 'text-amber-500' : 'text-green-500'}`}>{spicyLabels[c.spicyLevel]}</span>
        </div>
        <input type="range" min="0" max="5" value={c.spicyLevel} onChange={e => dispatch({ type: 'UPDATE_CONFIG', payload: { spicyLevel: parseInt(e.target.value) } })} className="w-full" />
        <div className="flex justify-between text-[10px] text-white/20 mt-1">
          <span>None</span><span>Extreme</span>
        </div>
      </div>
      <p className="text-sm text-white/60 mb-3">Seasoning</p>
      <div className="grid grid-cols-3 gap-3">
        {seasoningOptions.map(s => <OptionChip key={s.id} selected={c.seasonings.includes(s.id)} onClick={() => toggle(s.id)} emoji={s.emoji} label={s.name} />)}
      </div>
    </div>
  );
}

function MealStep() {
  const { state, dispatch } = useApp();
  const c = state.currentConfig;
  return (
    <div>
      <h3 className="text-lg font-bold mb-1">Make it a Meal?</h3>
      <p className="text-xs text-white/40 mb-4">Complete the experience</p>
      <div className="grid grid-cols-2 gap-3">
        {mealOptions.map(m => <OptionChip key={m.id} selected={c.mealOption === m.id} onClick={() => dispatch({ type: 'UPDATE_CONFIG', payload: { mealOption: m.id } })} emoji={m.emoji} label={m.name} price={m.price} />)}
      </div>
      <div className="mt-6 p-4 rounded-xl glass-light border border-accent-orange/20">
        <h4 className="text-sm font-semibold text-gradient mb-2">🎯 Your Burger Summary</h4>
        <div className="space-y-1 text-xs text-white/50">
          <p>🥯 {bunOptions.find(b => b.id === c.bun)?.name} bun ({c.toastLevel} toast)</p>
          <p>🥩 {pattyOptions.find(p => p.id === c.patty)?.name} × {c.pattyCount} ({c.pattyStyle})</p>
          <p>🧀 {cheeseOptions.find(ch => ch.id === c.cheese)?.name} × {c.cheeseCount} ({c.meltLevel} melt)</p>
          {c.toppings.length > 0 && <p>🥬 {c.toppings.map(t => toppingOptions.find(o => o.id === t)?.name).join(', ')}</p>}
          {c.premiumAddons.length > 0 && <p>⭐ {c.premiumAddons.map(a => premiumAddons.find(o => o.id === a)?.name).join(', ')}</p>}
          {c.sauces.length > 0 && <p>🧄 {c.sauces.map(s => `${sauceOptions.find(o => o.id === s.id)?.name} (${s.amount})`).join(', ')}</p>}
          {c.spicyLevel > 0 && <p>🌶️ Spicy: {c.spicyLevel}/5</p>}
        </div>
      </div>
    </div>
  );
}
