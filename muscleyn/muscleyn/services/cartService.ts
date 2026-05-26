import api from "./api";

export interface CartRequest {

  userId: number;

  variantId: number;

  quantity: number;
}

export const addToCart =
  async (
    data: CartRequest
  ) => {

    const response =

      await api.post(
        "/cart",
        data
      );

    return response.data;
};

export const getCartItems =
  async (
    userId: number
  ) => {

    const response =

      await api.get(
        `/cart/${userId}`
      );

    return response.data;
};

export const updateCartQuantity =
  async (

    cartId: number,

    quantity: number

  ) => {

    const response =

      await api.put(

        `/cart/${cartId}?quantity=${quantity}`
      );

    return response.data;
};

export const removeCartItem =
  async (
    cartId: number
  ) => {

    const response =

      await api.delete(
        `/cart/${cartId}`
      );

    return response.data;
};