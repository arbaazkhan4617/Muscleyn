import api from "./api";

export interface PlaceOrderRequest {

  userId?: number;

  addressId?: number;

  paymentMethod:
    string;

  paymentGateway?:
    string;

  items: {

    productId:
      number;

    variantId:
      number;

    quantity:
      number;

  }[];
}

export const placeOrder =
  async (
    data: PlaceOrderRequest
  ) => {

    const response =

      await api.post(
        "/orders",
        data
      );

    return response.data;
};

export const getOrders =
  async (
    userId: number
  ) => {

    const response =

      await api.get(
        `/orders/${userId}`
      );

    return response.data;
};

export const getOrderItems =
  async (
    orderId: number
  ) => {

    const response =

      await api.get(

        `/orders/items/${orderId}`
      );

    return response.data;
};

export const updateOrderStatus =
  async (

    orderId: number,

    orderStatus: string

  ) => {

    const response =

      await api.put(

        `/orders/status/${orderId}?orderStatus=${orderStatus}`
      );

    return response.data;
};