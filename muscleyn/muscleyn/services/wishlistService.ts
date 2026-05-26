import api from "./api";

export interface WishlistRequest {

  userId: number;

  variantId: number;
}

export const addWishlist =
  async (
    data: WishlistRequest
  ) => {

    const response =

      await api.post(
        "/wishlist",
        data
      );

    return response.data;
};

export const getWishlist =
  async (
    userId: number
  ) => {

    const response =

      await api.get(
        `/wishlist/${userId}`
      );

    return response.data;
};

export const removeWishlist =
  async (
    wishlistId: number
  ) => {

    const response =

      await api.delete(
        `/wishlist/${wishlistId}`
      );

    return response.data;
};