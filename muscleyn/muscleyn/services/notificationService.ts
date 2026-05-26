import api from "./api";

export const getNotifications =
  async (
    userId: number
  ) => {

    const response =

      await api.get(

        `/notifications/${userId}`
      );

    return response.data;
};

export const markNotificationAsRead =
  async (
    notificationId: number
  ) => {

    const response =

      await api.put(

        `/notifications/read/${notificationId}`
      );

    return response.data;
};