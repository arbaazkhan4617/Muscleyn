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
    categories?: string[],
    brands?: string[],
    goals?: string[],
    isBestSeller?: boolean,
    isOffer?: boolean,
    minPrice?: number,
    maxPrice?: number,
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "desc"
  ) => {
    const params: any = {
      page,
      size,
      sortBy,
      direction,
    };
    if (search) params.search = search;
    if (categories && categories.length > 0) params.categories = categories.join(",");
    if (brands && brands.length > 0) params.brands = brands.join(",");
    if (goals && goals.length > 0) params.goals = goals.join(",");
    if (isBestSeller !== undefined) params.isBestSeller = isBestSeller;
    if (isOffer !== undefined) params.isOffer = isOffer;
    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;

    const response = await api.get(
      "/products/search",
      { params }
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