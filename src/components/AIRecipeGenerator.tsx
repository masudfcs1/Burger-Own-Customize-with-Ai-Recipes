/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/store/AppContext";
import { BurgerConfig } from "@/types";

const themes = [
  {
    id: "spicy",
    label: "🔥 Spicy Fire",
    prompt: "extremely spicy and bold with lots of heat",
  },
  {
    id: "classic",
    label: "🍔 Classic Vibes",
    prompt: "classic American diner style comfort burger",
  },
  {
    id: "healthy",
    label: "🥗 Healthy Choice",
    prompt: "healthy and fresh with lots of vegetables",
  },
  {
    id: "loaded",
    label: "💪 Max Loaded",
    prompt: "fully loaded with every premium topping and extra patties",
  },
  {
    id: "fusion",
    label: "🌍 World Fusion",
    prompt: "fusion of international flavors, something unexpected",
  },
  {
    id: "cheese",
    label: "🧀 Cheese Lover",
    prompt: "maximum cheese with cheese burst bun and double melt",
  },
  {
    id: "bbq",
    label: "🔥 BBQ Master",
    prompt: "smoky BBQ with bacon and caramelized onions",
  },
  {
    id: "surprise",
    label: "🎲 Surprise Me!",
    prompt: "surprise me with the most creative combination possible",
  },
];

interface AIRecipe {
  name: string;
  tagline: string;
  description: string;
  config: BurgerConfig;
}

export default function AIRecipeGenerator() {
  const { dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<AIRecipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");

  const generateBurger = async (theme: string) => {
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const res = await fetch("/api/generate-burger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });

      const data = await res.json();

      if (data.success) {
        setRecipe(data.recipe);
      } else {
        setError(data.error || "Failed to generate recipe");
      }
    } catch (err: any) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyRecipe = () => {
    if (!recipe) return;
    dispatch({
      type: "OPEN_BUILDER",
      payload: { config: recipe.config },
    });
    setIsOpen(false);
  };

  const quickAddRecipe = () => {
    if (!recipe) return;
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        name: recipe.name,
        image: "/classic-burger.png",
        config: recipe.config,
      },
    });
    setRecipe(null);
  };

  return (
    <>
      {/* Trigger Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div
          className="relative rounded-2xl overflow-hidden p-6 sm:p-8 border border-purple-500/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(236,72,153,0.08) 50%, rgba(255,107,44,0.08) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Animated background orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                >
                  🤖
                </motion.span>
                <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-display)]">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    AI Burger Chef
                  </span>
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  POWERED BY GEMINI
                </span>
              </div>
              <p className="text-sm text-white/50">
                Let AI craft your perfect burger. Choose a mood or describe your
                craving!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 rounded-full font-semibold text-sm text-white shadow-lg transition-all"
              style={{
                background:
                  "linear-gradient(135deg, #8B5CF6, #EC4899, #FF6B2C)",
                boxShadow:
                  "0 0 20px rgba(139,92,246,0.3), 0 0 60px rgba(236,72,153,0.1)",
              }}
            >
              ✨ Generate AI Burger
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* AI Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => {
              setIsOpen(false);
              setRecipe(null);
              setError(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl overflow-hidden border border-purple-500/20"
              style={{
                background:
                  "linear-gradient(180deg, rgba(19,19,26,0.95) 0%, rgba(19,19,26,0.98) 100%)",
                backdropFilter: "blur(30px)",
              }}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  <h2 className="text-lg font-bold font-[var(--font-display)]">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      AI Burger Chef
                    </span>
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setRecipe(null);
                    setError(null);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {!recipe && !loading && (
                  <>
                    {/* Error State (shown above options so user can retry) */}
                    {error && (
                      <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                        <span className="text-2xl mb-2 block">😢</span>
                        <p className="text-sm font-medium text-red-400 mb-1">
                          {error.includes("429") || error.includes("quota")
                            ? "API quota exceeded"
                            : "Generation failed"}
                        </p>
                        <p className="text-xs text-white/30">
                          {error.includes("429") || error.includes("quota")
                            ? "The AI service is temporarily at capacity. Please try again in a minute."
                            : "Something went wrong. Please try again."}
                        </p>
                      </div>
                    )}

                    {/* Theme Chips */}
                    <p className="text-sm text-white/50 mb-3">Choose a mood:</p>
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {themes.map((t) => (
                        <motion.button
                          key={t.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSelectedTheme(t.id);
                            generateBurger(t.prompt);
                          }}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all border ${
                            selectedTheme === t.id
                              ? "border-purple-500/40 bg-purple-500/10 text-white"
                              : "border-white/5 bg-white/3 text-white/60 hover:text-white hover:bg-white/8"
                          }`}
                        >
                          {t.label}
                        </motion.button>
                      ))}
                    </div>

                    {/* Custom Prompt */}
                    <div className="relative">
                      <p className="text-sm text-white/50 mb-2">
                        Or describe your craving:
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customPrompt}
                          onChange={(e) => setCustomPrompt(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && customPrompt.trim()) {
                              setSelectedTheme(null);
                              generateBurger(customPrompt);
                            }
                          }}
                          placeholder='e.g. "A burger that tastes like Mexico"'
                          className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/40 transition-colors"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (customPrompt.trim()) {
                              setSelectedTheme(null);
                              generateBurger(customPrompt);
                            }
                          }}
                          disabled={!customPrompt.trim()}
                          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-30 transition-all"
                          style={{
                            background:
                              "linear-gradient(135deg, #8B5CF6, #EC4899)",
                          }}
                        >
                          ✨
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}

                {/* Loading State */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      className="text-5xl mb-4"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                    >
                      🍔
                    </motion.div>
                    <motion.p
                      className="text-sm text-white/50"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      AI Chef is crafting your burger...
                    </motion.p>
                    <div className="mt-4 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background:
                              "linear-gradient(135deg, #8B5CF6, #EC4899)",
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Recipe Result */}
                {recipe && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center mb-4">
                      <motion.span
                        className="text-5xl inline-block"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.6 }}
                      >
                        🍔
                      </motion.span>
                    </div>

                    <h3 className="text-xl font-bold font-[var(--font-display)] text-center mb-1">
                      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                        {recipe.name}
                      </span>
                    </h3>
                    <p className="text-sm text-white/50 text-center mb-2">
                      {recipe.tagline}
                    </p>
                    <p className="text-xs text-white/30 text-center mb-5 max-w-sm mx-auto">
                      {recipe.description}
                    </p>

                    {/* Recipe breakdown */}
                    <div className="rounded-xl bg-white/3 border border-white/5 p-4 mb-5 space-y-1.5 text-xs text-white/50">
                      <p>
                        🥯{" "}
                        <span className="text-white/70">
                          {recipe.config.bun}
                        </span>{" "}
                        bun, {recipe.config.toastLevel} toast
                      </p>
                      <p>
                        🥩{" "}
                        <span className="text-white/70">
                          {recipe.config.patty}
                        </span>{" "}
                        × {recipe.config.pattyCount}, {recipe.config.pattyStyle}
                      </p>
                      <p>
                        🧀{" "}
                        <span className="text-white/70">
                          {recipe.config.cheese}
                        </span>{" "}
                        × {recipe.config.cheeseCount}, {recipe.config.meltLevel}{" "}
                        melt
                      </p>
                      {recipe.config.toppings.length > 0 && (
                        <p>🥬 {recipe.config.toppings.join(", ")}</p>
                      )}
                      {recipe.config.premiumAddons.length > 0 && (
                        <p>⭐ {recipe.config.premiumAddons.join(", ")}</p>
                      )}
                      {recipe.config.sauces.length > 0 && (
                        <p>
                          🧄{" "}
                          {recipe.config.sauces
                            .map((s) => `${s.id} (${s.amount})`)
                            .join(", ")}
                        </p>
                      )}
                      {recipe.config.spicyLevel > 0 && (
                        <p>🌶️ Spicy level: {recipe.config.spicyLevel}/5</p>
                      )}
                      {recipe.config.seasonings.length > 0 && (
                        <p>🌿 {recipe.config.seasonings.join(", ")}</p>
                      )}
                      <p>📦 {recipe.config.mealOption}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={applyRecipe}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, #8B5CF6, #EC4899)",
                        }}
                      >
                        🎨 Customize in Builder
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={quickAddRecipe}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-amber text-sm font-semibold text-white"
                      >
                        🛒 Quick Add to Cart
                      </motion.button>
                    </div>

                    <button
                      onClick={() => {
                        setRecipe(null);
                        setError(null);
                      }}
                      className="w-full mt-3 py-2 text-xs text-white/30 hover:text-white/60 transition-colors text-center"
                    >
                      ← Generate another one
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
