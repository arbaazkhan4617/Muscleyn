"use client";

import {

  createContext,

  useContext,

  useEffect,

  useState,

  ReactNode,

} from "react";

import {

  getUser,

  getToken,

  logout,

} from "../services/authService";

interface AuthContextType {

  user: any;

  token: string | null;

  isLoggedIn: boolean;

  logoutUser: () => void;
}

const AuthContext =

  createContext<
    AuthContextType | undefined
  >(undefined);

export const AuthProvider = (

  {

    children,

  }: {

    children: ReactNode;

  }

) => {

  const [user, setUser] =
    useState<any>(null);

  const [token, setToken] =
    useState<string | null>(
      null
    );

  useEffect(() => {
    const savedUser = getUser();
    const savedToken = getToken();

    if (savedUser && savedToken) {
      setUser({
        ...savedUser,
        id: savedUser.id || savedUser.userId
      });
      setToken(savedToken);
    }
  }, []);

  const logoutUser = () => {

    logout();

    setUser(null);

    setToken(null);
  };

  return (

    <AuthContext.Provider

      value={{

        user,

        token,

        isLoggedIn:
          !!token,

        logoutUser,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth =
  () => {

    const context =
      useContext(AuthContext);

    if (!context) {

      throw new Error(

        "useAuth must be used within AuthProvider"
      );
    }

    return context;
};