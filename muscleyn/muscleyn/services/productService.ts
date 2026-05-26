import api from "./api";

export const getProducts =
  async (

    page = 0,

    size = 10

  ) => {

    const response =

      await api.get(

        `/products?page=${page}&size=${size}`
      );

    return response.data;
};

export const getProductById =
  async (
    productId: number
  ) => {

    const response =

      await api.get(
        `/products/${productId}`
      );

    return response.data;
};

export const searchProducts =
  async (

    search?: string,

    category?: string,

    brand?: string,

    page = 0,

    size = 10

  ) => {

    const response =

      await api.get(
        "/products/search",

        {
          params: {

            search,

            category,

            brand,

            page,

            size,
          },
        }
      );

    return response.data;
};

export const getCategories =
  async () => {

    const response =

      await api.get(
        "/categories"
      );

    return response.data;
};

export const getBrands =
  async () => {

    const response =

      await api.get(
        "/brands"
      );

    return response.data;
};

export const getVariants =
  async (
    productId: number
  ) => {

    const response =

      await api.get(

        `/product-variants/product/${productId}`
      );

    return response.data;
};