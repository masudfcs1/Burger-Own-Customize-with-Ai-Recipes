'use client';

import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { CartItem, BurgerConfig, BuilderStep } from '@/types';
import {
  bunOptions, pattyOptions, cheeseOptions, toppingOptions,
  premiumAddons, sauceOptions, mealOptions
} from '@/data/menu';

interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
  isBuilderOpen: boolean;
  builderStep: BuilderStep;
  currentConfig: BurgerConfig;
  editingItemId: string | null;
  builderSourceId: string | null;
  flyingBurger: { x: number; y: number } | null;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: { name: string; image: string; config: BurgerConfig; menuItemId?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; config: BurgerConfig } }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_BUILDER'; payload?: { config?: BurgerConfig; menuItemId?: string; editItemId?: string } }
  | { type: 'CLOSE_BUILDER' }
  | { type: 'SET_BUILDER_STEP'; payload: BuilderStep }
  | { type: 'UPDATE_CONFIG'; payload: Partial<BurgerConfig> }
  | { type: 'SET_FLYING_BURGER'; payload: { x: number; y: number } | null }
  | { type: 'CLEAR_CART' };

const defaultConfig: BurgerConfig = {
  bun: 'classic',
  toastLevel: 'medium',
  patty: 'beef',
  pattyCount: 'single',
  pattyStyle: 'grilled',
  cheese: 'american',
  cheeseCount: 'single',
  meltLevel: 'light',
  toppings: [],
  premiumAddons: [],
  sauces: [],
  spicyLevel: 0,
  seasonings: [],
  mealOption: 'burger-only',
};

const initialState: AppState = {
  cart: [],
  isCartOpen: false,
  isBuilderOpen: false,
  builderStep: 'bun',
  currentConfig: { ...defaultConfig },
  editingItemId: null,
  builderSourceId: null,
  flyingBurger: null,
};

export function calculatePrice(config: BurgerConfig, basePrice: number = 8.99): number {
  let price = basePrice;

  const bun = bunOptions.find(b => b.id === config.bun);
  if (bun) price += bun.price;

  const patty = pattyOptions.find(p => p.id === config.patty);
  if (patty) price += patty.price;

  const pattyMultiplier = config.pattyCount === 'double' ? 2 : config.pattyCount === 'triple' ? 3 : 1;
  if (pattyMultiplier > 1 && patty) price += patty.price * (pattyMultiplier - 1) + (pattyMultiplier - 1) * 2;

  const cheese = cheeseOptions.find(c => c.id === config.cheese);
  if (cheese) {
    price += cheese.price;
    if (config.cheeseCount === 'double') price += cheese.price;
  }

  config.toppings.forEach(t => {
    const topping = toppingOptions.find(opt => opt.id === t);
    if (topping) price += topping.price;
  });

  config.premiumAddons.forEach(a => {
    const addon = premiumAddons.find(opt => opt.id === a);
    if (addon) price += addon.price;
  });

  config.sauces.forEach(s => {
    const sauce = sauceOptions.find(opt => opt.id === s.id);
    if (sauce) {
      price += sauce.price;
      if (s.amount === 'extra') price += 0.25;
    }
  });

  const meal = mealOptions.find(m => m.id === config.mealOption);
  if (meal) price += meal.price;

  return Math.round(price * 100) / 100;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem: CartItem = {
        id: generateId(),
        menuItemId: action.payload.menuItemId,
        name: action.payload.name,
        image: action.payload.image,
        config: { ...action.payload.config },
        price: calculatePrice(action.payload.config),
        quantity: 1,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }
    case 'UPDATE_CART_ITEM': {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, config: action.payload.config, price: calculatePrice(action.payload.config) }
            : item
        ),
      };
    }
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'OPEN_BUILDER':
      return {
        ...state,
        isBuilderOpen: true,
        builderStep: 'bun',
        currentConfig: action.payload?.config ? { ...action.payload.config } : { ...defaultConfig },
        editingItemId: action.payload?.editItemId || null,
        builderSourceId: action.payload?.menuItemId || null,
      };
    case 'CLOSE_BUILDER':
      return { ...state, isBuilderOpen: false, editingItemId: null, builderSourceId: null };
    case 'SET_BUILDER_STEP':
      return { ...state, builderStep: action.payload };
    case 'UPDATE_CONFIG':
      return { ...state, currentConfig: { ...state.currentConfig, ...action.payload } };
    case 'SET_FLYING_BURGER':
      return { ...state, flyingBurger: action.payload };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

const AppContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
