import React, { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import { NavigateFunction } from "react-router-dom";

type TUser = {
  email: string;
  permissions: string[];
  roles: string[];
};

type TSignInCredentials = {
  email: string;
  password: string;
  navigate: NavigateFunction;
};

type TAuthContextData = {
  signIn(credentials: TSignInCredentials): Promise<void>;
  user?: TUser;
  isAuthenticated: boolean;
};

type TAuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as TAuthContextData);

export const AuthProvider = ({ children }: TAuthProviderProps) => {
  const [user, setUser] = useState<TUser>();
  const isAuthenticated = !!user;

  const signIn = async ({ email, password, navigate }: TSignInCredentials) => {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles, token, refreshToken } = response.data;

      localStorage.setItem("reactauth.token", token)
      localStorage.setItem("reactauth.refreshToken", refreshToken)

      setUser({ email, permissions, roles });

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
