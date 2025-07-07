import { CartItem } from "../../../lib/types";

const CART_KEY = "cart";

export const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (e) {
    console.warn("Failed to save cart to localStorage:", e);
  }
};

export const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.warn("Failed to load cart from localStorage:", e);
    return [];
  }
};
