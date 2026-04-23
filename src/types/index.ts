export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  price: number;
  calories: number;
  spicyLevel: number; // 0-5
  isVeg: boolean;
  badge?: 'popular' | 'new' | 'value';
  description: string;
  defaultConfig: BurgerConfig;
}

export interface BunOption {
  id: string;
  name: string;
  emoji: string;
  price: number;
}

export interface PattyOption {
  id: string;
  name: string;
  emoji: string;
  price: number;
  isVeg: boolean;
}

export interface CheeseOption {
  id: string;
  name: string;
  emoji: string;
  price: number;
  color: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  emoji: string;
  price: number;
}

export interface PremiumAddon {
  id: string;
  name: string;
  emoji: string;
  price: number;
}

export interface SauceOption {
  id: string;
  name: string;
  emoji: string;
  price: number;
  color: string;
  isSpecial?: boolean;
}

export interface SeasoningOption {
  id: string;
  name: string;
  emoji: string;
}

export interface MealOption {
  id: string;
  name: string;
  emoji: string;
  price: number;
}

export type ToastLevel = 'light' | 'medium' | 'crispy';
export type PattyCount = 'single' | 'double' | 'triple';
export type PattyStyle = 'grilled' | 'smash';
export type CheeseCount = 'single' | 'double';
export type MeltLevel = 'light' | 'extra';
export type SauceAmount = 'light' | 'regular' | 'extra';

export interface BurgerConfig {
  bun: string;
  toastLevel: ToastLevel;
  patty: string;
  pattyCount: PattyCount;
  pattyStyle: PattyStyle;
  cheese: string;
  cheeseCount: CheeseCount;
  meltLevel: MeltLevel;
  toppings: string[];
  premiumAddons: string[];
  sauces: { id: string; amount: SauceAmount }[];
  spicyLevel: number;
  seasonings: string[];
  mealOption: string;
}

export interface CartItem {
  id: string;
  menuItemId?: string;
  name: string;
  image: string;
  config: BurgerConfig;
  price: number;
  quantity: number;
}

export type BuilderStep = 'bun' | 'patty' | 'cheese' | 'toppings' | 'addons' | 'sauces' | 'flavor' | 'meal';
