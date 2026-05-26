import api from "./api";

export interface SaveAddressRequest {

  userId: number;

  fullName: string;

  mobileNumber: string;

  addressLine1: string;

  addressLine2?: string;

  landmark?: string;

  city: string;

  state: string;

  country: string;

  pincode: string;

  addressType: string;

  isDefault: boolean;
}

// SAVE
export const saveAddress =
  async (
    data: SaveAddressRequest
  ) => {

    const response =

      await api.post(
        "/address",
        data
      );

    return response.data;
};

// UPDATE
export const updateAddress =
  async (

    id: number,

    data: SaveAddressRequest

  ) => {

    const response =

      await api.put(

        `/address/${id}`,

        data
      );

    return response.data;
};

// GET USER ADDRESSES
export const getUserAddresses =
  async (
    userId: number
  ) => {

    const response =

      await api.get(

        `/address/user/${userId}`
      );

    return response.data;
};

// GET DEFAULT
export const getDefaultAddress =
  async (
    userId: number
  ) => {

    const response =

      await api.get(

        `/address/default/${userId}`
      );

    return response.data;
};

// DELETE
export const deleteAddress =
  async (

    id: number,

    userId: number

  ) => {

    const response =

      await api.delete(

        `/address/${id}?userId=${userId}`
      );

    return response.data;
};

// SET DEFAULT
export const setDefaultAddress =
  async (

    id: number,

    userId: number

  ) => {

    const response =

      await api.put(

        `/address/default/${id}?userId=${userId}`
      );

    return response.data;
};