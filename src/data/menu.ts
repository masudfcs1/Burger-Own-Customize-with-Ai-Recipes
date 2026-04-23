import {
  MenuItem, BunOption, PattyOption, CheeseOption,
  ToppingOption, PremiumAddon, SauceOption, SeasoningOption, MealOption
} from '@/types';

export const menuItems: MenuItem[] = [
  {
    id: 'smoky-bbq-beast',
    name: 'Smoky BBQ Beast',
    tagline: 'Flame-grilled perfection with smoky BBQ glaze',
    image: '/bbq-burger.png',
    price: 12.99,
    calories: 850,
    spicyLevel: 1,
    isVeg: false,
    badge: 'popular',
    description: 'Our signature BBQ burger with crispy bacon, caramelized onions, cheddar cheese, and house-made smoky BBQ sauce on a toasted brioche bun.',
    defaultConfig: {
      bun: 'brioche', toastLevel: 'medium',
      patty: 'beef', pattyCount: 'single', pattyStyle: 'grilled',
      cheese: 'cheddar', cheeseCount: 'single', meltLevel: 'extra',
      toppings: ['onion', 'pickles'], premiumAddons: ['bacon'],
      sauces: [{ id: 'bbq', amount: 'regular' }],
      spicyLevel: 1, seasonings: ['black-pepper'], mealOption: 'burger-only'
    }
  },
  {
    id: 'classic-cheeseburger',
    name: 'Classic Cheeseburger',
    tagline: 'The OG. Simple. Perfect. Timeless.',
    image: '/classic-burger.png',
    price: 9.99,
    calories: 650,
    spicyLevel: 0,
    isVeg: false,
    badge: 'value',
    description: 'Fresh lettuce, ripe tomato, pickles, and melted American cheese with our signature sauce on a sesame bun.',
    defaultConfig: {
      bun: 'sesame', toastLevel: 'light',
      patty: 'beef', pattyCount: 'single', pattyStyle: 'grilled',
      cheese: 'american', cheeseCount: 'single', meltLevel: 'light',
      toppings: ['lettuce', 'tomato', 'pickles'], premiumAddons: [],
      sauces: [{ id: 'ketchup', amount: 'regular' }, { id: 'mustard', amount: 'light' }],
      spicyLevel: 0, seasonings: [], mealOption: 'burger-only'
    }
  },
  {
    id: 'inferno-jalapeno',
    name: 'Inferno Jalapeño',
    tagline: 'For those who dare to feel the burn 🔥',
    image: '/spicy-burger.png',
    price: 13.99,
    calories: 780,
    spicyLevel: 4,
    isVeg: false,
    badge: 'new',
    description: 'Loaded with jalapeños, pepper jack cheese, crispy onion rings, and our fiery sriracha mayo on a toasted bun.',
    defaultConfig: {
      bun: 'classic', toastLevel: 'crispy',
      patty: 'beef', pattyCount: 'single', pattyStyle: 'smash',
      cheese: 'mozzarella', cheeseCount: 'double', meltLevel: 'extra',
      toppings: ['jalapenos', 'onion'], premiumAddons: ['onion-rings'],
      sauces: [{ id: 'spicy', amount: 'extra' }],
      spicyLevel: 4, seasonings: ['peri-peri'], mealOption: 'burger-only'
    }
  },
  {
    id: 'garden-verde',
    name: 'Garden Verde',
    tagline: 'Plant-powered. Full-flavored. Zero compromise.',
    image: '/veggie-burger.png',
    price: 11.99,
    calories: 520,
    spicyLevel: 0,
    isVeg: true,
    description: 'A gourmet veggie patty with avocado, grilled mushrooms, fresh spinach, and Swiss cheese on a whole wheat bun.',
    defaultConfig: {
      bun: 'whole-wheat', toastLevel: 'medium',
      patty: 'veggie', pattyCount: 'single', pattyStyle: 'grilled',
      cheese: 'swiss', cheeseCount: 'single', meltLevel: 'light',
      toppings: ['lettuce', 'tomato', 'mushrooms'], premiumAddons: ['avocado'],
      sauces: [{ id: 'garlic', amount: 'regular' }],
      spicyLevel: 0, seasonings: ['herbs'], mealOption: 'burger-only'
    }
  },
  {
    id: 'double-trouble',
    name: 'Double Trouble',
    tagline: 'Twice the patty. Twice the pleasure.',
    image: '/double-burger.png',
    price: 15.99,
    calories: 1100,
    spicyLevel: 2,
    isVeg: false,
    badge: 'popular',
    description: 'Two juicy beef patties with double cheese, crispy bacon, lettuce, and our special house sauce.',
    defaultConfig: {
      bun: 'sesame', toastLevel: 'medium',
      patty: 'beef', pattyCount: 'double', pattyStyle: 'grilled',
      cheese: 'american', cheeseCount: 'double', meltLevel: 'extra',
      toppings: ['lettuce', 'tomato', 'pickles'], premiumAddons: ['bacon', 'egg'],
      sauces: [{ id: 'mayo', amount: 'regular' }, { id: 'ketchup', amount: 'light' }],
      spicyLevel: 2, seasonings: ['black-pepper'], mealOption: 'burger-only'
    }
  },
  {
    id: 'ocean-catch',
    name: 'Ocean Catch',
    tagline: 'Crispy fish fillet. Fresh ocean vibes.',
    image: '/fish-burger.png',
    price: 13.49,
    calories: 620,
    spicyLevel: 0,
    isVeg: false,
    badge: 'new',
    description: 'A crispy fish fillet with tartar sauce, fresh lettuce, and a squeeze of lemon on a buttery brioche bun.',
    defaultConfig: {
      bun: 'brioche', toastLevel: 'light',
      patty: 'fish', pattyCount: 'single', pattyStyle: 'grilled',
      cheese: 'swiss', cheeseCount: 'single', meltLevel: 'light',
      toppings: ['lettuce', 'tomato'], premiumAddons: [],
      sauces: [{ id: 'mayo', amount: 'regular' }, { id: 'garlic', amount: 'light' }],
      spicyLevel: 0, seasonings: ['herbs'], mealOption: 'burger-only'
    }
  }
];

export const bunOptions: BunOption[] = [
  { id: 'classic', name: 'Classic', emoji: '🍞', price: 0 },
  { id: 'sesame', name: 'Sesame', emoji: '🥯', price: 0 },
  { id: 'brioche', name: 'Brioche', emoji: '🧈', price: 0.50 },
  { id: 'whole-wheat', name: 'Whole Wheat', emoji: '🌾', price: 0.25 },
  { id: 'cheese-burst', name: 'Cheese Burst', emoji: '🧀', price: 1.00 },
  { id: 'gluten-free', name: 'Gluten-Free', emoji: '🌿', price: 1.50 },
];

export const pattyOptions: PattyOption[] = [
  { id: 'chicken', name: 'Chicken', emoji: '🍗', price: 0, isVeg: false },
  { id: 'beef', name: 'Beef', emoji: '🥩', price: 0, isVeg: false },
  { id: 'veggie', name: 'Veggie', emoji: '🥬', price: 0, isVeg: true },
  { id: 'fish', name: 'Fish', emoji: '🐟', price: 1.00, isVeg: false },
  { id: 'plant-based', name: 'Plant-Based', emoji: '🌱', price: 1.50, isVeg: true },
];

export const cheeseOptions: CheeseOption[] = [
  { id: 'american', name: 'American', emoji: '🧀', price: 0, color: '#FFA500' },
  { id: 'cheddar', name: 'Cheddar', emoji: '🧀', price: 0.50, color: '#FF8C00' },
  { id: 'mozzarella', name: 'Mozzarella', emoji: '🧀', price: 0.50, color: '#FFFDD0' },
  { id: 'swiss', name: 'Swiss', emoji: '🧀', price: 0.75, color: '#FFEAA7' },
];

export const toppingOptions: ToppingOption[] = [
  { id: 'lettuce', name: 'Lettuce', emoji: '🥬', price: 0 },
  { id: 'tomato', name: 'Tomato', emoji: '🍅', price: 0 },
  { id: 'onion', name: 'Onion', emoji: '🧅', price: 0 },
  { id: 'pickles', name: 'Pickles', emoji: '🥒', price: 0 },
  { id: 'jalapenos', name: 'Jalapeños', emoji: '🌶️', price: 0.50 },
  { id: 'caramelized-onion', name: 'Caramelized Onion', emoji: '🍯', price: 0.75 },
  { id: 'mushrooms', name: 'Grilled Mushrooms', emoji: '🍄', price: 0.75 },
  { id: 'coleslaw', name: 'Coleslaw', emoji: '🥗', price: 0.50 },
];

export const premiumAddons: PremiumAddon[] = [
  { id: 'bacon', name: 'Bacon', emoji: '🥓', price: 1.50 },
  { id: 'egg', name: 'Fried Egg', emoji: '🍳', price: 1.00 },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', price: 1.75 },
  { id: 'extra-patty', name: 'Extra Patty', emoji: '🥩', price: 3.00 },
  { id: 'onion-rings', name: 'Onion Rings', emoji: '🧅', price: 1.25 },
];

export const sauceOptions: SauceOption[] = [
  { id: 'mayo', name: 'Mayo', emoji: '🥚', price: 0, color: '#FFFFF0' },
  { id: 'bbq', name: 'BBQ', emoji: '🔥', price: 0, color: '#8B4513' },
  { id: 'ketchup', name: 'Ketchup', emoji: '🍅', price: 0, color: '#DC143C' },
  { id: 'mustard', name: 'Mustard', emoji: '🟡', price: 0, color: '#FFD700' },
  { id: 'spicy', name: 'Spicy Sauce', emoji: '🌶️', price: 0.50, color: '#FF4500' },
  { id: 'garlic', name: 'Garlic Sauce', emoji: '🧄', price: 0.50, color: '#FFF8DC', isSpecial: true },
];

export const seasoningOptions: SeasoningOption[] = [
  { id: 'black-pepper', name: 'Black Pepper', emoji: '⚫' },
  { id: 'peri-peri', name: 'Peri-Peri', emoji: '🌶️' },
  { id: 'herbs', name: 'Herbs', emoji: '🌿' },
];

export const mealOptions: MealOption[] = [
  { id: 'burger-only', name: 'Burger Only', emoji: '🍔', price: 0 },
  { id: 'with-fries', name: 'Add Fries', emoji: '🍟', price: 2.99 },
  { id: 'with-drink', name: 'Add Drink', emoji: '🥤', price: 1.99 },
  { id: 'full-meal', name: 'Full Meal', emoji: '🎉', price: 3.99 },
];
