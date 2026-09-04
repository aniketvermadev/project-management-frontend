import api from "./api";

export const refreshAccessToken =
  async () => {
    const response = await api.post(
      "/auth/refresh-token"
    );

    return response.data;
  };

  export const logoutUser =
  async () => {
    await api.post(
      "/auth/logout"
    );
  };