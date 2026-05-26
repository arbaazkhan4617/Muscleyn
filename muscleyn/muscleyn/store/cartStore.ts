import { create } from "zustand";

import { persist } from "zustand/middleware";

interface CartItem {
  id: number;

  name: string;

  image: string;

  price: string;

  quantity: number;

  stock: number;
}

interface CartStore {

  cartItems: CartItem[];

  addToCart: (
    product: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (id: number) => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;

  updateQuantity: (
  id: number,
  quantity: number
) => void;

  clearCart: () => void;


  
}


export const useCartStore =
  create<CartStore>()(

    persist(

      (set) => ({

    cartItems: [],

    // ADD TO CART
    addToCart: (product) =>

      set((state) => {

        const existingProduct =
          state.cartItems.find(
            (item) => item.id === product.id
          );

        // If already exists
        if (existingProduct) {

  // STOCK LIMIT
  if (
    existingProduct.quantity >=
    existingProduct.stock
  ) {
    return state;
  }

  return {
    cartItems: state.cartItems.map((item) =>

      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    ),
  };
}

        // New Product
        return {
          cartItems: [
            ...state.cartItems,
            {
              ...product,
              quantity: 1,
            },
          ],
        };
      }),

    // REMOVE
    removeFromCart: (id) =>

      set((state) => ({
        cartItems: state.cartItems.filter(
          (item) => item.id !== id
        ),
      })),

    // INCREASE
    increaseQuantity: (id) =>

  set((state) => ({

    cartItems: state.cartItems.map((item) => {

      // STOCK LIMIT
      if (
        item.id === id &&
        item.quantity < item.stock
      ) {

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    }),

  })),

    // DECREASE
    decreaseQuantity: (id) =>

      set((state) => ({
        cartItems: state.cartItems
          .map((item) =>

            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      })),
// UPDATE QUANTITY
updateQuantity: (
  id,
  quantity
) =>

  set((state) => ({

    cartItems: state.cartItems.map((item) => {

      if (item.id === id) {

        // MIN 1
        if (quantity < 1) {
          return {
            ...item,
            quantity: 1,
          };
        }

        // MAX STOCK
        if (quantity > item.stock) {
          return {
            ...item,
            quantity: item.stock,
          };
        }

        return {
          ...item,
          quantity,
        };
      }

      return item;
    }),

  })),
    // CLEAR
    clearCart: () =>
      set({
        cartItems: [],
      }),


      
  }),

      {
        name: "muscleyn-cart",
      }

    )

  );