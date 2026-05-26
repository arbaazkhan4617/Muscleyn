export interface GuestCartItem {

  variantId: number;

  quantity: number;

  product?: any;

  variant?: any;
}

const CART_KEY =
  "guest_cart";

export const getGuestCart =
  (): GuestCartItem[] => {

    if (
      typeof window ===
      "undefined"
    ) {

      return [];
    }

    const cart =
      localStorage.getItem(
        CART_KEY
      );

    return cart
      ? JSON.parse(cart)
      : [];
};

export const saveGuestCart =
  (
    items: GuestCartItem[]
  ) => {

    localStorage.setItem(

      CART_KEY,

      JSON.stringify(items)
    );
};

export const addToGuestCart =
  (
    item: GuestCartItem
  ) => {

    const cart =
      getGuestCart();

    const existingItem =
      cart.find(

        (c) =>

          c.variantId ===
          item.variantId
      );

    if (
      existingItem
    ) {

      existingItem.quantity +=
        item.quantity;
    }

    else {

      cart.push(item);
    }

    saveGuestCart(cart);
};

export const removeFromGuestCart =
  (
    variantId: number
  ) => {

    const cart =
      getGuestCart();

    const updatedCart =
      cart.filter(

        (item) =>

          item.variantId !==
          variantId
      );

    saveGuestCart(
      updatedCart
    );
};

export const updateGuestCartQuantity =
  (

    variantId: number,

    quantity: number

  ) => {

    const cart =
      getGuestCart();

    const updatedCart =
      cart.map((item) => {

        if (
          item.variantId ===
          variantId
        ) {

          return {

            ...item,

            quantity,
          };
        }

        return item;
      });

    saveGuestCart(
      updatedCart
    );
};

export const clearGuestCart =
  () => {

    localStorage.removeItem(
      CART_KEY
    );
};

export const getGuestCartCount =
  (): number => {

    const cart =
      getGuestCart();

    return cart.reduce(

      (

        total,

        item

      ) =>

        total +
        item.quantity,

      0
    );
};

export const getGuestCartTotal =
  (): number => {

    const cart =
      getGuestCart();

    return cart.reduce(

      (

        total,

        item

      ) =>

        total +

        (
          (
            item.variant?.price
            || 0
          )

          *

          item.quantity
        ),

      0
    );
};