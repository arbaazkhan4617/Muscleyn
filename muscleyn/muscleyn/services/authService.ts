import api from "./api";

export interface LoginRequest {

  mobileNumber: string;

  password: string;
}

export interface RegisterRequest {

  name: string;

  mobileNumber: string;

  password?: string;
}

export const login = async (

  data: LoginRequest

) => {

  const response =

    await api.post(
      "/auth/login",
      data
    );

  const result =
    response.data;

  if (
    result?.data?.token
  ) {

    localStorage.setItem(

      "token",

      result.data.token
    );

    localStorage.setItem(

      "user",

      JSON.stringify(
        result.data
      )
    );
  }

  return result;
};

export const googleLogin = async (idToken: string) => {

  const response = await api.post("/auth/google", { idToken });

  const result = response.data;

  if (result?.data?.token) {
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data));
  }

  return result;
};


export const register =
  async (

    data: RegisterRequest

  ) => {

    const response =

      await api.post(
        "/auth/register",
        data
      );

    const result =
      response.data;

    if (
      result?.data?.token
    ) {

      localStorage.setItem(

        "token",

        result.data.token
      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          result.data
        )
      );
    }

    return result;
};

export const logout = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );
};

export const getToken = () => {

  return localStorage.getItem(
    "token"
  );
};

export const getUser = () => {

  const user =
    localStorage.getItem(
      "user"
    );

  return user
    ? JSON.parse(user)
    : null;
};