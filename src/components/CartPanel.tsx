"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useApp, calculatePrice } from "@/store/AppContext";
import {
  bunOptions,
  pattyOptions,
  cheeseOptions,
  toppingOptions,
  premiumAddons,
  sauceOptions,
  mealOptions,
} from "@/data/menu";

export default function CartPanel() {
  const { state, dispatch } = useApp();
  const { cart, isCartOpen } = state;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm"
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] z-[55] glass border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div>
                <h2 className="text-lg font-bold font-[var(--font-display)]">
                  🛒 Your Cart
                </h2>
                <p className="text-xs text-white/40">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={() => dispatch({ type: "CLEAR_CART" })}
                    className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => dispatch({ type: "TOGGLE_CART" })}
                  className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-white/50 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.span
                    className="text-6xl mb-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    🍔
                  </motion.span>
                  <p className="text-white/40 text-sm">Your cart is empty</p>
                  <p className="text-white/20 text-xs mt-1">
                    Add a burger to get started!
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      className="rounded-xl glass-light border border-white/5 p-3"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {item.name}
                          </h4>
                          <div className="text-[10px] text-white/30 mt-0.5 space-y-0.5">
                            <p>
                              {
                                bunOptions.find((b) => b.id === item.config.bun)
                                  ?.name
                              }{" "}
                              •{" "}
                              {
                                pattyOptions.find(
                                  (p) => p.id === item.config.patty,
                                )?.name
                              }{" "}
                              × {item.config.pattyCount}
                            </p>
                            {item.config.toppings.length > 0 && (
                              <p>
                                {item.config.toppings
                                  .map(
                                    (t) =>
                                      toppingOptions.find((o) => o.id === t)
                                        ?.emoji,
                                  )
                                  .join(" ")}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-gradient">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "UPDATE_QUANTITY",
                                    payload: {
                                      id: item.id,
                                      quantity: item.quantity - 1,
                                    },
                                  })
                                }
                                className="w-6 h-6 rounded-md glass-light flex items-center justify-center text-xs text-white/50 hover:text-white"
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-xs font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "UPDATE_QUANTITY",
                                    payload: {
                                      id: item.id,
                                      quantity: item.quantity + 1,
                                    },
                                  })
                                }
                                className="w-6 h-6 rounded-md glass-light flex items-center justify-center text-xs text-white/50 hover:text-white"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "OPEN_BUILDER",
                                payload: {
                                  config: item.config,
                                  editItemId: item.id,
                                },
                              })
                            }
                            className="text-[10px] text-accent-orange/70 hover:text-accent-orange transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: item.id,
                              })
                            }
                            className="text-[10px] text-red-400/50 hover:text-red-400 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-white/5 p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Delivery</span>
                  <span className="text-accent-green font-medium">Free</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold border-t border-white/5 pt-3">
                  <span>Total</span>
                  <span className="text-gradient">${total.toFixed(2)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-amber text-white font-semibold text-sm shadow-lg glow-orange"
                >
                  Checkout — ${total.toFixed(2)}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
